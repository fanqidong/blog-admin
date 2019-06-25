<template>
  <div class="login-container login">
    <div class="login-wrapper shadow">
      <div class="login-clone shadow"></div>
      <h2 class="login-title tc">博客后台登录</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-s-custom" v-model="ruleForm.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button
            @click="submitForm('ruleForm')"
            class="btn-login"
            type="primary"
            :loading="isLoading"
            round
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminLogin } from '@/api/getData'
export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(name) {
      //   this.isLoading = true
      this.$refs[name].validate(valid => {
        if (valid) {
          //   this.$message.success('登录成功')
            this.handleLogin()
        } else {
          this.$message.error('账户或密码格式错误')
        }
      })
    },
    async handleLogin() {
      this.isLoading = true
      const res = await adminLogin({
        user_name: this.ruleForm.name,
        user_pwd: this.ruleForm.password
      })
      if (res.code === 1) {
        this.$message.success('登录成功')
        this.isLoading = false
        this.$router.replace({
          path: '/admin'
        })
        return
      }
      this.$message.error(res.msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  &-container {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(https://view.moezx.cc/images/2019/04/17/bg.jpg) no-repeat center/cover;
  }
  &-wrapper {
    position: relative;
    min-width: 400px;
    padding: 10px 20px;
    margin: auto;
    background: #fff;
  }
  &-clone {
    position: absolute;
    left: 16px;
    top: 16px;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: -1;
  }
  &-title {
    padding: 10px 0;
  }
  .btn-login {
    width: 80%;
  }
}
@media screen and (max-width: 768px) {
  .login-wrapper {
    min-width: 80vw;
  }
}
</style>

