import { App } from "@capacitor/app";
import { useBackButton, useIonRouter } from "@ionic/vue";
import { toast } from "../message/toast";

import { RouterHistory, useRoute } from "vue-router";
import { useCloseAlertPage } from "./closeAlertPage";

/**
 * 硬件后退按钮,根据业务自定义监听物理按键后退事件
 * 大多数 Android 设备上都有硬件后退按钮。
 * 在本机应用程序中，它可用于关闭模态、导航到上一个视图、退出应用程序等。
 *
 */

let backButtonPressed = false;

export const ionBackButton = () => {
    const route = useRoute()
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
        if (!ionRouter.canGoBack()) {
            backGo()
        }
    });
    useBackButton(2, (processNextHandler) => {
        // 这里可以封装一些关于web层的后退逻辑
        // 判断是否在首页三个tabs页，如果是，调用pushState()，防止页面在tabs之间返回、切换。
        if (route.path.indexOf('tabs') > 0) {
            backGo()
        } else {
            processNextHandler();
        }
    });
}


/**
 * 后退监听
 */
export const backGo = () => {
    if (backButtonPressed) {
        App.exitApp();
    } else {
        toast('再按一次退出程序');
        backButtonPressed = true;
        setTimeout(() => backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
}


/**
* 企聆通后退监听
* 按返回键，首先判断当前页面是否有弹窗（多种类型的弹窗：modal、popover、alert等），有的话需要先关闭才能进行下一步后退操作
*/
export const setupWebBackButton = (routerHistory: RouterHistory) => {
    routerHistory.listen(async (to: any, from: any, information: any) => {
        if (information.direction === 'back') {
            const isAlert = await useCloseAlertPage();
            if (isAlert) {
                // 需要添加一条当前页面的路由记录，防止关闭弹窗的同时退出了页面
                routerHistory.push(from);
                return
            }
            // tabs页面直接询问退出，不返回上一个页面。防止在tabs之间来回切换
            if (from.indexOf('tabs') > 0 || from === '/login') {
                routerHistory.push(from);
                backGo()
            }
        }
    })
}
