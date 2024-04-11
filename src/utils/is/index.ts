/* eslint-disable @typescript-eslint/ban-types */

import { isPlatform } from "@ionic/vue"


// toString() 方法返回一个表示该对象的字符串。
const toString = Object.prototype.toString


/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, 'Function')
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Object')
}

/**
* @description:  是否为boolean类型
*/
export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
    return is(val, 'String')
}


/**
* @description:  是否为promise
*/
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
* @description:  是否为AsyncFunction
*/
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'AsyncFunction')
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

/**
* @description:  是否为时间
*/
export function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

/**
* @description: 是否已定义
*/
export const isDef = <T = unknown>(val?: T): val is T => {
    return typeof val !== 'undefined'
}

/**
 * @description:  判断输入框是否非空
 */
export function isEmpty(value: any): value is string {
    return value ?? (value.trim() !== '')
}

/**
 * @description 正则判断字符串是否为非空数字类型
 */
export function isNumberType(val: any): boolean {
    const reg = new RegExp(/^(0|\+?[1-9][0-9]*)$/);
    return (reg.test(val)) ? true : false;
}

/**
 * @description 正则判断字符串是否为手机号码
 */
export function isPhoneNumber(val: any) {
    const reg = new RegExp(/^1[3456789]\d{9}$/)
    return (reg.test(val)) ? true : false;
}

/**
* @description 正则判断数字类型最多能输入两位小数
*/
export function isTwoNumber(val: any) {
    const reg = new RegExp(/^(-)?(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/)
    return (reg.test(val)) ? true : false;
}

/**
 *  @description 判断是否是json格式
 */
export function isJSON(val: any) {
    if (!isString(val)) return false;
    try {
        // 这一步是防止出现JSON.parse('"123"')这种情况出现
        if (typeof JSON.parse(val) === "object") {
            return true;
        }
    } catch (error) {
        // 不做判断
    }
    return false;
}

/**
 * @description 判断是否是条形码格式
 * 条形码只支持数字、字母、空格符，-、 $
 */
export function isBarcode(val: string): boolean {
    const reg = new RegExp(/^[0-9A-Za-z-\s$]+$/)
    return (reg.test(val)) ? true : false;
}

/**
 * @description 判断文件URL、文件名、字符串是否有中文字符
 */
export function isStrChinese(val: string): boolean {
    const reg = new RegExp(/[^\u4e00-\u9fa5]/)
    return (reg.test(val)) ? true : false;
}


/**
 * @description 判断是否是ip格式的字符串
 */
export function isIpAddress(val: string): boolean {
    const reg = new RegExp(/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g);
    return (reg.test(val)) ? true : false;
}

/**
 *   URL校验（带http|https）
 *  @description 判断是否是域名格式的字符串 
 */
export function isDomainAddress(val: string) {
    const reg = new RegExp(/^(http|https):\/\/([a-zA-Z\d][\w-]+\.)+[\w-]+(\/[\w-./?#%&@=]*)?$/);
    return (reg.test(val)) ? true : false;
}

/**
 * 包括ip地址和域名地址
 * @description 判断是否合法的URL地址 
 */
export function isURLAddress(val: string) {
    return isIpAddress(val) || isDomainAddress(val);
}

/**
 *  @description 是否真机环境
 */
export function isMobile(): boolean {
    return !isPlatform('mobileweb');
}

/**
 *  @description 是否android真机环境
 */
export function isAndroid(): boolean {
    return isPlatform('android');
}

/**
 * @description  是否ios真机环境
 */
export function isIos(): boolean {
    return isPlatform('ios');
}

/**
 * @description 判断是否微信浏览器
 */
export function isWechat(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    const reg = new RegExp(/MicroMessenger/i);
    return reg.test(ua) ? true : false
}



/**
 * @description 判断字符串是否只由英文字母和数字组成
 */
export function isNumberOrLetter(val: string): boolean {
    const regu = "^[0-9a-zA-Z]+$";
    const re = new RegExp(regu);
    if (re.test(val)) {
        return true;
    } else {
        return false;
    }
}

/**
 * @description 判断字符串是否是email格式
 */
export function isEmail(val: string): boolean {
    const myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if (myReg.test(val)) {
        return true;
    } else {
        return false;
    }
}

/**
 * @description 判断字符串是否是图片格式
 */
export function isImg(val: string): boolean {
    const imgTyps = ["jpeg", "png", "jpg", "webp", "gif", "bmp", "pic", "svg"]
    return imgTyps.includes(val.toLowerCase())
}

/**
 * @description 判断字符串是否是音频格式
 */
export function isAudio(val: string): boolean {
    const audioTypes = ["avi", "wmv", "mpg", "mpeg", "mov", "rm", "ram", "swf", "flv", "mp3", "wma", "avi", "rm", "rmvb", "flv", "mpg", "mkv"]
    return audioTypes.includes(val.toLowerCase())
}

/**
 * @description 判断字符串是否是视频格式
 */
export function isVideo(val: string): boolean {
    const videoTypes = ["ogg", "mp4", "webm", "hls"]
    return videoTypes.includes(val.toLowerCase())
}

/**
 * 判断是否企铃通浏览器
 */
export function isQlt(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    const reg = new RegExp(/QLT/i);
    return reg.test(ua) ? true : false
}

