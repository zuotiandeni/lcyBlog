<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mutationObserverExample = `
var observer = new MutationObserver(function (mutationRecoards, observer) {
    //mutationRecoards变动数组
    // observer 观察者实例
});
`

const text1 = `1. observe(node, config) 启动监听，它接受两个参数。
    第一个参数：所要观察的 DOM节点
    第二个参数：一个配置对象，指定所要观察的特定变动 配置对象如下：
`
const text2 = `2. disconnect()
    disconnect方法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。
`
const text3 = `3. takeRecords()
    用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。
`

const text4 = `DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个MutationRecord实例所组成的数组。
MutationRecord对象包含了DOM的相关信息，有如下属性:
    ·type：观察的变动类型（attribute、characterData或者childList）。
    ·target：发生变动的DOM节点。
    ·addedNodes：新增的DOM节点。
    ·removedNodes：删除的DOM节点。
    ·previousSibling：前一个同级节点，如果没有则返回null。
    ·nextSibling：下一个同级节点，如果没有则返回null。
    ·attributeName：发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
    ·oldValue：变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null。
`

const editor = ref()
const observer = new MutationObserver((mutationsList, observer) => {
    console.log(mutationsList, observer)
    console.log('变化')
})
onMounted(() => {
    observer.observe(editor.value, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    })
})
</script>

<template>
    <div class="design-mode-box">
        <h3>MutationObserver监听DOM示例</h3>
        <div class="design-mode-describe">
            <div>
                <h3>1、MutationObserver是什么？</h3>
                MutationObserver用来监视 DOM 变动。DOM
                的任何变动，比如节点的增减、属性的变动、文本内容的变动都会触发MutationObserver事件。
                但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM
                的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM
                的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。
            </div>
            <div>
                <h3>2、MutationObserver的特点？</h3>
                <ul>
                    <li>它等待所有脚本任务完成后，才会运行（即异步触发方式）。</li>
                    <li>
                        它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。
                    </li>
                    <li>它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。</li>
                </ul>
            </div>
            <div>
                <h3>3、MutationObserver的构造函数？</h3>
                <CodeMirror
                    :disabled="true"
                    :dark="true"
                    :codeStyle="{
                        maxWidth: '100%'
                    }"
                    :code="mutationObserverExample"
                />
            </div>
            <div>
                <h3>4、MutationObserver的实例方法？</h3>
                <div style="white-space: pre">
                    {{ text1 }}
                </div>
                <ul>
                    <li>childList：子节点的变动（指新增，删除或者更改）。</li>
                    <li>attributes：属性的变动。</li>
                    <li>characterData：节点内容或节点文本的变动。</li>
                    <li>subtree：布尔值，表示是否将该观察器应用于该节点的所有后代节点。</li>
                    <li>
                        attributeOldValue：布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
                    </li>
                    <li>
                        characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
                    </li>
                    <li>attributeFilter：数组，表示需要观察的特定属性（比如[‘class’,‘src’]）。</li>
                </ul>
                <strong>
                    对一个节点添加观察器，就像使用addEventListener方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。但是，如果指定不同的options对象，就会被当作两个不同的观察器。
                </strong>
                <div style="white-space: pre">
                    {{ text2 }}
                </div>
                <div style="white-space: pre">
                    {{ text3 }}
                </div>
            </div>
            <div>
                <h3>5、MutationRecord 对象</h3>
                <div style="white-space: pre">
                    {{ text4 }}
                </div>
            </div>
        </div>

        <div contenteditable="true" ref="editor" id="editor">
            点击开始，控制台查看输出 <strong>编辑文本</strong>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.design-mode-box {
    margin: 8px;
    color: var(--text-color-intro);
    background-color: var(--background-color-shallow);
}

.design-mode-describe {
    color: var(--text-color-intro);
    background-color: var(--background-color-shallow);
    transition: color 0.3s;
}

.design-mode-describe {
    --tw-bg-opacity: 1;
    font-size: 16px;
    white-space: pre-line;
    padding: 8px;
    border-radius: 4px;
    margin: 10px 0;
}
h3 {
    margin-top: 1rem;
}

#editor {
    height: 300px;
    width: 100%;
}
</style>
