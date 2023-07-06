<script setup lang="ts">

const title = '代理模式'
const subClassList = [
    {
        describe: `在JavaScript中，代理模式（Proxy Pattern）是一种结构型设计模式，它允许你提供一个替代或者占位对象，以控制对原始对象的访问。
代理模式可以用于各种情况，例如：延迟加载（Lazy Loading），访问控制，缓存，日志记录等。它通过封装对象背后的复杂性，为客户端提供了简单的接口`,
        code: ``
    },
    {
        title: '虚拟代理（Virtual Proxy）：',
        describe: `场景：用于延迟加载资源昂贵的对象，减少初始加载时间。
    示例：延迟加载大型图片或视频，在需要时才真正加载并显示。`,
        code: ``
    },
    {
        title: '远程代理（Remote Proxy）：',
        describe: `场景：用于处理远程服务的访问，隐藏网络通信的复杂性。
    示例：通过代理对象调用远程API，实现跨域通信或者与后端服务进行交互。`,
        code: ``
    },
    {
        title: '保护代理（Protective Proxy）：',
        describe: `场景：用于控制对敏感对象的访问，并限制或检查访问权限。
    示例：实现用户身份验证，只有认证通过的用户才能访问某个敏感资源。`,
        code: ``
    },
    {
        title: '缓存代理（Caching Proxy）：',
        describe: `场景：用于为开销大的计算结果提供缓存，以提高性能。
    示例：缓存函数的计算结果，下次相同的输入参数直接返回缓存的结果。`,
        code: ``
    },
    {
        title: '智能代理（Smart Proxy）：',
        describe: `场景：在访问对象时添加一些额外的逻辑，例如执行额外的操作或记录日志。
    示例：在访问对象之前进行权限检查、日志记录、性能监控等操作。`,
        code: ``
    },
]
</script>

<template>
    <CodeTemplate :title="title" :sub-class-list="subClassList"/>
</template>

<style lang="scss" scoped>
h3{
    font-size: 20px;
}

.design-mode-box {
    margin: 8px;
}

.design-mode-describe {
    --tw-bg-opacity: 1;
    font-size: 16px;
    white-space: pre-line;
    background-color: rgb(244 246 248/var(--tw-bg-opacity));
    padding: 8px;
    border-radius: 4px;
    margin: 10px 0;
}
</style>
