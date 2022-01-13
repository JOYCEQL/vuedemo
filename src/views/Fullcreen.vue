<!--
 * @Author: yuguangzhou
 * @Date: 2021-08-10 15:50:32
 * @LastEditTime: 2021-08-10 16:36:15
 * @LastEditors: yuguangzhou
 * @Description:
-->
<template>
  <div>
    <a-icon type="woman" ref="refName"   @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.$refs.refName.$el.click()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    click () {
      document.documentElement.requestFullscreen()
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.enabled) {
        screenfull.request() // 默认全屏显示
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
    .screenfull-svg {
      display: inline-block;
      cursor: pointer;
      fill: #5a5e66;
      width: 20px;
      height: 20px;
      vertical-align: 10px;
    }
</style>
