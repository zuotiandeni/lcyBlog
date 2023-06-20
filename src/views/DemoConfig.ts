import { reactive } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const demoMenuConfig = [
    {
        type: 'el-sub-menu',
        key: '1',
        title: '产品中心',
        iconComp: 'message',
        children: [
            {
                type: 'el-sub-menu',
                key: '1-1',
                title: '新建产品',
                iconComp: '',
                children: [
                    {
                        type: 'el-menu-item',
                        key: '1-1-1',
                        title: 'A1类增长型',
                        iconComp: ''
                    }
                ]
            },
            {
                type: 'el-menu-item-group',
                key: '1-2',
                title: '投资放款',
                iconComp: '',
                children: [
                    {
                        type: 'el-menu-item',
                        key: '1-2-1',
                        title: '自定义借据',
                        iconComp: ''
                    },
                    {
                        type: 'el-menu-item',
                        key: '1-2-2',
                        title: '投资放款',
                        iconComp: ''
                    }
                ]
            },
            {
                type: 'el-menu-item',
                key: '1-3',
                title: '发行定价',
                iconComp: ''
            }
        ]
    }
]

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
