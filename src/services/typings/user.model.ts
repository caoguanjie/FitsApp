export class LoginInfo {
    AccessToken: string
    RefreshToken: string
    AvatarUrl: string
    IsAdmin: boolean
    Name: string
    Sex: string
    UserId: string
    Account: string
    IsStrengthPwd: boolean
    /**
     * @typedef  {Object} ReturnData
     * @property {string} AccessToken
     * @property {string} RefreshToken
     * @property {string} AvatarUrl
     * @property {boolean} IsAdmin
     * @property {string} Name
     * @property {string} Sex
     * @property {string} UserId
     * @property {string} Account
     * @property {boolean} IsStrengthPwd
     */
    constructor({ AccessToken, RefreshToken, AvatarUrl, IsAdmin, Name, Sex, UserId, Account, IsStrengthPwd } = {} as any) {
        this.AccessToken = AccessToken;
        this.RefreshToken = RefreshToken;
        this.AvatarUrl = AvatarUrl;
        this.IsAdmin = IsAdmin;
        this.Name = Name;
        this.Sex = Sex;
        this.UserId = UserId;
        this.Account = Account;
        this.IsStrengthPwd = IsStrengthPwd;
    }
}


export class UserInfoItem {
    UserId: string
    UserName: string
    Account: string
    MobilePhone: string
    IsAuthorize: boolean
    /**
     * @typedef  {Object} ResultData
     * @property {string} UserId
     * @property {string} UserName
     * @property {string} Account
     * @property {string} MobilePhone
     * @property {boolean} IsAuthorize
     */
    constructor({ UserId, UserName, Account, MobilePhone, IsAuthorize } = {} as any) {
        this.UserId = UserId;
        this.UserName = UserName;
        this.Account = Account;
        this.MobilePhone = MobilePhone;
        this.IsAuthorize = IsAuthorize;
    }
}

export class UserInfoList {
    TotalCount: number
    TotalPage: number
    ResultData: UserInfoItem[]
    /**
     * @typedef  {Object} 1
     * @property {number} TotalCount
     * @property {number} TotalPage
     * @property {UserInfoItem[]} ResultData
     */
    constructor({ TotalCount, TotalPage, ResultData } = {} as any) {
        this.TotalCount = TotalCount;
        this.TotalPage = TotalPage;
        this.ResultData = ResultData;
    }
}
