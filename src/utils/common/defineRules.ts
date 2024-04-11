
/**
 * @desc 非空验证
 */
export const requireReg = (value: any, [target]: any, ctx: any) => {
    if (!value || value.length === 0) {
        return ctx.field + '不能为空';
    }
    return true;
}

/**
 * @desc 邮箱验证
 */
export const emailReg = (value: any, [target]: any, ctx: any) => {
    if (!/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(value)) {
        return "请输入正确的邮箱";
    }
    return true;
}
/**
 * @desc 数字大于n验证
 */
export const minNumberReg = (value: any, [target]: any, ctx: any) => {
    if (!value || value <= Number(target)) {
        return ctx.field + '必须大于' + target;
    }
    return true;
}

/**
 * @desc 手机号验证
 */
export const phoneReg = (value: any, [target]: any, ctx: any) => {
    const reg = new RegExp(/^1[3456789]\d{9}$/)
    if (value && !reg.test(value)) {
        return '手机号格式不正确';
    }
    return true;
}

/**
 * @desc 短信验证码验证
 */
export const phoneCodeReg = (value: any, [target]: any, ctx: any) => {
    const reg = new RegExp(/^1[3456789]\d{9}$/)
    // 如果是手机验证码组件
    if (!value) {
        return '手机号不能为空';
    }
    if (value && !value.phone) {
        return '手机号不能为空';
    }
    if (value && !reg.test(value.phone)) {
        return '手机号格式有误';
    }
    return true
}