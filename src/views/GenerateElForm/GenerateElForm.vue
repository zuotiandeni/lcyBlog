<script setup lang="ts">
import GenerateElForm from '@/components/GenerateElForm/Index'
import { reactive, ref } from 'vue'
import TestTSXComp from './components/test'
import TestVueComp from './components/test.vue'
import { querySearchFun } from './components/AutocompleteFun'

// 评分的图标
import { ChatDotRound, ChatLineRound, ChatRound } from '@element-plus/icons-vue'

const FormConfig = reactive({
    rowConfigBind: {
        gutter: 20,
        colSpan: 8
        // className: 'row-class'
    },
    formConfigBind: {
        labelPosition: 'top'
    },
    colsList: [
        {
            label: '一个普通的输入框',
            colSpan: 8,
            type: 'el-input',
            specificType: 'text',
            bindObj: {
                placeholder: '请输入文字',
                formatter: (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                parser: (value: any) => value.replace(/\$\s?|(,*)/g, '')
            },
            key: 'name'
        },
        {
            label: '一个普通的输入框',
            htmlLabel:
                '<span class="customize-label-style">\n' +
                '            自定义tooltip效果\n' +
                '                <span class="tip-content-wrap">\n' +
                '                      <span class="tip-content">这是自己定义的tooltip</span>\n' +
                '                      <span class="triangle-style"></span>\n' +
                '                </span>\n' +
                '\n' +
                '        </span>\n',
            colSpan: 8,
            type: 'el-input',
            specificType: 'text',
            bindObj: {
                placeholder: '请输入文字',
                formatter: (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                parser: (value: any) => value.replace(/\$\s?|(,*)/g, '')
            },
            key: 'name2'
        },
        {
            label: '添加了append文字的输入框',
            colSpan: 8,
            type: 'el-input',
            bindObj: {
                placeholder: '请输入'
            },
            rules: [
                {
                    required: true,
                    message: '请输入',
                    trigger: 'change'
                }
            ],
            slots: [
                {
                    name: 'append',
                    content: '.com'
                }
            ],
            key: 'comAdress'
        },
        {
            label: '添加了append JSX组件的输入框',
            colSpan: 8,
            type: 'el-input',
            bindObj: {
                placeholder: '请输入'
            },
            slots: [
                {
                    name: 'append',
                    content: TestTSXComp
                }
            ],
            key: 'appendJSXComp'
        },
        {
            label: '添加了append Vue组件的输入框',
            colSpan: 8,
            type: 'el-input',
            bindObj: {
                placeholder: '请输入'
            },
            slots: [
                {
                    name: 'append',
                    content: TestVueComp
                }
            ],
            key: 'appendVueComp'
        },
        {
            label: '数字输入框',
            colSpan: 4,
            type: 'el-input-number',
            bindObj: {
                placeholder: '请输入'
            },
            key: 'inputNumberVal'
        },
        {
            label: '测试表单生成函数',
            type: 'slots',
            key: 'content',
            colSpan: 24
        },
        {
            label: '下拉选',
            colSpan: 8,
            type: 'el-select',
            bindObj: {
                placeholder: '请选择',
                multiple: true
            },
            options: [
                {
                    label: '第一个选项',
                    value: 'A',
                    bindObj: {
                        disabled: true
                    }
                },
                {
                    label: '第二个选项',
                    value: 'B'
                },
                {
                    label: '第三个选项',
                    value: 'C'
                }
            ],
            key: 'optionValue'
        },
        {
            label: '单选框',
            colSpan: 8,
            type: 'el-radio',
            options: [
                {
                    label: '第一个选项',
                    value: 'A',
                    bindObj: {
                        disabled: true
                    }
                },
                {
                    label: '第二个选项',
                    value: 'B'
                },
                {
                    label: '第三个选项',
                    value: 'C'
                }
            ],
            key: 'radioValue'
        },
        {
            label: '按钮单选框',
            colSpan: 8,
            type: 'el-radio',
            bindObj: {
                textColor: 'red'
            },
            options: [
                {
                    label: '第一个选项',
                    value: 'A',
                    isButton: true
                },
                {
                    label: '第二个选项',
                    value: 'B',
                    isButton: true
                },
                {
                    label: '第三个选项',
                    value: 'C',
                    isButton: true // 如果是button样式展示，那么设置此属性为true
                }
            ],
            key: 'radioBtnValue'
        },
        {
            label: '自动补全输入框',
            colSpan: 8,
            type: 'el-autocomplete',
            bindObj: {},
            querySearchFun: querySearchFun,
            key: 'autocompleteValue'
        },
        {
            label: '日期选择框',
            colSpan: 8,
            type: 'el-date-picker',
            specificType: 'date',
            bindObj: {},
            key: 'detePickerValue'
        },
        {
            label: '测试表单生成函数2',
            type: 'slots',
            key: 'content',
            colSpan: 24
        },
        {
            label: '日期时间选择框',
            colSpan: 8,
            type: 'el-date-picker',
            specificType: 'datetime',
            bindObj: {},
            key: 'deteTimePickerValue'
        },
        {
            label: '日期时间选择框',
            colSpan: 8,
            type: 'el-date-picker',
            specificType: 'datetime',
            bindObj: {},
            key: 'deteTimePickerValue'
        },
        {
            label: '评分',
            colSpan: 8,
            type: 'el-rate',
            bindObj: {
                voidIcon: 'ChatRound',
                colors: ['#409eff', '#67c23a', '#FF9900'],
                icons: [ChatRound, ChatLineRound, ChatDotRound]
            },
            key: 'rateValue'
        },
        {
            label: '滑块',
            colSpan: 8,
            type: 'el-slider',
            bindObj: {
                showInput: true
            },
            key: 'elSliderValue'
        },
        {
            label: '开关',
            colSpan: 8,
            type: 'el-switch',
            bindObj: {
                style: '--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949'
            },
            key: 'elSwitchValue'
        },
        {
            label: '时间选择器',
            colSpan: 4,
            type: 'el-time-picker',
            key: 'timePickerValue'
        },
        {
            label: '时间选择',
            colSpan: 4,
            type: 'el-time-select',
            key: 'timeSelectValue'
        }
    ]
})

// 监听数据变化的方法
const watcherFun = (key: string, oldVal: any, newVal: any) => {
    console.log(
        '监听到数据变化',
        `当前变化的key是: ${key}, 它的旧值是: ${oldVal}, 它的新值是: ${newVal}`
    )
}

// 数据定义
const formData = reactive({
    name: '',
    comAdress: '',
    inputNumberVal: '',
    appendJSXComp: '',
    appendVueComp: '',
    optionValue: [],
    autocompleteValue: ''
})

// 获取实例
const formInstance = ref<InstanceType<typeof GenerateElForm> | null>(null)
// 获取数据
const getData = () => {
    // formInstance.value?.$.exposed.formRef.value
    formInstance.value?.$.exposed?.submitForm().then((res: any) => {
        console.log(res)
    })
}
// 重置表单数据
const resetFields = () => {
    formInstance.value?.$.exposed?.resetFields()
    console.log(formData)
}
// 在JSX中使用slots的相关代码
const slotsCode = `
<ElInput
    type={elItem.type}
    {...elItem.bindObj}
    v-model={formData[elItem.key]}
    v-slots={{
        // 默认插槽
        defalut: ()=>{
            return <>默认插槽的内容</>
        },
        // 具名插槽
        defalut: ()=>{
            return <>具名插槽的内容</>
        },
    }}
    // 如果插槽的内容是一个组件，则需要调用组件的render方法
    // 如果插槽的内容是通过JSX的方式定义的，则需要调用它
    // 如果插槽的内容是普通文字，则直接放入即可
/>`
</script>

<template>
    <div>
        <h2>目标：编写一个配置式的Vue3表单组件（过程中记录编写方式、逻辑、思路）</h2>
        <div class="thinking">
            1、通过jsx的方式进行不同表单项的生成<br />
            2、JSX中定义slot需要采用：context.slots[elItem.key]?.()<br />
            3、每个表单项可能会有自己的插槽，此时JSX中需要使用一种不一样的方式：<br />
            <code style="white-space: pre-wrap">{{ slotsCode }}</code
            ><br />
            4、需要进行布局的排版生成（el-col）<br />
            5、通过 选项的 isButton 属性，决定渲染出的单选框是普通的还是按钮样式的！<br />
            6、为表单添加监听方法：返回每次变更的数据的key以及它的 newVal 和 oldVal<br />
            7、表单之间可能存在联动关系，需要触发联动关系
            8、联动关系主要存在：是否隐藏、是否禁用、是否默认值、是否必填（是否必填：需要添加字段控制，通过控制字段来控制表单的校验规则）
            9、是否需要进行联动的设计？与wti-form不同的是表单数据和业务数据是相关联的
        </div>
        <GenerateElForm
            ref="formInstance"
            :form-config="FormConfig"
            :form-data="formData"
            @updateFormValue="watcherFun"
        >
            <template #content>
                <div class="form-slot-one">这是插槽的内容</div>
            </template>
        </GenerateElForm>
        <el-button @click="getData">获取formdata</el-button>
        <el-button @click="resetFields">重置表单数据</el-button>
    </div>
</template>

<style lang="scss" scoped>
.thinking {
    margin: 10px;
    padding: 10px;
    border: 1px solid #f5c9f5;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3a4566;
    line-height: 22px;
    font-weight: 400;
    white-space: pre-line;
}

.form-slot-one {
    border: 1px solid #662348;
    padding: 15px;
    margin: 10px 0;
    text-align: center;
    line-height: 32px;
}

// 自定义label
:deep(.customize-label-style) {
    &:hover .tip-content-wrap {
        display: block;
    }
    .tip-content-wrap {
        display: none;
        .tip-content {
            position: absolute;
            bottom: 2rem;
            left: 0;
            padding: 0.5rem 1rem;
            min-width: 10rem;
            text-align: left;
            text-align-last: left;
            // transform: translateX(-50%);
            font-family: PingFangSC-Regular;
            font-size: 0.9rem;
            color: #ffffff;
            line-height: 1rem;
            font-weight: 400;
            background: rgba(0, 0, 0, 0.75);
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
            border-radius: 2px;
        }
        .triangle-style {
            position: absolute;
            bottom: 1rem;
            left: 0;
            transform: translateX(calc(5rem - 50%));
            border: 0.5rem solid transparent;
            border-top-color: rgba(0, 0, 0, 0.75);
        }
    }
}
</style>
