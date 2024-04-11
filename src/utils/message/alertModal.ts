import { modalController } from "@ionic/vue";
import AlertModal from "@/components/modal/alert-modal/AlertModal.vue";
import { ModalScaleEnter, ModalScaleLeave } from "@/utils/Animation/AlertModal";
import SidebarModal from "@/components/modal/siderbarModal/SidebarModal.vue";
import { modalFromRightEnter, modalFromRightLeave } from "@/utils/Animation/ModalFromRight";
import { modalFromLeftEnter, modalFromLeftLeave } from "@/utils/Animation/ModalFromLeft";
import { FitsAlert, FitsAlertInputOptions } from '@/components/modal/alert-modal/types';


interface Props {
  [key: string]: any;
}

const cssClass = "modal-wrapper"

/**
 * 自定义的单选弹窗服务，通过modal组件改装
 * 确定按钮，返回选中值，如果是确定，然后又是【请选择】选项，就返回null值
 * 取消按钮，不返回值
 * @param title 单选弹窗的标题
 * @param dataArray 单选弹窗的数据,{name:"弹窗选项的中文名",code:"每个选项对应的值",isSelected:"是否选中"}
 * @param defaults 单选弹窗的单选默认值
 * @param required 该单选是否是必填项 默认是false
 * @param isShowBtn 是否显示底部按钮
 */
export const customModalRadioAlert = async (
  title: string,
  dataArray: FitsAlertInputOptions[],
  defaults?: string,
  required = false,
  isShowBtn = true,
  id?: string // 传id是为了判断当前是否已经有同一个弹窗，有的话就不创建
): Promise<any> => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (id && document.querySelector('#' + id)) {
    return Promise.reject()
  }
  const arr: FitsAlertInputOptions[] = [];
  dataArray.forEach((element) => {
    if (defaults && element.name === defaults) {
      arr.push({ name: element.name, code: element.code, isSelected: true });
    } else {
      arr.push({ name: element.name, code: element.code, isSelected: false });
    }
  });
  const packages: FitsAlert = {
    title: title,
    radioArray: arr,
    type: "radio",
    isShowBtn: isShowBtn,
    isRequired: required,
  };

  const pages = await modalController.create({
    component: AlertModal,
    cssClass: cssClass,
    componentProps: { packages },
    enterAnimation: ModalScaleEnter,
    leaveAnimation: ModalScaleLeave,
    id
  });
  pages.present();
  return new Promise((resolve) => {
    // ionic5写法如下，如果是ionic3写法，看文档ionic5好像onDidDismiss函数没有参数返回了，而是通过promise返回
    pages.onDidDismiss().then((data) => {
      // 如果是重置就是null值，如果单纯是取消，就不返回值。
      if (data) {
        resolve(data);
      }
    });
  });
};

/**
 * 自定义的时间服务，通过modal组件改装
 * @param required 是否必传
 * @param isShowBtn 是否显示底部按钮
 * @param isShowTitle 是否显示标题
 * @param datetimeWidth 自定义时间控件宽度
 */
export const customModalDatetime = async ({
  required = false,
  isShowBtn = false,
  isShowTitle = false,
  datetimeWidth = 'auto',
  id = undefined
}): Promise<any> => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (id && document.querySelector('#' + id)) {
    return Promise.reject()
  }
  const packages: FitsAlert = {
    type: "date",
    isShowBtn: isShowBtn,
    isRequired: required,
    isShowTitle,
    datetimeWidth
  };

  const pages = await modalController.create({
    component: AlertModal,
    cssClass: cssClass,
    componentProps: { packages },
    enterAnimation: ModalScaleEnter,
    leaveAnimation: ModalScaleLeave,
    id
  });
  pages.present();
  return new Promise((resolve) => {
    // ionic5写法如下，如果是ionic3写法，看文档ionic5好像onDidDismiss函数没有参数返回了，而是通过promise返回
    pages.onDidDismiss().then((data) => {
      // 如果是重置就是null值，如果单纯是取消，就不返回值。
      if (data) {
        resolve(data);
      }
    });
  });
};

/**
 * 自定义的多选弹窗服务，通过modal组件改装
 * 确定按钮，返回选中值
 * 取消按钮，
 * @param title 多选弹窗的标题
 * @param dataArray 多选弹窗的数据RadioAlertInputOptions类型，{name:"弹窗选项的中文名",code:"每个选项对应的值",isSelected:"选择情况"}
 */
