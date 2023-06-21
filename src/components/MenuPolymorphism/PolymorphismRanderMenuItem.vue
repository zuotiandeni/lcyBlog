<script setup lang="ts">
import type { RouteMenuConf } from './GenerateMenuData'
import IconCommunity from '@/components/icons/IconCommunity.vue'
import IconEchartsMain from '@/components/icons/IconEchartsMain.vue'
defineProps<{
    menuConfig: RouteMenuConf[] | []
}>()

interface iconsEnum {
    IconCommunity: string
    IconEchartsMain: string
}
const icons = {
    IconCommunity,
    IconEchartsMain
}
</script>

<template>
    <template v-for="item in menuConfig" :key="item.key">
        <el-sub-menu v-if="item.type === 'el-sub-menu'" :index="item.key">
            <template #title>
                <el-icon v-if="item.iconComp"
                    ><component
                        :is="icons[item.iconComp as keyof iconsEnum] ? icons[item.iconComp as keyof iconsEnum] : item.iconComp"
                /></el-icon>
                {{ item.title }}
            </template>
            <PolymorphismRanderMenuItem v-if="item.children" :menu-config="item.children" />
        </el-sub-menu>
        <el-menu-item-group v-if="item.type === 'el-menu-item-group'" :index="item.key">
            <template #title>
                <el-icon v-if="item.iconComp"><component :is="item.iconComp" /></el-icon>
                {{ item.title }}
            </template>
            <PolymorphismRanderMenuItem v-if="item.children" :menu-config="item.children" />
        </el-menu-item-group>
        <el-menu-item v-if="item.type === 'el-menu-item'" :index="item.key">
            <template #title>
                <el-icon v-if="item.iconComp"><component :is="item.iconComp" /></el-icon>
                {{ item.title }}
            </template>
            <PolymorphismRanderMenuItem v-if="item.children" :menu-config="item.children" />
        </el-menu-item>
    </template>
</template>

<style scoped></style>
