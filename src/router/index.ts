import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../Main.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    meta: {
                        nameZH: '首页'
                    },
                    component: HomeView
                },
                {
                    path: '/blog',
                    name: 'blog',
                    meta: {
                        nameZH: '博客中心'
                    },
                    children: [
                        {
                            path: '/blog/Vue3Blog',
                            name: 'Vue3Blog',
                            meta: {
                                nameZH: 'Vue3'
                            },
                            component: () => import('../views/Vue3Blog.vue')
                        }
                    ]
                },
                {
                    path: '/demo',
                    name: 'blogDemo',
                    meta: {
                        nameZH: '样板间'
                    },
                    component: () => import('../views/Demo.vue'),
                    children: [
                        {
                            path: '/demo/Echarts',
                            name: 'Echarts',
                            meta: {
                                // demoNavigation: false, // 如果值为false，则demo的菜单中不展示
                                navigation: false, // 如果值为false，则主导航栏中不展示
                                type: 'el-sub-menu', // 取值为 el-sub-menu el-menu-item-group el-menu-item
                                nameZH: 'Echarts',
                                icon: 'IconEchartsMain'
                            },
                            children: [
                                {
                                    path: '/demo/EchartsAQI',
                                    name: 'EchartsAQI',
                                    meta: {
                                        // demoNavigation: false, // 如果值为false，则demo的菜单中不展示
                                        navigation: false, // 如果值为false，则主导航栏中不展示
                                        type: 'el-menu-item', // 取值为 el-sub-menu el-menu-item-group el-menu-item
                                        nameZH: 'AQI',
                                        icon: 'message'
                                    },
                                    component: () => import('../views/Demos/EchartsAQI.vue')
                                }
                            ]
                        },
                        {
                            path: '/demo/PiniaUsed',
                            name: 'PiniaUsed',
                            meta: {
                                navigation: false, // 如果值为false，则主导航栏中不展示
                                type: 'el-menu-item', // 取值为 el-sub-menu el-menu-item-group el-menu-item
                                nameZH: 'Pinia使用',
                                icon: 'message'
                            },
                            component: () => import('../views/Demos/PiniaUsed.vue')
                        },
                        {
                            path: '/demo/Interflow',
                            name: 'Interflow',
                            meta: {
                                navigation: false, // 如果值为false，则主导航栏中不展示
                                type: 'el-menu-item', // 取值为 el-sub-menu el-menu-item-group el-menu-item
                                nameZH: '组件间通信',
                                icon: 'message'
                            },
                            component: () => import('../views/Demos/InterflowParent.vue')
                        },
                    ]
                },
                {
                    path: '/GenerateElForm',
                    name: 'GenerateElForm',
                    meta: {
                        nameZH: '配置式ElPlus'
                    },
                    component: () => import('../views/GenerateElForm/GenerateElForm.vue')
                },
                {
                    path: '/PiecemealKnowledge',
                    name: 'PiecemealKnowledge',
                    meta: {
                        nameZH: '零碎的知识点'
                    },
                    component: () => import('../views/PiecemealKnowledge/index.vue')
                },
                {
                    path: '/UsefulCodeSnippet',
                    name: 'UsefulCodeSnippet',
                    meta: {
                        nameZH: '有用的代码片段'
                    },
                    component: () => import('../views/UsefulCodeSnippet/index.vue'),
                    children: [
                        {
                            path: '/UsefulCodeSnippet/DebounceAndThrottle',
                            name: 'DebounceAndThrottle',
                            meta: {
                                navigation: false, // 如果值为false，则主导航栏中不展示
                                type: 'el-menu-item', // 取值为 el-sub-menu el-menu-item-group el-menu-item
                                nameZH: '防抖&节流',
                                icon: 'message'
                            },
                            component: () => import('../views/UsefulCodeSnippet/components/DebounceAndThrottle.vue')
                        },
                        {
                            path: '/UsefulCodeSnippet/TimeChunk',
                            name: 'TimeChunk',
                            meta: {
                                navigation: false, // 如果值为false，则主导航栏中不展示
                                type: 'el-menu-item', // 取值为 el-sub-menu el-menu-item-group el-menu-item
                                nameZH: '分时函数',
                                icon: 'message'
                            },
                            component: () => import('../views/UsefulCodeSnippet/components/TimeChunk.vue')
                        },
                    ]
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                nameZH: '登录',
                navigation: false
            },
            component: () => import('../views/Login.vue')
        },
        {
            path: '/notFound',
            name: 'not-found',
            meta: {
                nameZH: 'not-found',
                navigation: false
            },
            component: () => import('../views/404Page.vue')
        },
        // 所有未定义的路由都将被重定向到/notFound
        {
            path: '/:pathMatch(.*)',
            redirect: '/notFound',
            meta: {
                navigation: false
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        // 登录后才能访问
        if (!window.sessionStorage.getItem('token')) {
            // 没有登录
            next(`/login?redirect=${to.path}`)
            // 在登录页面的登录成功的逻辑中，使用redirect的值进行跳转
            // const back = router.options.history.state.back
            // const redirectUrl = route.query.redirect
            // const redirectUrlStr = ref('')
            // if (redirectUrl) {
            //     redirectUrlStr.value = redirectUrl.toString()
            // }
            // 调用登录接口 、、、（根据实际操作编写代码）
            // if (登陆成功) {
            //     // 返回上一页或者首页
            //     if (redirectUrl) {
            //         router.replace({ path: redirectUrlStr.value })
            //     } else if (back) {
            //         router.go(-1)
            //     } else {
            //         router.replace({ path: '/' })
            //     }
            // }
        } else {
            // 已经登录
            next()
        }
    } else {
        // 不用登陆就可访问
        if (window.sessionStorage.getItem('token')) {
            // 如果已经登录，访问登录页面的话跳转到首页
            if (to.path == '/login') {
                next({
                    path: '/'
                })
            }
        } else {
            next()
        }
    }
})

export default router
