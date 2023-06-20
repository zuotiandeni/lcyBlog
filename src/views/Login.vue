<script setup lang="ts">
// import { type ComponentPublicInstance, ref } from 'vue'
// const ruleFormRef = ref<ComponentPublicInstance>()
import { ref } from 'vue'
import { getFormAbout } from './Login'
import type { FormInstance } from 'element-plus'
const formAbout = getFormAbout()
const ruleFormRef = ref<InstanceType<typeof FormInstance>>()
</script>

<template>
    <main class="login-box">
        <div class="login-left">
            <h1 class="login-title">一个来自火星的男人</h1>
            <el-form
                ref="ruleFormRef"
                :model="formAbout.ruleForm"
                :rules="formAbout.rules"
                label-width="0"
                class="demo-ruleForm"
                status-icon
                @validate="formAbout.formValidate"
            >
                <fieldset :class="!formAbout.checkFormStatus.userName && 'check-failure'">
                    <legend>用户名</legend>
                    <el-form-item prop="userName">
                        <el-input
                            placeholder="请输入用户名"
                            v-model="formAbout.ruleForm.userName"
                        />
                    </el-form-item>
                </fieldset>
                <fieldset :class="!formAbout.checkFormStatus.password && 'check-failure'">
                    <legend>密码</legend>
                    <el-form-item prop="password">
                        <el-input
                            placeholder="请输入密码"
                            type="password"
                            v-model="formAbout.ruleForm.password"
                        />
                    </el-form-item>
                </fieldset>

                <el-form-item>
                    <el-button type="primary" @click="formAbout.submitForm(ruleFormRef)">
                        Create
                    </el-button>
                    <el-button @click="formAbout.resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-right"></div>
    </main>
</template>

<style scoped lang="scss">
.login-box {
    height: 100%;
    display: flex;
    .login-left {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        min-width: 700px;

        .login-title {
            text-align: center;
            margin-bottom: 45px;
        }

        fieldset {
            padding: 0;
            border: 2px solid;
            border-color: #cccccc;
        }

        .check-failure {
            // TODO: CSS使用data变量
            border-color: #f56c6c;
        }

        :deep(.el-form) {
            width: 600px;

            .el-input__wrapper {
                box-shadow: none;
            }

            .el-form-item__error {
                margin-left: 11px;
            }
        }
    }
    .login-right {
        width: 40%;
        height: 100%;
        background-image: url('../assets/images/login-bg.jpg');
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: cover;
    }
}
</style>
