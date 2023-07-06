<script setup lang="ts">

const describe = `策略模式（Strategy Pattern）是一种常见的软件设计模式，它可以将算法的定义、使用和管理进行解耦，使得它们可以独立地变化和演化。
在JavaScript中，策略模式通常用于将一组相似的算法封装起来，并且能够根据需要在运行时动态切换使用哪个算法`;

const getSingle = `
// 实现策略模式的方式有以下几种：
// 1、使用对象字面量：可以通过创建不同的函数作为对象的属性，并根据需要动态设置对象属性来选择不同的算法。例如：
var strategies = {
    strategyA: function() { /* 执行策略A的代码 */ },
    strategyB: function() { /* 执行策略B的代码 */ },
    // ...
};

function context(strategy) {
    strategies[strategy]();
}

// 调用时切换策略
context('strategyA');
context('strategyB');


// 2、使用类和继承：可以创建一个抽象的策略类，然后派生出具体的策略类来实现不同的算法。通过在上下文类中持有一个策略对象，可以在运行时设置不同的策略。例如：
// 策略类
class Strategy {
    execute() {
        // 抽象方法，需要在具体策略类中实现
    }
}

// 具体策略类
class StrategyA extends Strategy {
    execute() {
        // 执行策略A的代码
    }
}

class StrategyB extends Strategy {
    execute() {
        // 执行策略B的代码
    }
}

// 上下文类
class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    executeStrategy() {
        this.strategy.execute();
    }
}

// 调用时切换策略
const context = new Context(new StrategyA());
context.executeStrategy();

context.setStrategy(new StrategyB());
context.executeStrategy();


// 3、使用函数式编程：可以将不同的算法封装为函数，并将它们作为参数传递给上下文函数进行调用。例如：
function strategyA() {
    // 执行策略A的代码
}

function strategyB() {
    // 执行策略B的代码
}

function context(strategy) {
    strategy();
}

// 调用时切换策略
context(strategyA);
context(strategyB);
`
</script>

<template>
    <div class="design-mode-box">
        <h3>策略模式</h3>
        <div class="design-mode-describe">
            {{ describe }}
        </div>
        <CodeMirror
            :disabled="true"
            :dark="true"
            :codeStyle="{
                maxWidth: '100%'
            }"
            :code="getSingle"
        />
    </div>
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
