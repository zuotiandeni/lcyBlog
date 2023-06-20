<script setup lang="ts">
import { inject, ref } from 'vue'

export interface Props {
    userName: string
}

// 定义带有默认值的 props
const parentData = withDefaults(defineProps<Props>(), {
    userName: '法外狂徒-张三'
})
// 接收方法
const emit = defineEmits<{
    'update:userName': [value: string] // 具名元组语法
}>()
// 定义调用方法
const myName = () => {
    emit('update:userName', '法外狂徒·张三')
}

const monologue = ref<string>('孩子的内心独白：学好罗老师，走遍天下也不怕')

defineExpose({
    monologue
})

// 依赖注入 start（如果提供的是的是响应式数据，那么接收到的也不会失去响应式）
const familyName = inject('familyName')
const familyBackground = inject('familyBackground')
// 依赖注入 end
</script>

<template>
    <div style="border: 1px solid #ccc">
        <div>子组件接收到的来自父组件的数据：{{ parentData.userName }}</div>
        <el-button @click="myName">子组件改变名字：法外狂徒·张三</el-button>
        <div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <h3>依赖注入的数据</h3>
            <span>{{ familyName }} —— {{ familyBackground }}</span>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
