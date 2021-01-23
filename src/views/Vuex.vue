<template>
  <div class="">
    <!-- vuex 练习 -->
    <h1>vuex练习</h1>
    <h2>{{$store.state.name}}</h2>
    <el-button @click="change">点击修改state</el-button>
    <el-button @click="yibuchange">异步修改state</el-button>
  </div>
</template>

<script>
export default {
  name: 'Vuex',
  data () {
    return {
      msg: 'Welcome to your vueName'
    }
  },
  methods: {
    change () {
      this.$store.commit('edit', 15)
    },
    yibuchange () {
      this.$store.dispatch('aedit', 30)
    }
  }
}
/*
*
*
*
*
*/

</script>

<style >
</style>
