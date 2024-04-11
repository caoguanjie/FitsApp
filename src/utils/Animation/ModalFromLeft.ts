import { createAnimation } from "@ionic/vue";

const ele = ".modal-wrapper"
const translateX = "translateX(-100%)"
const strTranslateX = "translateX("

export const modalFromLeftEnter = (baseEl: any) => {
  baseEl = baseEl.shadowRoot
  const wrapperEle = baseEl.querySelector(ele);
  // getBoundingClientRect()这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom
  const wrapperEleRect = wrapperEle.getBoundingClientRect();
  const backdropIn = createAnimation()
    .addElement(baseEl.querySelector("ion-backdrop"))
    .keyframes([
      { offset: 0, visibility: "hidden", opacity: "0.01" },
      { offset: 1, visibility: "inherit", opacity: "0.4" },
    ]);
  const modalShadowIn = createAnimation()
    .addElement(baseEl.querySelector(".modal-shadow"))
    .keyframes([
      { offset: 0, transform: translateX },
      { offset: 1, transform: strTranslateX + -wrapperEleRect.left + "px)" },
    ]);
  const wrapperIn = createAnimation()
    .addElement(baseEl.querySelector(ele))
    .keyframes([
      { offset: 0, transform: translateX },
      { offset: 1, transform: strTranslateX + -wrapperEleRect.left + "px)" },
    ]);

  return createAnimation("modal-from-left-enter")
    .easing("cubic-bezier(0.36,0.66,0.04,1)")
    .duration(400)
    .addAnimation([backdropIn, modalShadowIn, wrapperIn]);
};
/*--------------modal 从右边离开视图 --------------------- */
/**
 *
 * @param baseEl 调用modalFromLeftLeave方法的时候，会默认传入当前的dom节点
 * @returns
 */
export const modalFromLeftLeave = (baseEl: any) => {
  baseEl = baseEl.shadowRoot
  const wrapperEle = baseEl.querySelector(ele);
  const wrapperEleRect = wrapperEle.getBoundingClientRect();
  const backdropOut = createAnimation()
    .addElement(baseEl.querySelector("ion-backdrop") as HTMLElement)
    .keyframes([
      { offset: 0, opacity: "0.4" },
      { offset: 1, opacity: "0" },
    ]);
  /**
   * 下面第一帧的动画正常来说应该是写 { offset: 0, transform: "translateX(" + -wrapperEleRect.left * 2 + "px)" }
   * 但是left值为0，而第一帧真正的translateX的值在这里是-75，所以只能通过另一种方式来算出需要的left值
   */
  const wrapperOut = createAnimation()
    .addElement(baseEl.querySelector(ele) as HTMLElement)
    .keyframes([
      { offset: 0, transform: strTranslateX + -(window.innerWidth - wrapperEleRect.right) + "px)" },
      { offset: 1, transform: translateX },
    ]);

  return createAnimation("modal-from-left-leave")
    .easing("ease-out")
    .duration(400)
    .addAnimation([wrapperOut, backdropOut]);
};
