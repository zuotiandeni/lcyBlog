import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

const app = createApp(App)

// elementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

VMdEditor.use(vuepressTheme, {
    Prism
})
app.use(createPinia())
app.use(router)
app.use(VMdEditor)

app.mount('#app')
