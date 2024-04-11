import { createAnimation } from "@ionic/vue";

/*--------------modal 模拟弹出框效果 从中间放大进入 --------------------- */
/**
 *
 * @param baseEl 调用ModalScaleEnter方法的时候，会默认传入当前的dom节点
 * @returns
 */
export const ModalScaleEnter = (baseEl: any) => {
  /**
   * ionic6在ion-modal的内容外面套了一层shadow，所以需要先获取到shadow才能选中到里面的元素
   * 如果想获取某个shadow的内部元素时，需要先获取该shadow的父亲节点，然后 "父亲节点.shadowRoot" 就能获取到shadow阴影，然后使用选择器就能正常获取到阴影里面的DOM了，但是需要注意，该阴影必须是open状态的，如果是close状态就会获取不到阴影
   * 相关文章链接：
   * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot
   */
  baseEl = baseEl.shadowRoot
  const backdrop = createAnimation()
    .addElement(baseEl.querySelector("ion-backdrop"))
    .beforeStyles({ opacity: "0.5", visibility: "visible", "z-index": "0" });
  const wrapper = createAnimation()
    .addElement(baseEl.querySelector(".modal-wrapper"))
    .beforeStyles({ opacity: 1, background: "transparent" })
    .fromTo("transform", "scale(0.5)", "scale(1)");

  return createAnimation("modal-sacle-enter")
    .easing("cubic-bezier(0.36,0.66,0.04,1)")
    .duration(200)
    .addAnimation([backdrop, wrapper]);
};
/*--------------modal 从中间缩小离开 --------------------- */
/**
 *
 * @param baseEl 调用ModalScaleLeave方法的时候，会默认传入当前的dom节点
 * @returns
 */
export const ModalScaleLeave = (baseEl: any) => {
  const backdrop = createAnimation().beforeStyles({ visibility: "hidden" });
  const wrapper = createAnimation()
    .addElement(baseEl.querySelector(".modal-wrapper"))
    .beforeStyles({ visibility: "hidden" });
  return createAnimation("modal-scale-leave")
    .easing("ease-out")
    .duration(200)
    .addAnimation([backdrop, wrapper]);
};
