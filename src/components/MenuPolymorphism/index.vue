<script setup lang="ts">
import { generateMenuData } from '@/components/MenuPolymorphism/GenerateMenuData'

const props = defineProps<{
    parentPath: string,
    handleSelect: Function
}>()

let menuData = generateMenuData(props.parentPath)

</script>

<template>
    <div class="menu-box">
        <el-container class="layout-container-demo" style="height: 100%">
            <el-aside width="200px">
                <el-scrollbar>
                    <MenuPolymorphismIndex @handleSelect="handleSelect" :menu-config="menuData" />
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
.menu-box {
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
