<template>
 <div class="prinfWord">
      <div id="printMe" style="background:red;">
        <p>葫芦娃，葫芦娃</p>
        <p>一根藤上七朵花 </p>
        <p>小小树藤是我家啦啦啦啦 </p>
        <p>叮当当咚咚当当浇不大</p>
        <p> 叮当当咚咚当当是我家</p>
        <p> 啦啦啦啦</p>
        <p>...</p>
    </div>

    <button v-print="'#printMe'">Print local range</button>
 </div>
</template>

<script>
export default {
  name: 'prinfWord',
  data () {
    return {
    }
  }
}
</script>

<style >

</style>
