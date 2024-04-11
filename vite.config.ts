import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { UserConfig, ConfigEnv } from 'vite'
import removeConsole from 'vite-plugin-remove-console';
import { createHtmlPlugin } from 'vite-plugin-html'
import development from './src/environment/development'
import production from './src/environment/production'
import postcssPxToViewport from 'postcss-px-to-viewport';
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  // 把所有的环境变量都放到全局变量ENV中,每次新建环境变量都需要静态导入到vite这里来，进行配置
  const loadENV = {
    'development': development,
    'production': production
  }
  return {
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    define: {
      ENV: JSON.stringify(loadENV[mode]),
    },
    plugins: [
      vue(),
      legacy(),
      // 生产环境才会清理console语句
      removeConsole(),
      createHtmlPlugin({
        inject: {
          data: {
            // 定义一个title对象，可以HTML引用
            title: loadENV[mode].title,
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      postcss: {
        plugins: [
          postcssPxToViewport({
            unitToConvert: 'px', // 要转换的单位
            viewportWidth: 750, // 设计稿的宽度，根据实际情况调整
            unitPrecision: 5, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的 CSS 属性的单位
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认为 vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认为 vw
            selectorBlackList: [], // 指定不转换为视窗单位的类名
            minPixelValue: 1, // 默认值 1，小于或等于 1px 则不进行转换
            mediaQuery: false, // 是否在媒体查询的 CSS 代码中也进行转换，默认为 false
            replace: true, // 是否转换后直接更换属性值
            exclude: /node_modules/, // 设置忽略文件，使用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
    },
    // 本地反向代理解决浏览器跨域限制
    server: {
      // 此处添加以下设置host:0.0.0.0 或true
      // 将监听所有地址，包括局域网和公网地址
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      port: 8080,
      open: true, // 运行自动打开浏览器
    },
    build: {

      outDir: path.resolve(__dirname, './FitsApp'),
      minify: 'terser',
    }
  }
}

