<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'

import { useSystemConfigStore } from '@/stores/generalConfig'
import { storeToRefs } from 'pinia'

// pinia使用
const { systemDarkPattern } = storeToRefs(useSystemConfigStore())

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
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
let chartDataOptions:any = {}
onMounted(() => {
    // 初始化图标实例
    echartExample = echarts.init(
        echartsBox.value as HTMLElement,
        systemDarkPattern.value ? 'dark' : '',
        {
            renderer: 'canvas'
        }
    )

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

        echartExample?.setOption(chartDataOptions)
    }, 1000)
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
 const changeData = ()=>{
    const source = [ ...chartDataOptions.dataset.source, [ 'endDay', 50, 65 ]]
    echartExample?.setOption({
        dataset: {
            source
        }
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
    <div style="height: 300px;">
        <div ref="echartsBox" :style="echartStyle"></div>
    </div>

    <div @click="changeData">改变数据data</div>

    <el-divider>
      以下是 Echarts 数据配置的两种方式
    </el-divider>

    <CodeMirror
        :disabled="true"
        :codeStyle="{
            maxWidth: '100%'
        }"
        :dark="systemDarkPattern"
        :code="code"
    />
</template>
