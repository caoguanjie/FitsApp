import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router';

import { IonicVue } from '@ionic/vue';
import { setupStore } from "@/store";
import Vconsole from 'vconsole';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// 全局引入vant组件样式
import 'vant/lib/index.css';

// 全局引用自定义样式
import './styles/index.scss';
import { setupIonConfig } from './utils/common/ionicConfig';



const app = createApp(App).use(IonicVue, setupIonConfig)
// 设置环境变量，合并外部配置，可以随时对环境变量进行控制
Object.assign(ENV, window.systemSetting)
if (ENV.isDebug) {
  new Vconsole()
}
// 挂载路由
setupRouter(app);
// 挂载状态管理器
setupStore(app);


router.isReady().then(() => {
  app.mount('#app');
});