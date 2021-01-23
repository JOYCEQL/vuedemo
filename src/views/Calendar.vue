<template>
  <div class="calendar">
<v-calendar :attributes='attrs' is-expanded
></v-calendar>

  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      // 当前日期
      attrs: [
        {
          key: 'today',
          // 括号内传递日期可点亮指定日期，如new Date(2019, 6, 1)，也可传递多个日期：如dates: [ new Date(2018, 0, 1), new Date(2018, 0, 15) ]
          dates: new Date(),
          highlight: true,
          // popover 点亮的日期上出现提示内容
          popover: {
            label: '美好的一天！要开心呦！'
          }
        }
      ]
    }
  }
}
</script>

<style lang='less'>
.vc-container {
  .vc-grid-container {
    width: 100%;
    display: -ms-grid;
    &.vc-weeks {
      padding: 5px 6px 7px 6px;
    }
    .vc-day-content {
      min-height: 1.8rem;
      width: 1.8rem;
      height: 1.8rem;
      margin: 0.1rem auto;
    }
  }
}
</style>
