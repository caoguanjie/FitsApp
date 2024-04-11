import { useRequest } from "alova"
import request, { requestMiddleware } from "../http"
import { LoginInfo, UserInfoList } from "../typings/user.model"

interface Ilogin {
    userName: string
    password: string
}
/**登录接口 */
export function fetchLogin(params: Ilogin) {
    return request.Post<Service.ResponseResult<LoginInfo>>('/api/Login/PCLogin', params)
}

/**刷新token接口，无感登录 */
export function fetchRefresh(params: Ilogin) {
    const method = request.Post<Service.ResponseResult<LoginInfo>>('/api/Login/PCLogin', params)
    // 为了让refreshToken请求顺利通过，需要通过元数据标识authRole为refreshToken。
    method.meta = {
        authRole: 'refreshToken',
    }
    return method
}


/** 分页查询授权用户列表 */
export function fetchUserList() {
    const method = request.Post<Service.ResponseResult<UserInfoList>>('api/SysOrganization/GetAuthUserByPage')
    return useRequest(method, { immediate: false, middleware: requestMiddleware() })
}