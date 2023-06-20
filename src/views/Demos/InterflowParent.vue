<script setup lang="ts">
import { nextTick, onMounted, provide, ref, type Ref } from 'vue'
import InterflowChild from './InterflowChild.vue'

const userName = ref<string>('')
const changeBtnBGColor = () => {
    if (userName.value === '尼古拉斯·赵四') {
        userName.value = ''
    } else {
        userName.value = '尼古拉斯·赵四'
    }
}

// 获取组件实例，并为组件定义类型
const childInstance = ref<InstanceType<typeof InterflowChild> | null>(null)

// 依赖提供 start
const familyName: Ref<string> = ref('爱新觉罗')
provide('familyName', familyName)
const familyBackground = ref<string>('皇室后裔')
provide('familyBackground', familyBackground)

const theFlightOfTime = () => {
    familyBackground.value = '时光荏苒，仅仅五十年大清就亡了，从此·爱新觉罗·成了被遗落的”皇族“'
}
// 依赖提供 end
</script>

<template>
    <div class="interflow-box">
        <h1>父组件修改自身数据</h1>
        <div>
            <el-button @click="changeBtnBGColor">changeUserName</el-button>
            <InterflowChild ref="childInstance" v-model:userName="userName">
                <div>
                    <h3>时光荏苒</h3>
                    <el-button @click="theFlightOfTime">过去了五十年</el-button>
                </div>
            </InterflowChild>
        </div>
    </div>
    <div>
        <h1>父组件获取到的子组件信息</h1>
        <span>{{ childInstance?.monologue }}</span>
    </div>
</template>

<style scoped lang="scss">
.interflow-box {
    text-align: center;
}
</style>
