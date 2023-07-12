<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'

import { useSystemConfigStore } from '@/stores/generalConfig'
import { storeToRefs } from 'pinia'

// pinia使用
const { systemDarkPattern } = storeToRefs(useSystemConfigStore())

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
    DatasetComponent,
    ToolboxComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
])

/**
 * ***************************************************
 *  echarts: 渲染 及 处理 逻辑 start                    ***
 *  动态切换配置等...                                   ***
 * ***************************************************
 */

// echars的样式宽高
const echartStyle = reactive({
    width: '100%',
    height: '100%'
})

// 被挂载的DOM
const echartsBox = ref<HTMLElement>()
// echart实例
let echartExample: echarts.ECharts | null = null
// 数据选项
let chartDataOptions: any = {}
onMounted(() => {
    // 初始化图标实例
    echartExample = echarts.init(
        echartsBox.value as HTMLElement,
        systemDarkPattern.value ? 'dark' : '',
        {
            renderer: 'canvas'
        }
    )
    // 数据加载的loading动画
    echartExample.showLoading()
    window.addEventListener('resize', () => {
        // 宽高变化时，改变echarts的大小
        echartExample?.resize()
    })

    setTimeout(() => {
        // // 普通的配置方式
        // chartDataOptions = {
        //     legend: {},
        //     tooltip: {},
        //     xAxis: {
        //         type: 'category',
        //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //     },
        //     yAxis: {
        //         type: 'value'
        //     },
        //     series: [
        //         {
        //             name: '2022',
        //             data: [120, 200, 150, 80, 70, 110, 130],
        //             type: 'bar'
        //         },
        //         {
        //             name: '2023',
        //             data: [120, 200, 150, 80, 70, 110, 130],
        //             type: 'bar'
        //         }
        //     ]
        // }
        // 关闭数组加载的动画
        echartExample?.hideLoading()

        chartDataOptions = {
            title: {
                text: 'echarts图',
                textStyle: {
                    fontWeight: '400',
                    fontSize: 20
                },
                textAlign: 'left', // 整体（包括 text 和 subtext）的水平对齐。
                left: 50, // title 组件离容器左侧的距离。
                top: 0
            },
            // 调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色
            color: ["#4cabce", "#e5323e"],
            // 图例的配置项
            legend: {
                // horizontal: 横向图例   vertical：竖直排列
                orient: 'vertical',
                // 以下配置项：相当于绝对定位到最右边
                right: 0,
                inactiveBorderColor: 'rgba(176, 62, 62, 1)'
,
            },
            tooltip: {},
            dataset: {
                // 此种方式需要引入：DatasetComponent
                // 提供一份数据。
                source: [
                    ['product', '2022', '2023'],
                    ['Mon', 120, 30],
                    ['Tue', 200, 280],
                    ['Wed', 150, 220],
                    ['Thu', 80, 350],
                    ['Fri', 70, 130],
                    ['Sat', 110, 450],
                    ['Sun', 130, 310]
                ]
            },
            grid: { top: '55%' },
            // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
            xAxis: { type: 'category' },
            // 声明一个 Y 轴，数值轴。
            yAxis: { gridIndex: 0 },
            // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: [
                { 
                    type: 'bar',
                    // 柱条的背景色
                    showBackground: true,
                    backgroundStyle: {
                        color: '#ccc',
                        borderColor: 'red'
                    },
                    // 在系列中设置了颜色，则不会去调色盘取色
                    itemStyle: {
                        color: 'orange'
                    }
                },
                { type: 'bar' },
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    selectedOffset: 80, // 选中扇区的偏移量
                    seriesLayoutBy: 'row',
                    label: {
                        // b表示：数据名，d表示：百分比
                        formatter: '{b}: Mon  ({d}%)'
                    },
                    // 在系列中设置了颜色，则不会去调色盘取色
                    itemStyle: {
                        color: (params: any)=> {
                            console.log(params);
                            if (params.dataIndex === 0) {
                                return 'orange'
                            } else {
                                return '#4cabce'
                            }
                        }
                    },
                    emphasis: {
                        // 高亮状态的扇区和标签样式。
                        // 'none' 不淡出其它图形，默认使用该配置。
                        // 'self' 只聚焦（不淡出）当前高亮的数据的图形。
                        // 'series' 聚焦当前高亮的数据所在的系列的所有图形。
                        focus: 'self'
                    },
                    encode: {
                        itemName: 0,
                        value: 1,
                        tooltip: 1
                    }
                }
            ]
        }

        echartExample?.setOption(chartDataOptions)
    }, 1000)

    // 联动饼图
    linkageFunc()
})

// 监听暗黑模式的切换
watch(
    () => systemDarkPattern.value,
    (newVal) => {
        // echartExample?.setOption(
        //     {
        //         // 动态设置颜色
        //         theme: newVal ? 'dark' : '',
        //     }
        // )
        echartExample?.dispose()
        echartExample = echarts.init(echartsBox.value as HTMLElement, newVal ? 'dark' : '', {
            renderer: 'canvas'
        })
        echartExample.setOption(chartDataOptions)
        linkageFunc()
    }
)

onUnmounted(() => {
    window.removeEventListener('resize', () => {
        // 宽高变化时，改变echarts的大小
        echartExample?.resize()
    })
    console.log(echartExample?.isDisposed())
    // dom被卸载时，销毁实例
    echartExample?.dispose()
    console.log(echartExample?.isDisposed())
})

/**
 * ***************************************************
 *  echarts: 渲染 及 处理 逻辑 end                      ***
 *  动态切换配置等...                                   ***
 * ***************************************************
 */

// 动态改变数据
const changeData = () => {
    const source = [...chartDataOptions.dataset.source, ['endDay', 180, 65]]
    echartExample?.setOption({
        dataset: {
            source
        }
    })
}

// 饼图联动
const linkageFunc = () => {
    echartExample?.on('mouseover', 'series.bar', function (params: any) {
        console.log(params)
        params.dataIndex
        const series = JSON.parse(JSON.stringify(chartDataOptions.series))
        series.at(-1).encode.value = params.dataIndex + 1
        series.at(-1).encode.tooltip = params.dataIndex + 1
        series.at(-1).label.formatter = `{b}: ${params.name}  ({d}%)`
        echartExample?.setOption({
            series
        })
    })
}
/**
 * 代码段
 */

const code = `
// 第一种数据配置方式：
// 普通的配置方式
chartDataOptions = {
    legend: {},
    tooltip: {},
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '2022',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        },
        {
            name: '2023',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }
    ]
}


// 第二种数据配置方式
chartDataOptions = {
    legend: {},
    tooltip: {},
    dataset: {
        // 此种方式需要引入：DatasetComponent
        // 提供一份数据。
        source: [
            ['product', '2022', '2023'],
            ['Mon', 120, 130],
            ['Tue', 200, 280],
            ['Wed', 150, 120],
            ['Thu', 80, 60],
            ['Fri', 70, 130],
            ['Sat', 110, 150],
            ['Sun', 130, 310]
        ]
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: { type: 'category' },
    // 声明一个 Y 轴，数值轴。
    yAxis: { name: 'GDP总额' },
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [{ type: 'bar' }, { type: 'bar' }]
}
`
</script>

<template>
    <div style="height: 600px">
        <div ref="echartsBox" :style="echartStyle"></div>
    </div>

    <div @click="changeData">改变数据data</div>

    <el-divider> 以下是 Echarts 数据配置的两种方式 </el-divider>

    <CodeMirror
        :disabled="true"
        :codeStyle="{
            maxWidth: '100%'
        }"
        :dark="systemDarkPattern"
        :code="code"
    />
</template>
