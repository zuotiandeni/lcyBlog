<script setup lang="ts">
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    type TitleComponentOption,
    ToolboxComponent,
    type ToolboxComponentOption,
    TooltipComponent,
    type TooltipComponentOption,
    GridComponent,
    type GridComponentOption,
    VisualMapComponent,
    type VisualMapComponentOption,
    DataZoomComponent,
    type DataZoomComponentOption,
    MarkLineComponent,
    type MarkLineComponentOption
} from 'echarts/components'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { nextTick } from 'vue'
import { jsonData } from './data'

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    DataZoomComponent,
    MarkLineComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
])

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | VisualMapComponentOption
    | DataZoomComponentOption
    | MarkLineComponentOption
    | LineSeriesOption
>
var option
nextTick(() => {
    const echartsBox = document.getElementById('echartsBox')
    const myChart = echarts.init(echartsBox as HTMLElement)
    myChart.setOption(
        (option = {
            title: {
                text: 'Beijing AQI',
                left: '1%'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '5%',
                right: '15%',
                bottom: '10%'
            },
            xAxis: {
                data: jsonData.map((item) => {
                    return item[0]
                })
            },
            yAxis: {},
            toolbox: {
                right: 10,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [
                {
                    startValue: '2014-06-01'
                },
                {
                    type: 'inside'
                }
            ],
            visualMap: {
                top: 50,
                right: 10,
                pieces: [
                    {
                        gt: 0,
                        lte: 50,
                        color: '#93CE07'
                    },
                    {
                        gt: 50,
                        lte: 100,
                        color: '#FBDB0F'
                    },
                    {
                        gt: 100,
                        lte: 150,
                        color: '#FC7D02'
                    },
                    {
                        gt: 150,
                        lte: 200,
                        color: '#FD0100'
                    },
                    {
                        gt: 200,
                        lte: 300,
                        color: '#AA069F'
                    },
                    {
                        gt: 300,
                        color: '#AC3B2A'
                    }
                ],
                outOfRange: {
                    color: '#999'
                }
            },
            series: {
                name: 'Beijing AQI',
                type: 'line',
                data: jsonData.map((item) => {
                    return item[1]
                }),
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#333'
                    },
                    data: [
                        {
                            yAxis: 50
                        },
                        {
                            yAxis: 100
                        },
                        {
                            yAxis: 150
                        },
                        {
                            yAxis: 200
                        },
                        {
                            yAxis: 300
                        }
                    ]
                }
            }
        })
    )
})
</script>

<template>
    <div id="echartsBox" style="width: 100%; height: 100%"></div>
</template>

<style scoped lang="scss">
.main-box {
    height: 100%;
}
</style>
