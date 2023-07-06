<script setup lang="ts">
import { ref } from 'vue'

// 分时函数
const timeChunk = ref(`
    function timeChunk(array, process, interval, quantity=1) {
        let timeout;
        let index = 0;

        function start() {
            // 遍历数组中的元素，每次处理 quantity 个
            for (let i = index; i < Math.min(index + quantity, array.length); i++) {
                const item = array[i];
                process(item); // 调用传入的处理函数处理当前元素
            }

            index+=quantity; // 更新索引，准备处理下 quantity 个元素

            // 如果还有未处理完的元素，则在指定的间隔时间后继续执行 start 函数
            if (index < array.length) {
                timeout = setTimeout(start, interval);
            }
        }

        return {
            start, // 返回一个对象，包含 start 方法和 stop 方法
            stop() {
                clearTimeout(timeout); // 调用 stop 方法时，清除定时器
            }
        };
    }

    // 使用示例
    const dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const chunk = timeChunk(dataArray, (item) => {
        console.log(item); // 打印当前元素
    }, 1000, 3);

    chunk.start(); // 开始执行
`)

const explain = `
    · timeChunk函数接受四个参数：要处理的数组array、处理函数process、间隔时间interval和每次处理的数量quantity。
    · 函数内部定义了timeout变量来保存定时器的引用，index变量用于记录当前处理到的元素的索引。
    · start函数用于启动分时处理，它遍历数组中的元素，并将每个元素传递给处理函数进行处理。
    · 在每次处理元素后，index自增1，以便下次循环处理下一个元素。
    · 如果还有未处理完的元素，通过setTimeout设置定时器，在指定的间隔时间后继续执行start函数，实现分时处理的间隔效果。
    · 最后，timeChunk函数返回一个包含start方法和stop方法的对象，供外部使用。
`

</script>

<template>
    <div style="margin: 8px;">
        <div class="detail-box">
            <h3>分时函数实现：</h3>
            <div class="explain-box">
                {{ explain }}
            </div>
            <CodeMirror
                :disabled="true"
                :codeStyle="{
                    maxWidth: '100%'
                }"
                :dark="true"
                :code="timeChunk"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
h3 {
    font-size: 20px;
}
.explain-box {
    --tw-bg-opacity: 1;
    font-size: 16px;
    white-space: pre-line;
    background-color: rgb(244 246 248 / var(--tw-bg-opacity));
    padding: 8px;
    border-radius: 4px;
}

.detail-box {
    margin: 8px;
}
</style>
