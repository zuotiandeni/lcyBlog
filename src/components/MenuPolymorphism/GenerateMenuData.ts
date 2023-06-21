import { reactive } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router/index'

// export const demoMenuConfig = [
//     {
//         type: 'el-sub-menu',
//         key: '1',
//         title: '产品中心',
//         iconComp: 'message',
//         children: [
//             {
//                 type: 'el-sub-menu',
//                 key: '1-1',
//                 title: '新建产品',
//                 iconComp: '',
//                 children: [
//                     {
//                         type: 'el-menu-item',
//                         key: '1-1-1',
//                         title: 'A1类增长型',
//                         iconComp: ''
//                     }
//                 ]
//             },
//             {
//                 type: 'el-menu-item-group',
//                 key: '1-2',
//                 title: '投资放款',
//                 iconComp: '',
//                 children: [
//                     {
//                         type: 'el-menu-item',
//                         key: '1-2-1',
//                         title: '自定义借据',
//                         iconComp: ''
//                     },
//                     {
//                         type: 'el-menu-item',
//                         key: '1-2-2',
//                         title: '投资放款',
//                         iconComp: ''
//                     }
//                 ]
//             },
//             {
//                 type: 'el-menu-item',
//                 key: '1-3',
//                 title: '发行定价',
//                 iconComp: ''
//             }
//         ]
//     }
// ]

export interface RouteMenuConf {
    type: string
    title: string
    key: string
    iconComp?: string
    children: RouteMenuConf[] | []
}

// 根据路由信息生成菜单
export function recursionGenerateMenu(list: readonly RouteRecordRaw[], value: any) {
    list.forEach((routerItem) => {
        // 如果 demoNavigation 属性为 false，则不展示在导航栏中
        if (routerItem?.meta?.demoNavigation !== false) {
            const menuItem: RouteMenuConf = {
                type: routerItem?.meta?.type as string,
                title: routerItem?.meta?.nameZH as string,
                iconComp: routerItem?.meta?.icon as string,
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



export function generateMenuData(parentPath: string) {
    // 生成菜单---start
    const menuData: RouteMenuConf | [] = reactive([])
    // 调用菜单生成方法
    let menuRoutes: RouteRecordRaw[] = []
    router.options.routes.forEach((item) => {
        if (item.path === '/' && item.children && item.children.length > 0) {
            menuRoutes = item.children.filter((appItem) => {
                return appItem.path === parentPath
            })
        }
    })
    console.log(menuRoutes)

    recursionGenerateMenu(menuRoutes[0].children as RouteRecordRaw[], menuData)

    return menuData;
}


