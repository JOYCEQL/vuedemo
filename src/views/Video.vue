<!--
 * @Author: yuguangzhou
 * @Date: 2021-07-06 11:52:30
 * @LastEditTime: 2021-07-28 16:16:42
 * @LastEditors: yuguangzhou
 * @Description: 西瓜播放器组件
-->
<template>
  <div>
      <el-tabs v-model="activeName" @tab-click='handleClick'>
        <el-tab-pane   v-for="(item) in tabList" :key="item.index" :label="item.label" :name="item.name">
          <div :ref="'video1'+item.index"></div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import Player from 'xgplayer'
export default {
  data () {
    return {
      player: null,
      activeName: 'second',
      tabList: [
        {
          index: 0,
          label: '用户管理',
          name: 'first'
        },
        {
          index: 1,
          label: '栏目管理',
          name: 'second'
        }
      ]
    }
  },
  created () {

  },
  mounted () {
    this.init(1)
  },
  methods: {
    handleClick (item) {
      this.init(item.index)
    },
    init (index) {
      // if (this.player) {
      //   this.player.destroy()
      // }
      console.log(this.$refs['video1' + index])
      this.player = new Player({
        el: this.$refs['video1' + index][0],
        url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
        pip: true,
        videoInit: true,
        playsinline: true,
        lang: 'zh-cn',
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        whitelist: [
          ''
        ],
        fluid: false,
        download: true,
        height: 450,
        width: 600
      })
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="less">

</style>
