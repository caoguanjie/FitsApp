

/**
 * 项目配置
 */
interface FitsAppSetting {
    /**
     * @description 网站标题，项目名称
     */
    title?: string,
    /**
     * @description 网站副标题, 英文标题
     */
    subTitle?: string
    /**
     * @description 公司名字
     */
    company?: string;
    /**
     * @description 项目的接口地址
     * @example  http://192.168.32.60:3005/mock/78/api,
     */
    api_address?: string;
    /**
     * @description 项目的接口超时时间，也就是接口请求超过多少秒之后，会返回超时状态
     * @default {15000} 单位：毫秒
     */
    http_timeout?: number;
    /**
     * @description 接口重试的次数，默认只重试一次
     * @default {1} 单位：1次
     */
    retry_count?: number;
    /**
     * @description app的应用名称
     */
    app_name?: string;
    /**
     * @description app的包名，类似io.fits.admin,也是ios应用的包名
     */
    app_id?: string;
    /**
    * @description 版本号
    * @default {1.0.0}
    */
    version?: string;
    /**
     * @description 上架需要的设备辨识码，方便应用找回，唯一不重复
     * @example {1}
     */
    version_code?: number;
    /**
     * @description 是否开启调试模式
     *  @default {false}
     */
    isDebug?: boolean;

}


// 拓展属性，为了解决dev.ts中部分属性没有写，就出现类型报错的问题
interface ExpandMethod {
    [k: string]: any
}
