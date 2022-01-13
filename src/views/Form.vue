<!--
 * @Author: yuguangzhou
 * @Date: 2021-06-25 15:46:51
 * @LastEditTime: 2021-07-05 16:36:32
 * @LastEditors: yuguangzhou
 * @Description: Form
-->
<template>
  <div class="form">
    <el-button type="primary" @click="add">添加</el-button>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item
        label="活动名称"
        v-for="(item, index) in form.list"
        :key="index"
        :prop="`list.${index}.name`"
        :rules="{
          required: true,
          message: '名称不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <div>活动名称</div>
        </template>
        <templete slot="">
          <el-input></el-input>
        </templete>
      </el-form-item>
    </el-form>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        list: [
          {
            name: ''
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    add () {
      this.form.list.push({ name: '' })
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="less">
.form {
  width: 600px;
  margin: 0 auto;
  margin-top: 200px;
}
</style>
