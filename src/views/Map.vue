<!--
 * @Author: yuguangzhou
 * @Date: 2021-07-08 21:39:28
 * @LastEditTime: 2021-07-09 09:23:29
 * @LastEditors: yuguangzhou
 * @Description:
-->
<template>
  <div class="box">
    <div id="container" style="width:1500px; height:900px"></div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
// import Loca from 'Loca'
import mapicon from '../assets/map.png'
let map, marker
export default {
  data () {
    return {
      markers: [
        {
          icon: mapicon,
          position: [121.506377, 31.243105],
          name: '张三'
        }, {
          icon: mapicon,
          position: [121.506077, 31.242105],
          name: '李四'

        }, {
          icon: mapicon,
          position: [121.506577, 31.240105],
          name: '王五'
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // const that = this
      map = new AMap.Map('container', {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 17,
        pitch: 80,
        rotation: -15,
        viewMode: '3D', // 开启3D视图,默认为关闭
        buildingAnimation: true, // 楼块出现是否带动画
        // expandZoomRange:true,
        zooms: [3, 20],
        mapStyle: 'amap://styles/1a00b758d4ea0e8e32624577da319712'
        // center: that.markers[0].position

      })

      this.addMarker(this.markers)
    },
    // 拖动事件
    mapDraw (arriveCoor) {
      map = new AMap.Map('container', { // map-location是嵌地图div的id
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 20, // 初始化地图层级
        center: arriveCoor // 初始化地图中心点
      })
      // 定位点
      this.addMarker(arriveCoor)
    },

    // 实例化点标记
    addMarker (arriveCoor) {
      arriveCoor.forEach(item => {
        marker = new AMap.Marker({
          icon: item.icon, // 图片ip
          imageSize: '20px',
          position: [item.position[0], item.position[1]],
          // offset: new AMap.Pixel(-13, -30),
          content: `<div class="custom-content-marker"><span style="display:block;width:200px">${item.name}</span><img src=${mapicon} onclick="clickImgMarker(${item.name})"></div>`,
          // 设置是否可以拖拽
          draggable: true,
          cursor: 'move'
          // 设置拖拽效果
          // raiseOnDrag: true
        })
        marker.setMap(map)
      })
    }

  }

}
</script>
