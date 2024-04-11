import { App } from "vue";


import { createPinia } from 'pinia'
import { createPlugin } from 'vue3-persist-storages'
import { useAppStore } from "./Base/app";
import { useUserStore } from "./Base/user";

const store = createPinia()
store.use(createPlugin({
    name: 'FitsAppTemplate'
}))

const useStore = () => ({
    appStore: useAppStore(),
    userStore: useUserStore(),
});
export function setupStore(app: App) {
    app.use(store);
}

export default useStore