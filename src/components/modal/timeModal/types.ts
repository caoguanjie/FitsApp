import moment from "moment"

/**
 * 具体用法
 * @description 时间组件
 */
export class TimeModalProps {
    initValue?: string
    width?: string
    isShowFooterBtns?: boolean
    isShowTime?: boolean
    cancelText?: string
    doneText?: string
    max?: string
    min?: string
    dayValues?: number | number[] | string | undefined
    hourValues?: number | number[] | string | undefined
    minuteValues?: number | number[] | string | undefined
    monthValues?: number | number[] | string | undefined
    yearValues?: number | number[] | string | undefined
    cancelCallback?: Function
    doneCallback?: Function
    preferWheel?: boolean
    /**
     * @property {string} initValue 初始值：需要符合ISO 8601格式（ionic文档规定的），至于什么叫ISO 8601格式可以看https://www.w3.org/TR/NOTE-datetime
     * @property {string} width 时间控件的宽度
     * @property {boolean} isShowFooterBtns 是否展示底部的确认取消按钮
     * @property {boolean} isShowTime 是否展示时分秒
     * @property {string} cancelText 取消按钮显示的文本
     * @property {string} doneText 确定按钮显示的文本
     * @property {string} max 允许最大的日期时间
     * @property {string} min 允许最小的日期时间
     * @property {number | number[] | string | undefined} dayValues 要显示的月份中的哪几天，dayValues输入可以采用一个数字、一个数字数组或一串逗号分隔的数字
     * @property {number | number[] | string | undefined} hourValues 要显示的小时
     * @property {number | number[] | string | undefined} minuteValues 要显示小时中的哪些分钟
     * @property {number | number[] | string | undefined} monthValues 要显示几月份
     * @property {number | number[] | string | undefined} yearValues 显示可选的年份
     * @property {Function} cancelCallback 点击取消按钮的回调
     * @property {Function} doneCallback 点击确定按钮的回调，接收选中的时间
     * @property {boolean} preferWheel 是否使用轮子形式
     */
    constructor({
        initValue,
        width,
        isShowFooterBtns,
        isShowTime,
        cancelText,
        doneText,
        max,
        min,
        dayValues,
        hourValues,
        minuteValues,
        monthValues,
        yearValues,
        cancelCallback,
        doneCallback,
        preferWheel
    }: any = {}) {
        this.initValue = initValue || moment().format();
        this.width = width || "80%"
        this.isShowFooterBtns = isShowFooterBtns
        this.isShowTime = isShowTime
        this.cancelText = cancelText || "取消"
        this.doneText = doneText || "确定"
        this.max = max
        this.min = min || moment().subtract(10, "years").format("YYYY-MM-DD")
        this.dayValues = dayValues
        this.hourValues = hourValues
        this.minuteValues = minuteValues
        this.monthValues = monthValues
        this.yearValues = yearValues
        this.cancelCallback = cancelCallback
        this.doneCallback = doneCallback
        this.preferWheel = preferWheel || false
    }
}
