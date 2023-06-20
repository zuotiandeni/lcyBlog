<script setup lang="ts">
import type { RouteMenuConf } from '@/views/DemoConfig'

defineOptions({ name: 'MenuPolymorphismIndex' })
defineProps<{
    menuConfig: RouteMenuConf
}>()
const emit = defineEmits<{
    handleSelect: [key: string, keyPath: string[]] // 具名元组语法
}>()
</script>

<template>
    <el-menu
        :ellipsis="false"
        @select="(key: string, keyPath: string[])=>{emit('handleSelect', key, keyPath)}"
    >
        <PolymorphismRanderMenuItem :menu-config="menuConfig" />
    </el-menu>
</template>

<style scoped></style>
