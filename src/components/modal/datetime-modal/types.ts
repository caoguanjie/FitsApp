
/**
 * 具体用法
 * @description 时间组件
 */
export class DateTimePickerProps {
    modelValue?: string
    presentation?: presentationType
    cancelText?: string
    confirmText?: string
    constructor({
        modelValue,
        presentation,
        cancelText,
        confirmText,
    }: any = {}) {
        this.modelValue = modelValue || ''
        this.presentation = presentation || 'date-time';
        this.cancelText = cancelText || "Cancel"
        this.confirmText = confirmText || "Confirm"
    }

}

/**
 * @desc 日期形式
 */
type presentationType = "date" | "date-time" | "month" | "month-year" | "time" | "time-date" | "year"