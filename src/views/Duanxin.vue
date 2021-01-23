<template>
  <div class="login">
        <!-- 手机号 -->
        <InputGroup
            type="number"
            placeholder="手机号"
            v-model="phone"
            :btnTitle="btnTitle"
            :disabled="disabled"
            :error="errors.phone"
            @btnClick="getVerifyCode"
        />
        <!-- 输入验证码 -->
        <InputGroup
            type="number"
            v-model="verifyCode"
            placeholder="验证码"
            :error="errors.code"
        />
        <!-- 登录按钮 -->
    <div class="login_btn">
          <button @click="handleLogin" :disabled="isClick">登录</button>
     </div>
  </div>
</template>

<script>
import InputGroup from '../components/input'
import axios from 'axios'
// axios.defaults.baseURL = 'http://v.juhe.cn/sms/send'

export default {
  name: 'vueName',
  components: {
    InputGroup
  },
  data () {
    return {
      phone: '', // 手机号
      verifyCode: '', // 验证码
      btnTitle: '获取验证码',
      disabled: false, // 是否可点击
      errors: {} // 验证提示信息
    }
  },
  methods: {
    getVerifyCode () {
      // 获取验证码if(this.validatePhone()) {
      this.validateBtn()
      // 发送网络请求
      axios.post('/v1', {
        // 注册聚合数据找到短信api服务，申请会得到两个tpl_id和key值，然后填入相对应的就行，具体还是和你门后端进行沟通
        tpl_id: '216019',
        key: '5b58dba49e7cc39b2a4cc906b3d6b10f',
        tpl_value: '%23code%23%3D654654',
        mobile: this.phone
      }).then(res => {
        console.log(res)
      })
    },
    validatePhone () {
      // 判断输入的手机号是否合法
      if (!this.phone) {
        this.errors = {
          phone: '手机号码不能为空'
        }
        // return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请输入正确是手机号'
        }
        // return false
      } else {
        this.errors = {}
        return true
      }
    },
    validateBtn () {
      // 倒计时
      let time = 60
      const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.disabled = false
          this.btnTitle = '获取验证码'
        } else {
          this.btnTitle = time + '秒后重试'
          this.disabled = true
          time--
        }
      }, 1000)
    }
  }
}
</script>

<style >

</style>
