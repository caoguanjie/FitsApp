<div align="center">
<img src="https://github.com/caoguanjie/FitsApp-template/blob/master/fitsapp.png" style="width:150px"/>
    <h1>Fits App</h1>
</div>


## 介绍

[Fitsapp](https://github.com/caoguanjie/FitsApp-template)是一个基于Vue3、Vite5、Typescript、Ioinc7、Vant4, 简洁干净APP开发框架，用简单的方式实现完整功能，并尽可能的考虑代码规范，易读易理解无过度封装，方便二次开发。

## 特性
- 基于Vue3、Vite5、TypeScript、Ioinc7、Vant4等最新技术栈开发
- 基于[alova](https://alova.js.org/)封装和配置，提供统一的响应处理和多场景能力，例如：无感刷新 Token、请求重试策略，表单提交策略、分页请求策略，断点续传策略等等。
- 完善的多环境配置策略，支持开发、测试、预览、生产环境，配置简单，通俗易懂，还支持上线后，动态修改配置
- 基于ionic的路由方案和vue-router路由守卫方案，完美监听浏览器的后退事件，模拟移动端的物理按键的后退操作。
- 基于ionic的页面转换的动画效果，让web界面更接近原生app的真实体验
- 整体采用`postcss-px-to-viewport`作为app的移动端适配方案，高度适配设计稿


## 目录结构
本项目已经为你生成了一个完整的webapp的开发架构，提供了webapp开发的一些基础能力，如：路由、网络请求、全局状态管理、多环境配置、主题配置等等，放在微信浏览器、移动端浏览器兼容性测试都通过了，下面是整个项目的目录结构。
```sh
├── public                               # 静态资源
    └-- static                           # 静态资源文件
        |-- config.js                    # 环境配置，上线后，可以修改对项目的原有配置进行覆盖
├── src                                  # 源代码
│   ├── assets                           # 主题、字体、图片等静态资源
│       ├── icons                        # 项目所有iconsfont图标
│       └── images                       # 框架本身所有用到的svg、png图片。
│   ├── components                       # 全局公用组件
│   ├── layout                           # 全局布局文件layout
│   ├── router                           # 路由
│   ├── services                         # 全局业务接口api管理
│       ├── api                          # 所有请求,统一管理                    
│       ├── http                         # alova的实例封装、中间件，后端配置等等            
│       ├── typings                      # 每个请求的实体类、前端数据建表存放的位置           
│   ├── store                            # 全局 store管理
│   ├── styles                           # 全局样式
│   ├── utils                            # 全局公用方法、工具类
│   ├── types                            # ts全局声明的interface、type、class的类型
│   ├── views                            # views 所有页面
│   ├── App.vue                          # 入口页面
│   ├── main.ts                          # 入口文件 加载组件 初始化等
│   ├── components.d.ts                  # 声明文件，声明全局组件的类型
│   └── env.d.ts                         # 声明文件，环境变量的声明文件，方便vs做ts类型检查、提示
├── .env.xxx                             # 环境变量配置
├── .eslintrc.js                         # eslint 配置项
├── ionic.config.json                    # ionic平台移动端的原生配置文件
├── index.html                           # html模板
├── vite.config.ts                       # vite 配置
├── README.md                            # 项目的说明文件
├── tsconfig.json                        # ts项目的配置文件
├── package.json                         # package.json
```
## 安装
```sh
# 下载项目
git clone https://github.com/caoguanjie/FitsApp-template.git

# 进入项目目录
cd fitsadmin

# 安装依赖
pnpm install

# 如果没有安装pnpm，先执行npm i pnpm -g
# 本项目已经配置了默认使用淘宝镜像

# 本地开发 启动项目
npm run dev
```

## 后续计划
- [x] 集成Capacitor框架，实现跨平台，增加Android和ios的适配
