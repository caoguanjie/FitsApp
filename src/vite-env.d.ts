// 这里存放vite.config.ts定义的一些全局变量，这些全局变量都会挂载在window对象里面，
// 这里是声明的全局变量的方法，在ts中都可以直接使用


// 全局环境变量
declare const ENV: string & FitsAppSetting

