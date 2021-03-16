<template>
 <div class="">
        <span>部门：</span>
                <div class="itemInput">
                     <tag-select style="width: 100%;vertical-align: top;" :data="baseInfo.initDeptName" :type="'org'" :multiple=false  @callBack="tagSelectDeptCB($event,baseInfo)" :idType=0></tag-select>
                </div>
 </div>
</template>

<script>
export default {
  name: 'vueName',
  data () {
    return {
      msg: 'Welcome to your vueName'
    }
  },
  tagSelectDeptCB () {
    arguments[1].initDeptValue = arguments[0].id
  }
}
</script>

<style >

</style>
