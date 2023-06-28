<script setup lang="ts">
import { ref } from 'vue'

import { useSystemConfigStore } from '@/stores/generalConfig'
import { storeToRefs } from 'pinia'

// pinia使用
const { systemDarkPattern } = storeToRefs(useSystemConfigStore())
console.log(systemDarkPattern.value)

// 防抖
const debounce = ref(`
function debounce(func, delay, immediate = false) {
  let timer = null;
  let result = null;
  const debounced = function(...args) {
    clearTimeout(timer);
    if (immediate && !timer) {
      result = func.apply(this, args);
    }
    timer = setTimeout(() => {
      if (!immediate) {
        result = func.apply(this, args);
      }
      timer = null;
    }, delay);
    return result;
  };
  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}


// 这里的 debounce 函数接受三个参数，第一个参数是需要执行的回调函数，第二个参数是时间间隔，第三个参数是是否立即执行回调函数，默认值为 false。
// 在函数内部使用了闭包，声明了三个变量 timer、result 和 debounced。timer 和 result 分别用于保存定时器的 ID 和回调函数的返回值，debounced 是一个新的函数，用于执行防抖操作。

// 在每次执行函数前先清除上一次的计时器，然后根据 immediate 的值来判断是否立即执行回调函数，如果是，则执行回调函数并将返回值保存到 result 中；
// 否则，等待指定的时间间隔后再执行回调函数，并将返回值保存到 result 中。最后返回 result。

// 此外，还通过给 debounced 函数添加一个 cancel 方法，用于手动取消执行回调函数的操作。
`)

// 节流
const throttle = ref(`
function throttle(func, delay) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
`)

const explain = `
防抖和节流都是前端开发中常用的优化技术，它们的区别在于执行时间点的不同。

防抖指的是在事件被触发 n 秒后再进行回调函数的执行，如果在这段时间内事件再次被触发，则重新开始计时。防抖的作用是防止频繁触发事件导致执行过多的计算和请求，从而提高代码性能。比如输入框自动搜索功能，用户输入搜索关键字后需要等待一段时间才会发起搜索请求，若用户在这段时间内继续输入，就会重新开始计时。

节流指的是间隔一段时间后再执行回调函数，也就是说事件会被分成若干个时间段，只有每个时间段最多执行一次回调函数。节流的作用是减少执行回调函数的次数和频率，从而提高代码性能。比如页面滚动事件，如果每次滚动都会触发相应的操作，就会导致页面卡顿，采用节流可以让滚动更加顺畅。

总结来说，防抖适用于需要等待一段时间后才能进行下一步操作的场景，节流适用于需要限制操作频率的场景。
`

// 夜间模式将返回true
console.log(window.matchMedia('(prefers-color-scheme: dark)'))

console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
</script>

<template>
    <div style="margin: 8px">
        <div>
            <h3>防抖和节流的区别是什么？</h3>
            <div class="explain-box" :style="systemDarkPattern ? { color: 'darkblue' }: undefined">
                {{ explain }}
            </div>
        </div>
        <div class="detail-box">
            <h3>防抖代码实现：</h3>
            <CodeMirror
                :disabled="true"
                :dark="systemDarkPattern"
                :codeStyle="{
                    maxWidth: '100%'
                }"
                :code="debounce"
            />
        </div>
        <div class="detail-box">
            <h3>节流代码实现：</h3>
            <CodeMirror
                :disabled="true"
                :codeStyle="{
                    maxWidth: '100%'
                }"
                :dark="systemDarkPattern"
                :code="throttle"
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
