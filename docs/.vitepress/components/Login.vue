<script setup>
import { ref, reactive } from 'vue'
import { data as head } from '../lib/p.data'
import { data as tail } from '../lib/d.data'
import { ElMessage } from 'element-plus'
import { auth } from '../lib/auth.js'
import { useRouter } from 'vitepress'

const router = useRouter();

const loading = ref(false)

const user = reactive({
    n: '',
    p: ''
})

const ruleFormRef = ref()

const rules = reactive({
    n: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    p: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const submitForm = async (formEl) => {
    if (!formEl) return;
    if (loading.value) return;
    loading.value = true;
    try {
        await formEl.validate(); 
        const { n, p } = user;

        const userData = head.a.concat(tail.a) === n && head.b.concat('@').concat(tail.b) === p;

        if (!userData) {
            auth.logout()
            return ElMessage.error('用户名或密码错误');
        }

        auth.login()

        router.go('/blog/')

        ElMessage({
            message: '登陆成功！',
            type: 'success',
        });
        
        
    } catch (error) {
        if (error?.fields) { // 表单校验错误
            ElMessage.error('表单校验失败');
        } 
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="container" v-loading="loading">
        <div class="login">
            <div class="login-title">天迈文章中心</div>
            <el-form ref="ruleFormRef" :model="user" :rules="rules">
                <el-form-item prop="n">
                    <el-input class="form-input" v-model="user.n" placeholder="用户名" @keyup.enter="submitForm(ruleFormRef)"/>
                </el-form-item>
                <el-form-item prop="p">
                    <el-input class="form-input" v-model="user.p" placeholder="密码" type="password" show-password @keyup.enter="submitForm(ruleFormRef)"/>
                </el-form-item>
                <el-form-item>
                    <el-button color="var(--vp-c-brand)" type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--vp-c-bg-alt);
}

.login {
    width: 460px;
    padding: 80px;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--vp-c-bg);
    /* border: 1px solid var(--vp-c-border); */
}

.login-title {
    background: linear-gradient(to right, #ff5cb5, #9f79f9);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: var(--vp-home-hero-name-color);
    font-size: 30px;
    line-height: 30px;
    font-weight: 540;
    margin-bottom: 40px;
    text-align: center;
}

:deep(.form-input .el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--vp-c-brand) inset !important;
}

.el-button {
    width: 100%;
    height: 34px;
    color: #fff;
}
</style>