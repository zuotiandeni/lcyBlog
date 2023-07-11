import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

// 暗黑模式相关方法属性等 start
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark({
    selector: 'html', // 所在的元素
    valueDark: 'dark', // 暗黑模式class名
    valueLight: 'light', // 白天模式class名
})
const toggleDark = useToggle(isDark)
// 暗黑模式相关方法属性等 end
interface useSystemConfig {
    systemDarkPattern: Ref<boolean>
    setSystemDarkPattern: Function
}

export const useSystemConfigStore = defineStore('systemConfig', (): useSystemConfig => {
    // 是否 夜间模式(获取系统的模式)
    const systemDarkPattern = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
    // 初始化设置暗黑模式
    toggleDark(systemDarkPattern.value)
    // 设置 夜间模式 或 白天
    function setSystemDarkPattern(type: boolean) {
        systemDarkPattern.value = type;
        // 同步变更暗黑模式
        toggleDark(type)
    }
    return {
        systemDarkPattern,
        setSystemDarkPattern
    }
})
