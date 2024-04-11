import { timeFormat } from "@/filter";

export interface FitsAlertInputOptions {
    name: string;
    code: string;
    isSelected: boolean;
}

export interface DateRangeOptions {
    start: string;
    end: string
}

export class FitsAlert {
    title?: string;
    radioArray?: FitsAlertInputOptions[];
    type: string; // "radio" or "checkbox"、"prompt"、"confirm"
    isShowBtn: boolean; // 是否显示按钮
    isRequired: boolean; // 是不是必填
    isShowTitle?: boolean; // 是否显示标题
    subType?: string; // 用于输入框的type,number,text
    placeholder?: string; // 用于输入框
    okBtnText?: string;
    cancleBtnText?: string;
    content?: string; // 确认框需要的内容
    enableBackdropDismiss?: boolean; // 是否允许遮罩关闭弹窗
    datetimeWidth?: string // 自定义时间控件的宽度
    isSelectAll?: boolean //是否有全选操作
    constructor(
        type = "",
        isRequired = false,
        isShowBtn = false,
        title?: string,
        radioArray?: FitsAlertInputOptions[],
        isShowTitle?: boolean,
        subType?: string,
        placeholder?: string,
        okBtnText?: string,
        cancleBtnText?: string,
        content?: string,
        enableBackdropDismiss?: boolean,
        datetimeWidth = 'atuo',
        isSelectAll = false
    ) {
        this.title = title;
        this.radioArray = radioArray;
        this.type = type;
        this.isShowBtn = isShowBtn;
        this.isRequired = isRequired;
        this.isShowTitle = isShowTitle;
        this.subType = subType;
        this.placeholder = placeholder;
        this.okBtnText = okBtnText;
        this.cancleBtnText = cancleBtnText;
        this.content = content;
        this.enableBackdropDismiss = enableBackdropDismiss;
        this.datetimeWidth = datetimeWidth;
        this.isSelectAll = isSelectAll
    }
}

export class CalendarModalProps {
    pageTitle?: string;
    backbtnText?: string;
    sureBtnText: string;
    calendarOption: CalendarProps
    constructor(
        pageTitle = '日历',
        backbtnText = '取消',
        sureBtnText = '确定',
        calendarOption = new CalendarProps()
    ) {
        this.pageTitle = pageTitle;
        this.backbtnText = backbtnText;
        this.sureBtnText = sureBtnText;
        this.calendarOption = calendarOption;
    }
}

export class CalendarProps {
    selectMode?: string; // 选择方式：单选、多选、范围、范围多选 'select' | 'multi' | 'range' | 'multiRange'
    mode?: string; // 显示日期方式：单月份、周、多月份 'month' | 'week' | 'monthRange'
    selectDate: string | string[] | DateRangeOptions | DateRangeOptions[] | undefined; // 默认选中的日期，根据selectMode属性传不一样的类型
    monthRange: string[] | undefined; // 当mode属性为monthRange时，需要传递，日历显示的月份 ['2022-5', '2025-10']
    begin?: string; // 可选日期范围的开始
    end?: string; // 可选日期范围的结束
    disabled?: string[]; // 禁用日期 
    remarks?: Object // 标注 如{ '2021-1-13': 'some things' }
    format?: (year: any, month: any) => string[] // 日历头部显示的年月字符串
    weeks?: string[] // 日历头部星期的字符显示
    onSelect?: Function // 点击选择日期的回调，接收选中日期
    onMonthChange?: Function // 月份改变的回调，接收年、月
    onNext?: Function // 切换下一个月的回调，接收年、月
    onPrev?: Function // 切换上一个月的回调，接收年、月
    constructor(
        selectMode = 'range',
        mode = 'monthRange',
        selectDate?: string | string[] | DateRangeOptions | DateRangeOptions[] | undefined,
        monthRange?: string[] | undefined,
        begin = timeFormat(new Date(), 'YYYY-MM-DD'),
        end?: string,
        disabled?: string[],
        remarks?: Object,
        format?: (year: any, month: any) => [string, string],
        weeks?: string[],
        onSelect?: Function,
        onMonthChange?: Function,
        onNext?: Function,
        onPrev?: Function,
    ) {
        this.selectMode = selectMode;
        this.mode = mode;
        this.selectDate = selectDate;
        this.monthRange = monthRange;
        this.begin = begin;
        this.end = end;
        this.disabled = disabled;
        this.remarks = remarks
        this.format = format
        this.weeks = weeks
        this.onSelect = onSelect
        this.onMonthChange = onMonthChange
        this.onNext = onNext
        this.onPrev = onPrev
    }
}