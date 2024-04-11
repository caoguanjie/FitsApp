

import { defineStore } from 'pinia'


export const useAppStore = defineStore({
    id: 'app', // id必填，且需要唯一
    state: () => {
        return {
            deviceUUID: '',
            appCurrentVersion: '',
            AppID: '',
            platform: 'App',
        }
    },
    actions: {


    },
    /**
     *  开启数据缓存
     * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
     */
    persist: {
        type: 'storage',
        paths: ['AppID', 'platform']
    }
})


