<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { type TreeData } from './Menu'
import RanderMenuItem from './RanderMenuItem.vue'
import router from '@/router'
import { getImageUrl } from '@/utils'
type Props = {
    menuData: TreeData[]
}
defineProps<Props>()

// 点击菜单
const activeIndex: Ref = ref(window.localStorage.getItem('menu-router-path') || '/home')

router.push(activeIndex.value)
const handleSelect = (key: string, keyPath: string[]) => {
    router.push(key)
    console.log(key)
    window.localStorage.setItem('menu-router-path', key)
}

// 获取logo路径
const logoUrl = getImageUrl('myWebsiteIcon.png', 'assetsImages')
console.log(logoUrl)
</script>

<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <div class="menu-logo">
            <img :src="logoUrl" alt="" style="height: 40px" />
        </div>
        <RanderMenuItem :menu-data="menuData" />
    </el-menu>
</template>

<style scoped>
.menu-logo {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
