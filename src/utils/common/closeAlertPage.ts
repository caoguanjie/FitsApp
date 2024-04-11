/*
 * @desc: 关闭所有弹窗页，包括alertController || modalController || actionSheetController || loadingController || toastController || pickerController || popoverController
 * @Author: caogj 
 * @Date: 2022-04-26 16:28:27 
 * @Last Modified by: caogj
 * @Last Modified time: 2022-04-26 16:44:36
 */
import { modalController, popoverController, alertController, actionSheetController, loadingController, pickerController } from "@ionic/vue"

export const closeIonicAlertPage = async () => {
    // 存放当前弹窗对象
    let currentAlertPage: any;
    // 数组存放的顺序不能乱，里面取决于关闭顺序
    const modalPage = [loadingController, popoverController, actionSheetController, pickerController, alertController, modalController];
    for (let i = 0; i < modalPage.length; i++) {
        // 如果当前存在弹框dom节点，则返回HTML元素，否则返回undefined
        const modal_dom = await modalPage[i].getTop();
        if (modal_dom) {
            // 一旦存在弹框，马上中断循环，把当前的弹框关闭
            currentAlertPage = modalPage[i]
            break;
        }
    }
    if (currentAlertPage) {
        currentAlertPage.dismiss()
        return Promise.resolve(false)
    } else {
        return Promise.resolve(true)
    }

}


