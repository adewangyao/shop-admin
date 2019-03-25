<template>
<el-container class="loginBg">
  <div class="login-container">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginFormel"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
        <el-button type="primary" class="btnlogin" @click="Onlogin">登陆</el-button>
    </el-form>
  </div>
</el-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    var userVaild = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var passVaild = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            validator: userVaild,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: passVaild,
            triggrt: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    Onlogin () {
      this.$refs.loginFormel.validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    async login () {
      var resData = await axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
      var res = resData.data.data
      if (res) {
        if (res.status === 401) {
          this.$router.push('.login')
        } else {
          this.$router.replace('/')
        }
        window.localStorage.setItem('token', res.token)
      } else {
        this.$message.error(`登录失败：${resData.data.meta.msg}`)
      }
    }
  }
}
</script>
<style scoped>
.loginBg {
  height: 100%;
  width: 100%;
  background: #fcfc;
  font-display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 360px;
  padding: 44px 20px;
  background: #fff;
  opacity: .8;
  border-radius: 12px;
}
.btnlogin {
  width: 80%;
  margin-left: 50px;
}
.demo-ruleForm {
  margin-right: 40px;
}
</style>