export const customModalCheckboxAlert = async (title: string, dataArray: FitsAlertInputOptions[], id?: string, isSelectAll?: boolean): Promise<any> => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (id && document.querySelector('#' + id)) {
    return Promise.reject()
  }
  const arr: FitsAlertInputOptions[] = [];
  dataArray.forEach((element) => {
    arr.push({
      name: element.name,
      code: element.code,
      isSelected: element.isSelected,
    });
  });
  const packages: FitsAlert = {
    title: title,
    radioArray: arr,
    type: "checkbox",
    isShowBtn: true,
    isRequired: true,
    isSelectAll
  };
  const pages = await modalController.create({
    component: AlertModal,
    cssClass: cssClass,
    componentProps: { packages },
    enterAnimation: ModalScaleEnter,
    leaveAnimation: ModalScaleLeave,
    id
  });
  pages.present();
  return new Promise((resolve) => {
    pages.onDidDismiss().then((data) => {
      if (data) {
        resolve(data);
      }
    });
  });
};

/**
 * 自定义的输入框弹窗服务，通过modal组件改装
 * 确定按钮，返回输入框的值
 * 取消按钮，不返回值
 * @param title
 * @param placeholder
 */
export const customModalPromptAlert = async (title: string, placeholder: string, id?: string) => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (id && document.querySelector('#' + id)) {
    return Promise.reject()
  }
  const packages: FitsAlert = {
    title: title,
    type: "prompt",
    isShowBtn: true,
    isRequired: true,
    placeholder: placeholder,
    enableBackdropDismiss: false,
  };
  const pages = await modalController.create({
    component: AlertModal,
    cssClass: cssClass,
    componentProps: { packages },
    enterAnimation: ModalScaleEnter,
    leaveAnimation: ModalScaleLeave,
    id
  });
  pages.present();
  return new Promise((resolve) => {
    pages.onDidDismiss().then((data) => {
      if (data) {
        resolve(data);
      }
    });
  });
};

/**
 * 自定义的输入框弹窗服务，通过modal组件改装
 * 确定按钮，返回输入框的值
 * 取消按钮，不返回值
 * @param title
 * @param placeholder
 */
export const customModalConfirmAlert = async (
  content: string,
  okBtnText: string,
  cancleBtnText: string,
  title?: string,
  isShowTitle = false,
  id?: string // 传id是为了判断当前是否已经有同一个弹窗，有的话就不创建
) => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (id && document.querySelector('#' + id)) {
    return Promise.reject()
  }
  const packages: FitsAlert = {
    title: title,
    isShowTitle: isShowTitle,
    type: "confirm",
    isShowBtn: true,
    isRequired: true,
    content: content,
    okBtnText: okBtnText,
    cancleBtnText: cancleBtnText,
    enableBackdropDismiss: false,
  };
  const pages = await modalController.create({
    component: AlertModal,
    cssClass: cssClass,
    componentProps: { packages },
    enterAnimation: ModalScaleEnter,
    leaveAnimation: ModalScaleLeave,
    id
  });
  pages.present();
  return new Promise((resolve) => {
    pages.onDidDismiss().then((data) => {
      // 提交成功为true，提交取消为false，点击蒙层关闭为undefined
      if (data) {
        resolve(data);
      }
    });
  });
};

/**
 * 自定义的侧边栏
 * @param cancleBtnText 取消按钮的文字
 * @param content 侧边栏内容
 * @param from 从左侧还是右侧滑进，只能传left和right
 */
export const customModalSidebarAlert = async (
  cancleBtnText = "关闭",
  content = "侧边栏内容",
  from: "left" | "right" = "left",
  id?: string
) => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (id && document.querySelector('#' + id)) {
    return Promise.reject()
  }
  let enterAnimation;
  let leaveAnimation;
  if (from === "left") {
    enterAnimation = modalFromLeftEnter;
    leaveAnimation = modalFromLeftLeave;
  } else {
    enterAnimation = modalFromRightEnter;
    leaveAnimation = modalFromRightLeave;
  }
  const packages: FitsAlert = {
    cancleBtnText,
    content,
    type: "sidebar",
    isShowBtn: true,
    isRequired: true,
  };

  const pages = await modalController.create({
    component: SidebarModal,
    cssClass: "custom-alert-model",
    backdropDismiss: true,
    mode: "ios",
    componentProps: { packages },
    enterAnimation,
    leaveAnimation,
    id
  });
  return pages.present();
};

/**
 * 自定义提示框
 */
export const customAlert = async (component: any, props?: Props, id?: string) => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (id && document.querySelector('#' + id)) {
    return Promise.reject()
  }
  const pages = await modalController.create({
    component,
    enterAnimation: ModalScaleEnter,
    leaveAnimation: ModalScaleLeave,
    componentProps: props,
    id
  });
  pages.present();
};


export const originModal = async (component: any, props?: Props, opts: Props = {}) => {
  // 如果已经有这个弹窗，就不再执行了，防止有多个相同的弹窗出现
  if (opts.id && document.querySelector('#' + opts.id)) {
    return Promise.reject()
  }
  const pages = await modalController.create({
    component,
    componentProps: props,
    cssClass: cssClass,
    ...opts
  });
  pages.present();
  return pages.onWillDismiss();
};
