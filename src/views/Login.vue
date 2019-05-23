<template>
  <div class="login-container flex-center flex-column">
    <div class="login-content">
      <h2 class="login-title">博客后台管理</h2>
      <div class="login-body">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="请输入账号">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              icon="md-heart"
              long
              shape="circle"
              @click="handleSubmit('formInline')"
            >登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { adminLogin } from "@/api/getData"
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不得少于6位",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login()
        } else {
          this.$Message.error("账户密码格式错误")
        }
      })
    },
    async login() {
      const res = await adminLogin({
        user_name: this.formInline.user,
        user_pwd: this.formInline.password
      })
     if(res.status == "1"){
       this.$router.replace({ path: "/admin" })
       this.$Message.success(res.msg)
     }else{
        this.$Message.error(res.msg)
     }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  &-container {
    max-width: 400px;
    min-height: 100vh;
    margin: auto;
  }
  &-content {
    width: 100%;
    min-height: 200px;
    padding: 10px 30px 0;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0px 6px 20px rgba(36, 37, 38, 0.13);
  }
  &-title {
    padding: 10px 0 12px;
    border-bottom: 1px solid #e8eaec;
  }
  &-body {
    padding: 30px 0 0;
  }
}
</style>
