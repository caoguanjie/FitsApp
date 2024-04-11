
import { IonicConfig } from '@ionic/core';
import { iosRewriteAnimation } from '@/utils/Animation/IosRewriteAnimation';
import { isPlatform } from '@ionic/vue';
import { isIos } from '../is';

const defineAnimattion = isPlatform('mobileweb') && isIos() && iosRewriteAnimation

export const setupIonConfig: IonicConfig = {
  /**
   * 导航条返回按钮的文本
   */
  backButtonText: "",
  // ios开启这个属性，在web浏览器上会出现莫名的错误
  swipeBackEnabled: isPlatform('mobileweb') && isIos() ? false : true,
  navAnimation: defineAnimattion || undefined,
  /**
   *  判断是否是微信平台
   * 重置pwa的方法，让判断pwa的方法变成判断微信浏览器的方法。
   * 重置electron的方法，让判断electron的方法变成判断企聆通浏览器的方法。
   */
  platform: {
    pwa: (win) => {
      const ua = win.navigator.userAgent.toLowerCase();
      const reg = new RegExp(/MicroMessenger/i);
      return reg.test(ua) ? true : false
    },
  }
}
