<template>
  <div class="Theme">
    <el-button type="primary">主题测试</el-button>
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  data () {
    return {
      value: true
    }
  }
}
</script>

<style >
</style>
