import { CreateAlovaInstance } from "./alova"
export * from './middleware'

export const request = CreateAlovaInstance({
    baseURL: ENV.api_address || ''
})
/**
 * 空白实例，考虑可能调用其他系统的接口
 */
export const blankInstance = CreateAlovaInstance({
    baseURL: '',
})


export default request