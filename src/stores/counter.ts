import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
interface useCounter {
    count: Ref<number>
    doubleCount: Ref<number>
    increment: Function
}
export const useCounterStore = defineStore('counter', (): useCounter => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment(operationType: String) {
        if (operationType === 'add') {
            count.value++
        } else {
            count.value--
        }
    }

    return { count, doubleCount, increment }
})
