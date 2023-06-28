<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useSystemConfigStore } from '@/stores/generalConfig'
const { setSystemDarkPattern } = useSystemConfigStore()
onMounted(() => {
    // 监听系统模式（夜间和日间）切换
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        console.log('触发监听事件')
        setSystemDarkPattern(event.matches)
    })
})
</script>

<template>
    <div class="main-box">
        <RouterView />
    </div>
</template>

<style scoped lang="scss">
.main-box {
    height: 100%;
}
</style>
