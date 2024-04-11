/*
 * @Author: caoguanjie 
 * @Date: 2024-04-10 14:15:58 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2024-04-11 14:45:47
 * 文件描述：
 * 1、这里处理所有接口相关的业务逻辑，包括可能会利用到其他状态管理，或者其他工具，都需要在这里定义
 * 2、方便以后迁移项目时，能够快速迁移
 */


import useStore from "@/store"
import { ERROR_NO_TIP_STATUS, ERROR_STATUS } from "./config";
import { toast } from "../../utils/message/toast";
import { fetchRefresh } from "../api/user";

type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * @description: 处理请求成功，但返回后端服务器报错
 * @param {Response} response
 * @return {*}
 */
export function handleResponseError(response: Response) {
    const error: Service.ResponseBaseResult = {
        errorType: 'Response Error',
        code: 0,
        message: ERROR_STATUS.default,
        data: null,
    }
    const errorCode: ErrorStatus = response.status as ErrorStatus
    const message = ERROR_STATUS[errorCode] || ERROR_STATUS.default
    Object.assign(error, { code: errorCode, message })

    showError(error)

    return error
}



/**
 * @description: 处理接口token无感刷新
 * @return {*}
 */
export async function handleRefreshToken() {
    const data = await fetchRefresh({ userName: "", password: "" })
    if (data) {
        // 把token存储在状态管理器中
    }
    else {
        // 刷新失败，退出
        const { userStore } = useStore()
        await userStore.resetAuthStore()
    }
}


/**
 * 返回最新的token
 * @returns {string} 
 */
export function handleNewToken(): string {
    const { userStore } = useStore();
    return userStore.token
}

/**
 * @description: 统一成功和失败返回类型
 * @param {object}:code, message, data 
 * @param {boolean} isSuccess
 * @return {Service.ResponseResult<any>} result
 */
export function handleServiceResult(data: any, isSuccess: boolean = true): Service.ResponseBaseResult {
    const result = {
        isSuccess,
        errorType: null,
        ...data,
    }
    return result
}


/**
 * @description:
 * @param {Record} data 接口返回的后台数据
 * @param {Service} config 后台字段配置
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Required<Service.BackendConfig>) {
    const { codeKey, msgKey, dataKey } = config
    const error: Service.ResponseBaseResult = {
        errorType: 'Business Error',
        code: data[codeKey],
        message: data[msgKey],
        data: data[dataKey],
    }

    showError(error)

    return error
}

/**
 * @description: 显示错误信息，轻提示
 */
export function showError(error: Service.ResponseBaseResult) {
    // 如果error不需要提示,则跳过
    const code = error.code
    if (ERROR_NO_TIP_STATUS.includes(code))
        return

    toast(error.message)
}
