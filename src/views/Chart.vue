<template>
  <div class="">
    <!-- 移动端图表练习 -->
    <canvas
      id="myChart"
      width="400"
      height="260"
    ></canvas>

  </div>
</template>

<script>
import F2 from '@antv/f2'
export default {
  name: 'vueName',
  data () {
    return {
    }
  },
  mounted () {
    this.initCharts()
  },
  methods: {
    initCharts () {
      // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }
      ]

      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      })

      // Step 2: 载入数据源
      chart.source(data)

      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .interval()
        .position('genre*sold')
        .color('genre')

      // Step 4: 渲染图表
      chart.render()
    }
  }
}
</script>

<style >
</style>
