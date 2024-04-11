import { toastController } from "@ionic/vue";

/**
 *
 * @param message 传入要提示的消息文本
 * @returns
 */

type position = "top" | "bottom" | "middle";

export const toast = async (message: string, position: position = "middle", duration = 1500) => {
  let cssClass;
  if (position === "middle") {
    cssClass = "myToastStyle";
  } else {
    cssClass = "bottomOrTopToastStyle";
  }
  const toast = await toastController.create({
    message: message,
    cssClass,
    duration,
    mode: "ios",
    position,
    htmlAttributes: {
      tabindex: undefined
    }
  });

  return toast.present();
};
