/*
 * @Author: caoguanjie 
 * @Date: 2024-04-11 11:07:52 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2024-04-11 14:11:18
 * 文件描述：这个文件主要存放alova的一些中间件的封装方法
 */

import { loadingController } from "@ionic/vue";

interface IMiddlewareParams {
    /** loading的延迟时间  */
    delayTimer?: number,
    /** loading的提示词 */
    loadingTips?: string,
    /** 是否需要重试 */
    needRetry?: boolean
    /** 重试的次数 */
    retryCount?: number
}

export function requestMiddleware(config?: IMiddlewareParams) {
    const defaultConfig = {
        delayTimer: 500,
        loadingTips: '正在加载中...',
        needRetry: false,
        retryCount: 3
    }
    const _config = { ...defaultConfig, ...config }
    return async (ctx: any, next: any) => {
        ctx.controlLoading();
        // 请求开始时设置为true
        ctx.update({ loading: true });
        const showLoading = async () => {
            const loadingInstance = await loadingController.create({
                message: _config.loadingTips,
            });
            loadingInstance.present();
        };

        // 延迟特定时间更新
        const timer = setTimeout(async () => {
            const loading = await loadingController.getTop();
            // 如要重试的，不关闭当前弹框
            if (_config.needRetry || ctx.config.retryCount) {
                if (!loading) {
                    showLoading()
                    ctx.update({ loading: true });
                }
            } else {
                loading && loadingController.dismiss()
                showLoading()
                ctx.update({ loading: true });
            }

        }, _config.delayTimer);

        const responseResult = await next();
        clearTimeout(timer);
        // 判断状态码为5xx的正则
        const statusCodeRegex = /^(5\d{2})$/;
        if (_config.needRetry || statusCodeRegex.test(String(responseResult.code))) {
            ctx.config.retryCount ? ctx.config.retryCount-- : ctx.config.retryCount = _config.retryCount
            if (ctx.config.retryCount) {
                ctx.send(...ctx.sendArgs)
            } else {
                ctx.update({ loading: false });
                loadingController?.dismiss()
            }
        } else {
            ctx.update({ loading: false });
            loadingController?.dismiss()
        }
    }
}

/**
 * loading显示隐藏的中间件
 * @param delayTimer 接口延迟多少时间开启loading界面，默认500ms
 * @param loadingTips loading提示词
 * @returns 
 */
export function delayLoadingMiddleware(delayTimer = 500, loadingTips = '正在加载...') {
    return async (ctx: any, next: any) => {
        // 自行控制loading
        ctx.controlLoading();
        ctx.update({ loading: true });

        let loadingInstance: any
        const showLoading = async () => {
            loadingInstance = await loadingController.create({
                message: loadingTips,
            });
            loadingInstance.present();
        };
        // 延迟特定时间更新
        const timer = setTimeout(async () => {
            const loading = await loadingController.getTop();
            loading && loadingController.dismiss()
            showLoading()
            ctx.update({ loading: true });
        }, delayTimer);
        await next();
        ctx.update({ loading: false });
        loadingInstance?.dismiss()
        clearTimeout(timer);
    };
}

/**
 * 单独的请求重试的中间件逻辑
 * @param needRetry 这里需要在业务场景做好了判断表达式传进来，例如：retryMiddleware(code>500),这里有个默认判断，就是状态码是5xx就触发重试
 * @param retryCount 重试的次数
 * @returns 
 */
export function retryMiddleware(needRetry = false, retryCount = ENV.retry_count || 1) {
    return (ctx: any, next: any) => {
        console.log(ctx)
        return next()
            .then((value: Service.ResponseBaseResult) => {
                const statusCodeRegex = /^(5\d{2})$/
                if (needRetry || statusCodeRegex.test(String(value.code))) {
                    ctx.config.retryCount ? ctx.config.retryCount-- : ctx.config.retryCount = retryCount
                    if (ctx.config.retryCount) {
                        ctx.send(...ctx.sendArgs)
                    }
                }
                return value
            })
    }
}


