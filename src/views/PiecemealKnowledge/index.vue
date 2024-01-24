<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import { reactive, ref } from 'vue'

const thisCode1 = ref(`
<script>
    window.name = "globalName";

    let myObject = {
        name: "sven",
        getName: function () {
            return this.name;
        },
    };
    console.log(myObject.getName()); // sven

    let getName = myObject.getName;
    console.log(getName()); // globalName

    let obj1 = {
        name: 'obj1',
        getNames: getName
    }
    console.log(obj1.getNames()); // obj1
<\/script>
`)

const thisCode2 = ref(`
<script>
    // 当用 new 运算符调用函数时，该函数总会返回一个对象
    // 通常情况下，构造器里的 this 就指向返回的这个对象
    var MyClass = function () {
        this.name = "sven";
    };
    var obj = new MyClass();
    console.log(obj.name); // 输出：sven

    // 如果构造器显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this
    var MyClass = function () {
        this.name = "sven";
        return {
            // 显式地返回一个对象
            name: "anne",
        };
    };
    var obj = new MyClass();
    console.log(obj.name); // 输出：anne

    // 如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，那么this仍旧是我们期待的
    var MyClass = function () {
        this.name = "sven";
        return "anne"; // 返回 string 类型
    };
    var obj = new MyClass();
    console.log(obj);
    console.log(obj.name);
<\/script>
`)

const thisCode3 = ref(`
<script>
    // call 和 apply 的区别：
    // 1、call 接收的参数不固定，第一个参数是this要指向的对象，从第二个参数开始往后，每个参数被依次传入函数
    // 2、apply 接收两个参数，第一个参数是this要指向的对象，第二个参数是一个数组或类数组
    var obj1 = {
        name: "sven",
        getName: function () {
            return this.name;
        },
    };
    var obj2 = {
        name: "anne",
    };
    console.log(obj1.getName()); // 输出: sven
    console.log(obj1.getName.call(obj2)); // 输出：anne
<\\/script>

`)
</script>

<template>
    <div>
        <h2>一些零碎的知识点</h2>
        <div class="knowledge-block">
            <h3>1、词法作用域</h3>
            <div class="knowledge-detail">
                词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况下是这样的）。
                <br />
                当变量出现在赋值操作的左侧时进行 LHS 查询，出现在右侧时进行 RHS 查询。
                <br />
                RHS 查询与简单地查找某个变量的值别无二致，而 LHS 查询则是试图
                找到变量的容器本身，从而可以对其赋值。从这个角度说，RHS 并不是真正意义上的“赋
                值操作的右侧”，更准确地说是“非左侧”。
            </div>
        </div>
        <div class="knowledge-block">
            <h3>2、闭包</h3>
            <div class="knowledge-detail">
                无论通过何种手段将内部函数传递到所在的<strong>词法作用域以外</strong>，它都会持有对原始定义作用
                域的引用，无论在何处执行这个函数都会使用闭包。
            </div>
        </div>
        <div class="knowledge-block">
            <h3>3、reactive()</h3>
            <div class="knowledge-detail">
                1、仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number
                和boolean这样的 原始类型 无效。
                <br />
                2、因为
                Vue的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失。
                <br />
                3、Vue 提供了一个 ref() 方法来允许我们创建可以使用任何值类型的响应式 ref
            </div>
        </div>
        <div class="knowledge-block">
            <h3>4、this 的指向（作为普通函数调用 和 作为对象的方法调用）</h3>
            <div class="knowledge-detail">
                <code>
                    {{ thisCode1 }}
                </code>
            </div>
        </div>
        <div class="knowledge-block">
            <h3>5、this 的指向（构造器调用）</h3>
            <div class="knowledge-detail">
                <code>
                    {{ thisCode2 }}
                </code>
            </div>
        </div>
        <div class="knowledge-block">
            <h3>5、this 的指向（call 或 apply 调用）</h3>
            <div class="knowledge-detail">
                <code>
                    {{ thisCode3 }}
                </code>
            </div>
        </div>

        <div>
            <br />

            <br />
        </div>
    </div>
</template>

<style lang="scss" scoped>
h2 {
    text-align: center;
    margin: 10px 0;
    // border-bottom: 1px solid #ABB3CC;
}

.knowledge-block {
    border: 1px solid #abb3cc;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 12px;

    h3 {
        text-decoration: underline;
    }

    .knowledge-detail {
        line-height: 24px;
        font-size: 14px;

        code {
            white-space: pre-wrap;
        }
    }
}
</style>
