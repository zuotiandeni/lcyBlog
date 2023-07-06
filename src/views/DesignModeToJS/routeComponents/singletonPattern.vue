<script setup lang="ts">

const describe = `1、在 JavaScript 中，单例模式是一种设计模式，用于确保一个类只有一个实例，并提供了一个全局访问点来访问该实例。它的主要目的是限制实例的创建和共享。
2、单例模式在 JavaScript 中可以使用字面量对象、惰性单例和构造函数单例等方式来实现。`;

const getSingle = `
// 一个通用的惰性单例：通过闭包和惰性加载的方式，实现了一个通用的惰性单例方法——getSingle
let getSingle = function (fn) {
    let result = fn.apply(this, arguments);
    return function () {
        return result;
    };
};

const A1 = getSingle(() => {
    console.log('name');
});

console.log(A1); // ƒ () { return result; }

A1();

const A2 = getSingle(() => {
    console.log('name1');
});

console.log(A2); // ƒ () { return result; }

const A2res1 = A2()
const A2res2 = A2()
console.log(A2res1 === A2res2)


/* 

以上代码的执行过程如下：

    1、首先，定义了一个名为getSingle的函数，该函数接受一个参数fn，表示要创建单例的函数。
    2、在函数内部，定义了一个变量result，用于保存单例的实例。
    3、然后，通过fn.apply(this, arguments)调用传入的函数fn，并将其执行结果赋值给result。
    4、接下来，返回一个闭包函数，闭包函数中直接返回保存的result，实现了惰性加载并确保只返回同一个实例。
    5、在主程序中，首先通过getSingle函数创建了一个单例对象A1，传入的函数是一个输出'name'的箭头函数。这个时候，getSingle函数内部会执行传入的函数，并将结果保存在result中。然后输出A1，可以看到它是一个函数。
    6、然后，再次调用getSingle函数创建了一个单例对象A2，传入的函数是一个输出'name1'的箭头函数。同样，getSingle函数内部会执行传入的函数，并将结果保存在result中。然后输出A2，可以看到它也是一个函数。
    7、继续调用两次A2()，打印A2res1 === A2res2的比较结果，结果为true。说明A2res1和A2res2的值相等，即两次调用A2()得到的结果相同。

总结起来，以上代码通过闭包和惰性加载的方式实现了一个通用的惰性单例方法getSingle，保证在多次调用时只返回同一个实例。通过传入不同的函数作为参数，可以创建不同的单例对象。

*/
`
</script>

<template>
    <div class="design-mode-box">
        <h3>单例模式</h3>
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
