import { createAnimation } from "@ionic/vue";

const strTranslateX = 'translateX('
const ele = ".modal-wrapper"
const translateX = "translateX(100%)"

/*--------------modal 从右边进入视图 --------------------- */
export const modalFromRightEnter = (baseEl: any) => {
    baseEl = baseEl.shadowRoot
    const wrapperEle = baseEl.querySelector(ele);
    // getBoundingClientRect()这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
    const wrapperEleRect = wrapperEle.getBoundingClientRect();
    const backdropIn = createAnimation()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .keyframes([
            { offset: 0, visibility: 'hidden', opacity: '0.01' },
            { offset: 1, visibility: 'inherit', opacity: '0.4' },
        ])
   // modal-shadow这个div，在dom结构和样式来说都跟样式modal-wrapper毫无关系，那就是跟这个modal的模态框的js实现模式有关
   // 我猜测是根据modal-shadow为模型去生成.modal-wrapper这个div的，所以这两者要同步变化
   // wrapperEleRect.left这个方法的使用，是因为由于display:flex的样式影响，导致如果translateX（20%）计算的宽度会不对，为了不影响布局，通过js确定左边的x轴需要多px
    const modalShadowIn = createAnimation()
        .addElement(baseEl.querySelector('.modal-shadow'))
        .keyframes([
            { offset: 0, transform: translateX },
            { offset: 1, transform: strTranslateX + wrapperEleRect.left + 'px)' },
        ])
    const wrapperIn = createAnimation()
        .addElement(baseEl.querySelector(ele))
        .keyframes([
            { offset: 0, transform: translateX },
            { offset: 1, transform: strTranslateX + wrapperEleRect.left + 'px)' },
        ])

    // console.log(wrapperEleRect.left);
    return createAnimation('modal-from-right-enter')
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(400)
        .addAnimation([backdropIn, modalShadowIn, wrapperIn]);
}
/*--------------modal 从右边离开视图 --------------------- */
/**
 * 
 * @param baseEl 调用modalFromRightLeave方法的时候，会默认传入当前的dom节点
 * @returns 
 */
export const modalFromRightLeave = (baseEl: any) => {
    baseEl = baseEl.shadowRoot
    const wrapperEle = baseEl.querySelector(ele);
    const wrapperEleRect = wrapperEle.getBoundingClientRect();
    const backdropOut = createAnimation()
        .addElement(baseEl.querySelector('ion-backdrop') as HTMLElement)
        .keyframes([
            { offset: 0, opacity: '0.4' },
            { offset: 1, opacity: '0' },
        ])
    const wrapperOut = createAnimation()
        .addElement(baseEl.querySelector(ele) as HTMLElement)
        .keyframes([
            { offset: 0, transform: strTranslateX + wrapperEleRect.left / 2 + 'px)' },
            { offset: 1, transform: translateX },
        ])

    return createAnimation('modal-from-right-leave')
        .easing('ease-out')
        .duration(400)
        .addAnimation([wrapperOut, backdropOut])
}