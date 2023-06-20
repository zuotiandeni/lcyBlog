<script setup lang="ts">
import { defineAsyncComponent, type Component, ref, computed, reactive } from 'vue'

import { demoMenuConfig, type RouteMenuConf, recursionGenerateMenu } from './DemoConfig'
import { RouterView, type RouteRecordRaw } from 'vue-router'
import router from '@/router/index'

const TestComp = defineAsyncComponent(
    (): Promise<Component> => import('@/components/MenuPolymorphism/MenuPolymorphismIndex.vue')
)

// 需要给子组件传递的方法，通过子组件触发
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    router.push(key)
}

// 生成菜单---start
const menuData: RouteMenuConf | [] = reactive([])
// 调用菜单生成方法
let menuRoutes: RouteRecordRaw[] = []
router.options.routes.forEach((item) => {
    if (item.path === '/' && item.children && item.children.length > 0) {
        menuRoutes = item.children.filter((appItem) => {
            return appItem.path === '/demo'
        })
    }
})
console.log(menuRoutes)

recursionGenerateMenu(menuRoutes[0].children as RouteRecordRaw[], menuData)
// 生成菜单---end
</script>

<template>
    <div class="demo-body">
        <el-container class="layout-container-demo" style="height: 100%">
            <el-aside width="200px">
                <el-scrollbar>
                    <TestComp @handleSelect="handleSelect" :menu-config="menuData" />
                </el-scrollbar>
            </el-aside>

            <el-main>
                <el-scrollbar>
                    <RouterView />
                </el-scrollbar>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped lang="scss">
.demo-body {
    height: 100%;
    // background-color: $bgColor;
}

:deep(.el-aside) {
    background-color: #ffffff;
}
:deep(.el-main) {
    padding: 0;
}
:deep(.el-scrollbar__view) {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}
</style>
