import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { createRouterGuards } from './RouterGuards';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/demoPage'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: { title: '首页展示' }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/TestPage.vue'),
    meta: { title: '测试页面' }
  },
  {
    path: '/demoPage',
    name: 'Demo',
    component: () => import('@/views/DemoPage.vue'),
    meta: { title: '选择院区' }
  }
]
const history = createWebHashHistory(import.meta.env.BASE_URL)
const router = createRouter({
  history,
  routes
})


/**
 * 定义一个方法，方便main.ts直接调用。
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router, history);


}
export default router
