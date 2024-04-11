export interface PasswordValidOptions {
  minLength?: number;
  maxLength?: number;
  strongTextArr?: string[];
  hasNumber?: boolean;
  hasCapitalLetters?: boolean;
  hasLowercaseLetters?: boolean;
  hasSymbol?: boolean;
}

export class PasswordValid {
  private minLength: number; // 密码最短长度
  private maxLength: number; // 密码最长长度
  private strongTextArr: string[]; // 密码强度类型
  private hasNumber: boolean; // 密码是否含有数字
  private hasCapitalLetters: boolean; //密码是否含有小写字母
  private hasLowercaseLetters: boolean; // 密码是否含有大写字母
  private hasSymbol: boolean; // 密码是否含有符号
  constructor(passwordValidOptions?: PasswordValidOptions) {
    this.minLength = (passwordValidOptions && passwordValidOptions.minLength) || 6;
    this.maxLength = (passwordValidOptions && passwordValidOptions.maxLength) || 18;
    this.strongTextArr = (passwordValidOptions && passwordValidOptions.strongTextArr) || ["弱", "中", "强"];
    this.hasNumber = (passwordValidOptions && passwordValidOptions.hasNumber) || false;
    this.hasCapitalLetters = (passwordValidOptions && passwordValidOptions.hasCapitalLetters) || false;
    this.hasLowercaseLetters = (passwordValidOptions && passwordValidOptions.hasLowercaseLetters) || false;
    this.hasSymbol = (passwordValidOptions && passwordValidOptions.hasSymbol) || false;
  }

  /**
   *  判断是否符合规则
   * @param value 密码
   */
  isNormal(value: string): string {
    let validMsg =''; // 错误信息
    const regNumber = /\d/;
    const regCapitalLetters = /[a-z]/;
    const regLowercaseLetters = /[A-Z]/;
    const regSymbol = /[!@#$%^&*`~()-+=._]/;
    if (value === "") {
      validMsg = "密码不能为空";
    } else if (~value.indexOf(" ")) {
      validMsg = "密码存在空格";
    } else if (/(^_)|(__)|(_+$)/.test(value)) {
      validMsg = "密码首尾不能出现下划线'_'";
    } else if (value.length < this.minLength || value.length > this.maxLength) {
      console.log(value.length);

     validMsg = `密码长度为 ${this.minLength} 至 ${this.maxLength}`;
    } else if (this.hasNumber && !regNumber.test(value)) {
      validMsg = "密码必须含有数字";
    } else if (this.hasCapitalLetters && !regCapitalLetters.test(value)) {
      validMsg = "密码必须含有小写字母";
    } else if (this.hasLowercaseLetters && !regLowercaseLetters.test(value)) {
      validMsg = "密码必须含有大写字母";
    } else if (this.hasSymbol && !regSymbol.test(value)) {
      validMsg = "密码必须含有符号";
    }
    return validMsg;
  }

  /**
   * 判断密码强度
   * @param value 密码
   */
  passwordStrong(value: string): string {
    //   先判断密码是否符合规则
    const validMsg = this.isNormal(value);
    // 密码符合规则
    if (!validMsg) {
      // 小写字母、大写字母、数字、符号都有，密码强度：强
      if (this.hasNumber && this.hasSymbol && this.hasCapitalLetters && this.hasLowercaseLetters) {
        return this.strongTextArr[2];
      } else if (this.hasNumber && this.hasSymbol && (this.hasCapitalLetters || this.hasLowercaseLetters)) {
        // 没有大写字母或者小写字母，密码强度：中
        return this.strongTextArr[1];
      } else {
        // 密码强度：弱
        return this.strongTextArr[0];
      }
    }
    return '密码不符合规则'
  }
}

export const passwordValid = new PasswordValid();

export default passwordValid;
