<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"
    >
    </el-cascader>
    <el-select v-model="value">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div
      id="ECharts"
      style="width:200px;height:300px"
    >

    </div>
  </div>
</template>

<script>
import { regionDataPlus, CodeToText } from 'element-china-area-data'

export default {
  data () {
    return {
      options: regionDataPlus,
      selectedOptions: [],
      options1: [
        {
          label: '有效',
          value: true
        },
        {
          label: '无效',
          value: false
        }
      ],
      value: true
    }
  },
  mounted () {
    var myChart = this.$echarts.init(document.getElementById('ECharts'))
    var option = {
      legend: {
        show: true,
        data: ['数值', 'X', 'Y', 'Z']
      },
      dataset: {
        dimensions: [
          'updateTime',
          'value',
          'valueX',
          'valueY',
          'valueZ'
        ]
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1]
        },
        {
          type: 'inside',
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1]
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff'
          }

        }
      },

      series: [{
        name: '数值',
        type: 'line',

        encode: {
          x: 'updateTime',
          y: 'value'
        },
        symbol: 'none'

      }, {
        name: 'X',
        type: 'line',

        encode: {
          x: 'updateTime',
          y: 'valueX'
        },
        symbol: 'none'
      }, {
        name: 'Y',
        type: 'line',

        encode: {
          x: 'updateTime',
          y: 'valueY'
        },
        symbol: 'none'
      }, {
        name: 'Z',
        type: 'line',

        encode: {
          x: 'updateTime',
          y: 'valueZ'
        },
        symbol: 'none'
      }]
    }
    myChart.setOption(option)
  },
  methods: {
    handleChange (value) {
      let str = ''
      value.forEach(item => {
        str += CodeToText[item]
      })
      console.log(str)
    }
  }
}
</script>
