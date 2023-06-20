<script setup lang="ts">
import { type TreeData } from './Menu'
const menuData = defineProps<{
    menuData: TreeData[]
}>()
</script>

<template>
    <template v-for="item in menuData.menuData" :key="item.key">
        <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.key">
            {{ item.name }}
        </el-menu-item>
        <el-sub-menu v-else :index="item.key">
            <template #title>{{ item.name }}</template>
            <RanderMenuItem :menu-data="item.children" />
        </el-sub-menu>
    </template>
</template>

<style scoped></style>
