/**
 * @description 过滤传进来的label文字，一行文字超过规定的宽度就换行，达到两行后还超就显示省略号
 * @param str 字符串
 * @param num 一行最多显示多少个字
 * @returns 返回过滤后的字符串
 */
export const fittingString = (str: string, num: number) => {
    if (str && str.length > num * 2) {
        return `${str.substring(0, num)}\n${str.substring(num, num * 2 - 1)}...`
    } else if (str.length > num && str.length <= num * 2) {
        return `${str.substring(0, num)}\n${str.substring(num, num * 2)}`
    } else {
        return str
    }
};