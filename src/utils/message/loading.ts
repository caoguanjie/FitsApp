import { loadingController } from "@ionic/vue";


/**
 * loading服务
 */
export class LoadingService {

  private currentLoading: any;
  // 这个变量是为了记录是否在loading组件还没创建好之前就调用了dismiss方法
  private isCallDismiss = false;
  /**
   * 
   * @param message loading遮罩的消息提醒，默认是“正在加载...”
   * @param duration loading动画持续时间， 默认是0，不消失弹窗，不会自动消失
   * @returns Promise<HTMLIonLoadingElement>
   */
  async present(message?: string, duration?: number) {
    // 创建新的loading窗口前，先关闭当前loading
    if (this.currentLoading != null) {
     
      await this.currentLoading.dismiss();
    }
    this.currentLoading = await loadingController.create({
      cssClass: 'my-loading-class',
      duration: duration || 0,
      message: message || "正在加载...",
    });
    this.currentLoading.present().then(() => {
      /**
       * 判断是否在loading组件还没加载完成时就调用过dismiss，如果是就再重新调用一次dismiss，否则就会出现一直loading的bug
       */
      if (this.isCallDismiss) {
        this.dismiss()
        this.isCallDismiss = false
      }
    });
    return  this.currentLoading
  }

  /**
   * @description 关闭
   * @returns void
   */
   async dismiss() {
    if (this.currentLoading != null) {
      await this.currentLoading.dismiss();
      this.currentLoading = null;
    } else {
      /**
       * 进入else表示loading组件还没加载成功就调用了dismiss方法，就会网络慢的时候一直loading的bug
       * 将isCallDismiss变成true，表示loading组件还没加载完成就调用dismiss，到时候等loading组件加载完成之后需要重新再调用一次dismiss
       */ 
      this.isCallDismiss = true
    }
    return;
  }
}