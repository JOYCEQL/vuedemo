<!--
 * @Author: yuguangzhou
 * @Date: 2021-01-23 14:32:02
 * @LastEditTime: 2021-04-20 18:26:28
 * @LastEditors: yuguangzhou
 * @Description:
-->
<template>
 <div class="">
      <a-form
    :model="formData"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="账号" name="name">
      <a-input v-model="formData.name" />
    </a-form-item>
    <a-form-item label="密码" name="password">
         <a-input v-model="formData.password" />
    </a-form-item>
  </a-form>
 </div>
</template>

<script>
export default {
  name: 'vueName',
  data () {
    return {
      formData: {
        name: '',
        password: ''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  }
}
</script>

<style >

</style>
