<script setup lang="ts">
import { useSystemConfigStore } from '@/stores/generalConfig'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, ref, type ComponentInternalInstance } from 'vue'
// pinia使用
const { systemDarkPattern } = storeToRefs(useSystemConfigStore())

const containerCode = ref(`

.g-container {
    // .g-container 它被用作容器查询的目标容器
    position: relative;
    width: 300px;
    height: 300px;
    resize: vertical;
    overflow: hidden;
    border: 1px solid red;

    container-type: size; // container-type 属性指定了容器的类型为 size，表示我们将使用容器的尺寸来应用样式。
    container-name: container; // container-name 属性指定了容器的名称为 container，以便在后面的容器查询规则中引用。

    .g-content {
        height: 100%;
    }

    .g-content::before {
        content: '↑';
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
// @container container (height <= 260px) {}
// 表示这是一个容器查询规则，在括号中的条件 (height <= 260px)
// 表示当容器的高度小于等于 260px 时，应用该规则下的样式
// 具体规则为，如果容器的高度小于等于 260px 时，.g-content 元素的伪元素将变得透明

// ******目前兼容性并不太好
@container container (height <= 260px) {
    .g-content::before {
        opacity: 0;
    }
}
`)

const containerCode2 = ref(`

.g-container2 {
    .g-content::before {
        bottom: clamp(-9999px, calc(calc(100% - 260px) * 100000), 0px);
    }
}
`)
const clickBeforeEl = () => {
    ElMessage.success('点击了')
}
</script>

<template>
    <h2>
        <span>CSS实现动态高度下的不同样式展现</span>
        <a href="https://codepen.io/lcyurban/pen/XWOgYvm">CodePen</a>
    </h2>
    <h3>实现方式一：借助最新的容器查询</h3>
    <CodeMirror
        :disabled="true"
        :codeStyle="{
            maxWidth: '100%'
        }"
        :dark="systemDarkPattern"
        :code="containerCode"
    />

    <div class="g-container">
        <div class="g-content" @click="clickBeforeEl">
            这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....
            这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....
            这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....
            这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....这是一段内容....
            这是一段内容....这是一段内容....这是一段内容....这是一段内容....
            这是一段内容....这是一段内容....这是一段内容....这是一段内容....
            这是一段内容....这是一段内容....这是一段内容....
            这是一段内容....这是一段内容....这是一段内容....这是一段内容....
        </div>
    </div>

    <h3>实现方式二：clamp + calc</h3>

    <CodeMirror
        :disabled="true"
        :codeStyle="{
            maxWidth: '100%'
        }"
        :dark="systemDarkPattern"
        :code="containerCode2"
    />
    <div class="g-container2">
        <div class="g-content" @click="clickBeforeEl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, amet id dignissimos
            nulla repellat doloribus porro illo ipsum accusantium incidunt quos fuga, sapiente
            aspernatur quaerat voluptas praesentium sed veritatis aliquam.
        </div>
    </div>
</template>

<style lang="scss" scoped>
.g-container {
    container-type: size;
    container-name: container;
}
.g-container2,
.g-container {
    position: relative;
    margin: auto;
    width: 300px;
    height: 200px;
    padding: 10px;
    line-height: 2;
    background: #999;
    color: #fff;
    text-align: justify;
    border: 5px solid #000;
    resize: vertical;
    overflow: hidden;
    .g-content {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .g-content::before {
        content: '↑';
        font-size: 30px;
        cursor: pointer;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, 0);
        transition: 0.3s;
        pointer-events: auto;
    }
}
@container container (height <= 230px) {
    .g-content::before {
        opacity: 0;
    }
}

.g-container2 {
    .g-content::before {
        bottom: clamp(-9999px, calc(calc(100% - 260px) * 100000), 0px);
        // bottom: calc(100% - 280px);
        // bottom: clamp(-99999px, calc(100% - 260px), 10px);
    }
}
</style>
