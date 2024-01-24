<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'
import router from '@/router/index'

const menuComp = defineAsyncComponent(
    (): Promise<Component> => import('@/components/MenuPolymorphism/index.vue')
)

// 需要给子组件传递的方法，通过子组件触发
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    router.push(key)
}
</script>

<template>
    <div class="useful-code-snippet-box">
        <menuComp :handle-select="handleSelect" :parent-path="'/UsefulCodeSnippet'" />
    </div>
</template>

<style lang="scss" scoped>
.useful-code-snippet-box {
    height: 100%;
}
</style>
