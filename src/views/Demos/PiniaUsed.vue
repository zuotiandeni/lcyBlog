<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

// pinia使用
const { count, doubleCount } = storeToRefs(useCounterStore())
const { increment } = useCounterStore()
// 也可以使用一个对象接收useCounterStore
// const objCounterStore = useCounterStore()
</script>

<template>
    <div>从pinia中获取到的count：{{ count }}</div>
    <div>从pinia中获取到的doubleCount：{{ doubleCount }}</div>
    <div>
        <el-button @click="increment('add')">增加count</el-button>
        <el-button @click="increment">减少count</el-button>
    </div>
</template>

<style scoped lang="scss">
.main-box {
    height: 100%;
}
</style>
