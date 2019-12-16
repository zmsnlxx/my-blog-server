<template>
    <section class="register">
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>欢迎注册</span>
            </div>
            <div style="margin-top: 20px">
                <el-form label-width="80px" :model="form" :rules="rules" ref="ruleForm" >
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="form.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="name">
                        <el-input type="text" v-model="form.name" placeholder="请输入用户名"
                                  autocomplete="new-password"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password" placeholder="请输入密码"
                                  autocomplete="new-password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goRegister">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import Types from '../../../types/index'


    @Component

    export default class register extends Vue {
        protected form: any = {
            email: "",
            name: '',
            password: "",
        };
        validatePass: any = (rule:any, value: any, callback: any) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        rules:any = {
            name: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            password: [
                { validator: this.validatePass, trigger: 'blur' }
            ]
        };

        goRegister() {
            const ruleForm: any = this.$refs.ruleForm;
            ruleForm.validate((valid: any) => {
                if (valid) {
                    this.$api.register(this.form).then((req: Types.InterfaceData) => {
                        const {code, data} = req;
                        if (code === 0) {
                            this.$router.push({path: "/login"});
                        } else {
                            this.$message.error(data);
                        }
                    }).catch((err: any) => {
                        console.log(err);
                    });
                } else {
                    return false;
                }
            });
        }
    }
</script>

<style lang="less" scoped>
.register {
    width: 100%;
    height: 100%;
    background-color: #999999;
    box-sizing: border-box;
    padding-top: 50px;
    .box-card {
        width: 50%;
        margin: 0 auto;
    }
}
</style>
