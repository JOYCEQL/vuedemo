<!--
 * @Author: yuguangzhou
 * @Date: 2021-07-04 11:47:58
 * @LastEditTime: 2021-08-30 13:39:35
 * @LastEditors: yuguangzhou
 * @Description: ref测试
-->
<template>
  <div class="refs">
        <div  :ref="'btn'+index"  v-for="(item,index) in dataList" :key="index" @click="handle(item.id,index)">测试</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        {
          id: 233
        },
        {
          id: 123
        },
        {
          id: 212
        }
      ]
    }
  },
  created () {

  },
  mounted () {
    this.handle(12, 0)
  },
  methods: {
    handle (id, index) {
      console.log(this.$refs['btn' + index])
      this.$refs['btn' + index][0].classList.add('active')
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="less">
.refs{
  display: flex;
  flex-direction: column;
  justify-content: center;
  div{
    width: 200px;
    margin: 20px;
    background-color: pink;
    height: 100px;
  }
}
</style>
