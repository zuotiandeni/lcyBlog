import { type FormConfig, renderElItem, renderColumn, renderRows } from './generate'
import { withModifiers, defineComponent, ref, defineProps, type PropType } from 'vue'
import { ElForm } from 'element-plus'
const App = defineComponent({
    props: {
        formData: Object,
        formConfig: Object as PropType<FormConfig>, // defineComponent标注类型比较特殊
    },
    setup(props, context) {
        const formRef = ref()
        const submitForm = () => {
            return new Promise(async(resolvue) => {
                if (!formRef) {
                    resolvue({
                        type: false,
                        data: '获取dem失败'
                    })
                }
                console.log(formRef);
                // TODO: 在这里一定要注意加上.value
                await formRef.value.validate((valid: boolean, fields: any) => {
                    if (valid) {
                        console.log('submit!')
                        resolvue({
                            type: true,
                            data: props.formData
                        })
                    } else {
                        resolvue({
                            type: false,
                            data: fields
                        })
                    }
                })
            })
        }
        const resetFields = () => {
            if (!formRef) return
            formRef.value.resetFields()
          }
        // 使用 expose 暴露组件内部的方法
        context.expose({ 
            submitForm,
            resetFields,
            formRef })
        return () => (
            // <div>
            //   {props.formConfig!.map(item=>{
            //     // 插槽需要在上下文中获取
            //     return renderElItem(item, props.formData as Object, context)
            //   })}
            // </div>
            <ElForm ref={formRef} {...props.formConfig?.formConfigBind} model={props.formData}>
                {renderRows(props.formConfig as FormConfig, props.formData as Object, context)}
            </ElForm>
        )
    }
})
export default App
