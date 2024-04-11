import { alertController } from "@ionic/vue";

/**
 *  自定义alert弹窗
 * @param header 主标题
 * @param subHeader 子标题
 * @param message 内容信息
 * @param message 确认的回调函数（注意，如果函数返回false，则alert不会关闭）
 * @param message 取消的回调函数（注意，如果函数返回false，则alert不会关闭）
 * @param confirmBtnText 确认按钮的文字
 * @param cancelBtnText 取消按钮的文字
 */

type Info = string | undefined;
type CallBack = (value: any) => boolean | void | {
    [key: string]: any;
};
export const alert = async (
  header: Info,
  subHeader?: Info,
  message?: Info,
  successCallback?: CallBack,
  errorCallback?: CallBack,
  confirmBtnText?: Info,
  cancelBtnText?: Info
) => {
  const alert = await alertController.create({
    header,
    subHeader,
    message,
    cssClass: "",
    buttons: [
      {
        text: cancelBtnText || "取消",
        handler: errorCallback
      },
      {
        text: confirmBtnText || "确认",
        handler: successCallback,
      },
    ],
  });
  await alert.present();

  /* return new Promise((resolve) => {
    alert.onDidDismiss().then((data) => {
      resolve(data);
    });
  }); */
};
