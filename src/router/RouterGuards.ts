
import { closeIonicAlertPage } from "@/utils/common/closeAlertPage";
import { RouteLocationNormalized, Router, RouterHistory } from "vue-router";
// 建立一个异步函数，判断当前app界面是否可以后退
let canGoBackFunc = () => Promise.resolve(true);
/**
 * @description 创建路由守卫，全局路由拦截，监听浏览器的后退事件的终极方案
 * @desc vantui的各类弹框没有提供弹窗实例，没法全局控制关闭，只能单个组件关闭
 * @param router
 */
export const createRouterGuards = (router: Router, routerHistory: RouterHistory) => {
    // 监听路由后退事件，只有后退的时候，才需要关闭弹框
    routerHistory.listen(async (to: any, from: any, information: any) => {
        if (information.direction === 'back') {

            canGoBackFunc = closeIonicAlertPage
        } else {
            canGoBackFunc = () => Promise.resolve(true);
        }
    })
    router.beforeEach(async (to, from, next) => {
        // 路由拦截，拦截相应的弹框
        const canGoBack = await canGoBackFunc()

        next(canGoBack)
        // 用户权限判断
        // 全局后退事件的拦截

        // removeAllPending(); // 取消当前页面未完成的所有接口
    });
    router.afterEach((to: RouteLocationNormalized) => {
        // 设置页面标题
        if (to.meta.title) {
            document.title = to.meta.title as string || ENV.title || ""
        }
    })

};
