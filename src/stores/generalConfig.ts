import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

interface useSystemConfig {
    systemDarkPattern: Ref<boolean>
    setSystemDarkPattern: Function
}

export const useSystemConfigStore = defineStore('systemConfig', (): useSystemConfig => {
    const systemDarkPattern= ref(false)
    systemDarkPattern.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    function setSystemDarkPattern(type: boolean) {
        systemDarkPattern.value = type;
        console.log(systemDarkPattern.value);
    }
    return {
        systemDarkPattern,
        setSystemDarkPattern
    }
})
