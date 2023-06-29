<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useSystemConfigStore } from '@/stores/generalConfig'


const { setSystemDarkPattern } = useSystemConfigStore()

const callBack = (event: { matches: any; }) => {
    setSystemDarkPattern(event.matches)
}
const listeningObject = window.matchMedia('(prefers-color-scheme: dark)')


onMounted(() => {
    // 监听系统模式（夜间和日间）切换
    listeningObject.addEventListener('change', callBack)
})

onBeforeUnmount(()=>{
    listeningObject.removeEventListener('change', callBack)
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
