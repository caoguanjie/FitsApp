/*
 * @Author: caoguanjie 
 * @Date: 2024-04-11 14:30:02 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2024-04-11 14:49:10
 * 文件描述：这里定义的alova的创建实例方法，以及token的认证策略
 */


import { createAlova } from 'alova'
import { DEFAULT_ALOVA_OPTIONS, DEFAULT_BACKEND_OPTIONS, RESPONSE_STATUS } from './config'
import { createServerTokenAuthentication } from '@alova/scene-vue'
import { handleBusinessError, handleNewToken, handleRefreshToken, handleResponseError, handleServiceResult } from './handle'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'

/**
 * Token认证拦截器:对基于 token 的登录、登出、token 附带、token 刷新进行统一管理，并支持无感刷新 token。
 * 
 */

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication({
    // 由服务端判定token过期
    refreshTokenOnSuccess: {
        // 当服务端返回401时，表示token过期
        isExpired: async (response) => {
            const apiData = await response.clone().json()
            console.log(apiData[DEFAULT_BACKEND_OPTIONS.codeKey] === RESPONSE_STATUS.LOGIN_FAIL)
            return apiData[DEFAULT_BACKEND_OPTIONS.codeKey] == RESPONSE_STATUS.LOGIN_FAIL
        },

        // 当token过期时触发，在此函数中触发刷新token
        handler: async () => {
            await handleRefreshToken()
        }
    },
    /**
     * 添加token到请求头
     * 将重新刷新后的token放回到请求头，保证重新请求业务接口时，token是正确的
     * @param method 添加token到请求头,
     */
    assignToken: (method) => {
        // 官方例子： method.config.headers.Authorization = localStorage.getItem('token')};
        method.config.params.token = handleNewToken()
    },

})

export function CreateAlovaInstance(
    alovaConfig: Service.AlovaConfig,
    backendConfig?: Service.BackendConfig,
) {
    // 合并默认配置
    const _alovaConfig = { ...DEFAULT_ALOVA_OPTIONS, ...alovaConfig }
    // 合并后端配置，这步的意义就是如果这个app请求多个系统的接口，可能后端定义的字段不一样，这样某个接口可以单独传递
    const _backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig }
    return createAlova({
        statesHook: VueHook,
        /** 全局关闭缓存模式，在特定的某几个请求中再进行设置 */
        localCache: null,
        /** 默认使用 fetch API 的适配器，也可以使用axios的适配器*/
        requestAdapter: GlobalFetch(),
        baseURL: _alovaConfig.baseURL,
        timeout: _alovaConfig.timeout,

        /** 请求前的拦截器 */
        beforeRequest: onAuthRequired((method) => {
            // 处理get和post的参数，暂定

            // 检查设置中有没有传入beforeRequest属性，如果有，执行beforeRequest方法，并且传入method参数
            _alovaConfig.beforeRequest?.(method)
        }),

        responded: onResponseRefreshToken({
            // 请求成功的拦截器
            onSuccess: async (response) => {
                const { status } = response

                if (status === 200) {
                    // 返回json数据
                    const apiData = await response.json()
                    // 请求成功, 统一成功和失败返回类型
                    if (apiData[_backendConfig.codeKey] === _backendConfig.successCode) {
                        return handleServiceResult({
                            code: apiData[_backendConfig.codeKey],
                            message: apiData[_backendConfig.msgKey],
                            data: apiData[_backendConfig.dataKey]
                        })
                    }


                    // 业务请求失败
                    const errorResult = handleBusinessError(apiData, _backendConfig)
                    return handleServiceResult(errorResult, false)
                }
                // 接口请求失败
                const errorResult = handleResponseError(response)
                return handleServiceResult(errorResult, false)
            },
            onError: (error, method) => {
                const tip = `[${method.type}] - [${method.url}] - ${error.message}`
                console.warn(tip)
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onComplete: async (_method) => {
                // 处理请求完成逻辑,暂无使用场景
            },
        })




    })
}