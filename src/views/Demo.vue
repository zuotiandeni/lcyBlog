<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'
import router from '@/router/index'

const MenuComp = defineAsyncComponent(
    (): Promise<Component> => import('@/components/MenuPolymorphism/index.vue')
)

// 需要给子组件传递的方法，通过子组件触发
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    router.push(key)
}

</script>

<template>
    <div class="demo-box">
        <MenuComp :handle-select="handleSelect" :parent-path="'/demo'"/>
    </div>
</template>

<style scoped lang="scss">
.demo-box {
    height: 100%;
    // background-color: $bgColor;
}
</style>
