/// <reference types="vite/client" />

// TODO: TS 无法主动发现模块，如果找不到模块，则需要在此使用 declare module 进行配置
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'element-plus/dist/locale/en.mjs'
declare module 'element-plus'
declare module '@codemirror/lang-vue'
declare module '@codemirror/theme-one-dark'
// 添加环境变量的类型提示
interface ImportMetaEnv {
    VITE_TITLE: string
}

// // 引入文件爆红且不提示的处理
// declare module '*.vue' {
//     import { DefineComponent } from 'vue'
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//     const component: DefineComponent<{}, {}, any>
//     export default component
// }
