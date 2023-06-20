import { reactive, ref, type Ref } from 'vue'
import type { FormInstance, FormRules, FormItemProp } from 'element-plus'

// 表单相关
interface ruleForm {
    userName: string
    password: string
}

export function getFormAbout() {
    // TODO: 另一种elementPlus类型使用方式---START
    // import type { ElForm } from 'element-plus'
    // type FormInstance = InstanceType<typeof ElForm>
    // type FormRules = InstanceType<typeof ElForm>
    // TODO: 另一种elementPlus类型使用方式---END
    const ruleForm: ruleForm = reactive({
        userName: '',
        password: ''
    })
    // 记录校验结果
    const checkFormStatus = reactive({
        userName: true,
        password: true
    })
    // 某一项表单的校验被触发
    const formValidate = (
        prop: InstanceType<typeof FormItemProp>,
        isValid: boolean,
        message: string
    ) => {
        console.log(prop, isValid, message)
        checkFormStatus[prop as keyof ruleForm] = isValid
    }
    // 这里的类型在使用的时候需要注意
    const rules = reactive<InstanceType<typeof FormRules>>({
        userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 11, message: '用户名长度6-11位', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 11, message: '长度需要再6-11位', trigger: 'blur' }
        ]
    })
    const submitForm = async (formEl: InstanceType<typeof FormInstance> | undefined) => {
        if (!formEl) return
        await formEl.validate((valid: boolean, fields: any) => {
            if (valid) {
                console.log('submit!')
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    const resetForm = (formEl: InstanceType<typeof FormInstance> | undefined) => {
        console.log(formEl)

        if (!formEl) return
        formEl.resetFields()
        checkFormStatus.password = true
        checkFormStatus.userName = true
        console.log(checkFormStatus)
    }

    return {
        resetForm,
        submitForm,
        rules,
        formValidate,
        checkFormStatus,
        ruleForm
    }
}
