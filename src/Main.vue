<script setup lang="ts">
import { RouterView, type RouteRecordRaw } from 'vue-router'
import { nextTick, onMounted, reactive, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { computed } from '@vue/reactivity'
import Menu from './components/Menu/Menu.vue'
import { type TreeData } from '@/components/Menu/Menu'
import router from './router'

onMounted(() => {
    // 设置浏览器的title为环境变量中的自定义title
    document.title = import.meta.env.VITE_TITLE
    // ElMessage('This is a message.')
})
// 菜单数据
// const menuData = reactive<TreeData[]>([
//     {
//         name: '首页',
//         icon: 'AddLocation',
//         key: '/',
//         children: []
//     },
//     {
//         name: '博客中心',
//         icon: 'AddLocation',
//         key: '/blog',
//         children: [
//             {
//                 name: 'demo',
//                 icon: 'AddLocation',
//                 key: '/blog/demo',
//                 children: []
//             }
//         ]
//     }
// ])

// 根据路由信息生成菜单
function recursionGenerateMenu(list: readonly RouteRecordRaw[], value: any) {
    list.forEach((routerItem) => {
        // 如果 navigation 属性为 false，则不展示在导航栏中
        if (routerItem?.meta?.navigation !== false) {
            const menuItem: TreeData = {
                name: routerItem?.meta?.nameZH as string,
                icon: routerItem?.meta?.icon as string,
                key: routerItem.path,
                children: []
            }
            if (routerItem.children && routerItem.children.length > 0) {
                recursionGenerateMenu(routerItem.children, menuItem.children)
            }
            value.push(menuItem)
        }
    })
}
// 定义菜单数组
const menuData: TreeData | [] = reactive([])
// 调用菜单生成方法
console.log(router.options.routes)
const menuRoutes = router.options.routes.filter((item) => {
    return item.path === '/'
})
console.log(menuRoutes)

recursionGenerateMenu(menuRoutes[0].children as RouteRecordRaw[], menuData)
console.log(menuData)

// 设置elementPlus的全局配置
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const MenuComp = ref<InstanceType<typeof Menu> | null>(null)
let menuCompHeight = ref('')
// 获取菜单的高度
onMounted(() => {
    nextTick(() => {
        menuCompHeight.value = MenuComp.value?.$el.offsetHeight + 'px'
    })
})

// 获取当前路由
</script>

<template>
    <el-config-provider :locale="locale">
        <el-container>
            <el-header class="header-container">
                <Menu ref="MenuComp" :menu-data="menuData" />
            </el-header>
            <el-main class="main-container" :style="{ height: `calc(100% - ${menuCompHeight})` }">
                <RouterView />
            </el-main>
        </el-container>
    </el-config-provider>
</template>

<style scoped lang="scss">
/* .header-container {
    height: 3.5rem;
} */
.main-container {
    overflow: auto;
}
.el-container {
    height: 100%;

    .el-main {
        padding-top: 0;
    }
}
</style>
