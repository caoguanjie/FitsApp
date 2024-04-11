
import router from '@/router'
import { fetchLogin } from '@/services'
import { defineStore } from 'pinia'



export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            token: '',
            UserInfo: "",

        }
    },
    actions: {
        // 登录接口
        async login({ userName, password }: any) {
            const { isSuccess, data } = await fetchLogin({ userName, password })

            if (!isSuccess)
                return
            // 这里还要处理一下登录信息，比如token等
            return Promise.resolve(data)

        },
        // 获取用户信息
        getUserInfo() {

        },
        // 退出登录
        async logout() {
            return Promise.resolve(false)
            // 这里写退出登录逻辑
        },
        /* 登录退出，重置用户信息等 */
        async resetAuthStore() {
            // 清除本地缓存
            this.clearLocalStorage()
            // 清空路由、菜单等数据
            // router.removeRoute('') 删除特定的路由，基本上app都是嵌套路由，会有一个一级路由
            // 重制当前存储库，或者其他管理器
            this.$reset()
            // 重定向到登录页
            router.replace({ name: 'login' })
        },
        /**
         * 清除本地存储
         */
        clearLocalStorage() {
            // 清除本地缓存
        },
    },


    /**
     *  开启数据缓存
     * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
     */
    persist: [
        {
            type: 'storage',
            paths: ['UserInfo']
        },
        {
            type: 'cookies',
            key: 'token',
            paths: ['token']
        }
    ]
})

