<!--
 * @Author: yuguangzhou
 * @Date: 2021-09-08 22:24:20
 * @LastEditTime: 2021-09-08 22:25:30
 * @LastEditors: yuguangzhou
 * @Description:
-->
<template>
 <div class="">
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 </div>
</template>

<script>
export default {
  name: 'Select',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕11111111111111111111111111111111111111111111111111111111111111111111111'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>

<style scoped lang = "less">

</style>
