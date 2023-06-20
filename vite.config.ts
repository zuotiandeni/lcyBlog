import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// element相关包
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 手动引入element组件需要通过它来使用element样式
// 我也不知道怎么解决，这是个bug，可能和编辑器有关
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        ElementPlus({})
    ],
    // TODO: CSS预处理需要放到这里
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/base.scss";`
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        open: true,
        proxy: {}
    }
})
