<!--
 * @Author: liushihao
 * @Date: 2021-08-19 15:18:31
 * @LastEditors: yuguangzhou
 * @LastEditTime: 2021-09-08 22:23:43
 * @Description: 地图
 -->
<template>
  <div class="map">
    <div class="header">
      <div class="left">
        <span class="label">在线警力</span>
        <span class="value">237</span>
      </div>
      <div class="right">
        <span class="label">预警路段</span>
        <span class="value" style="color: #FCF31E">45</span>
      </div>
    </div>
    <div class="map" id="amap">
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'Map',
  data () {
    return {
      map: null
    }
  },
  created () {
    // eslint-disable-next-line new-cap
    this.loadMap()
  },
  mounted () {

  },
  methods: {
    async loadMap () {
      const AMap = await AMapLoader.load({
        key: '51e98c643b84c5edc577835b34e520ba', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: { // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        }
        // Loca:{ // 是否加载 Loca， 缺省不加载
        //   'version': '1.3.2' // Loca 版本，缺省 1.3.2
        // }
      })
      // eslint-disable-next-line no-undef
      const roadSearch = new AMap.RoadInfoSearch({ // 构造地点查询类
        pageSize: 100,
        pageIndex: 1,
        city: '022'
      })
      // roadSearch.roadInfoSearchByRoadId('022J50F0110263228', function (status, result) {
      // })
      roadSearch.roadInfoSearchByRoadName('靖江路', function (status, result) {
        console.log(result)
      })
      this.map = new AMap.Map('amap', {
        zoom: 17,
        zooms: [12, 20],
        center: [120.130203, 30.259324],
        mapStyle: 'amap://styles/7f0abd331060a4cb4e377a661ef2771d'
      })

      // this.map.setRotation(90)
      // 添加到地图上
      const trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
      })
      // eslint-disable-next-line no-undef
      const loca = window.loca = new Loca.Container({
        map: this.map
      })
      // eslint-disable-next-line no-undef
      var scatter = new Loca.ScatterLayer({
        loca,
        opacity: 1,
        visible: true,
        zooms: [2, 22]
      })
      console.log(scatter)
      trafficLayer.setMap(this.map)

      function getAllRings (feature) {
        const coords = feature.geometry.coordinates
        const rings = []

        for (let i = 0, len = coords.length; i < len; i++) {
          rings.push(coords[i][0])
        }

        return rings
      }

      function getLongestRing (feature) {
        const rings = getAllRings(feature)

        rings.sort(function (a, b) {
          return b.length - a.length
        })

        return rings[0]
      }

      const that = this

      function initPage (DistrictExplorer) {
        // 创建一个实例
        const districtExplorer = new DistrictExplorer({
          map: that.map
        })

        const countryCode = 100000 // 全国
        const provCodes = []
        const cityCodes = [
          330106 // 丽水
        ]

        districtExplorer.loadMultiAreaNodes(
          // 只需加载全国和市，全国的节点包含省级
          [countryCode].concat(cityCodes),
          // eslint-disable-next-line handle-callback-err
          function (error, areaNodes) {
            const countryNode = areaNodes[0]
            const cityNodes = areaNodes.slice(1)

            const path = []

            // 首先放置背景区域，这里是大陆的边界
            path.push(getLongestRing(countryNode.getParentFeature()))

            for (let i = 0, len = provCodes.length; i < len; i++) {
              // 逐个放置需要镂空的省级区域
              path.push.apply(path, getAllRings(countryNode.getSubFeatureByAdcode(provCodes[i])))
            }

            for (let i = 0, len = cityNodes.length; i < len; i++) {
              // 逐个放置需要镂空的市级区域
              path.push.apply(path, getAllRings(cityNodes[i].getParentFeature()))
            }

            // 绘制带环多边形
            // https://lbs.amap.com/api/javascript-api/reference/overlay#Polygon

            // eslint-disable-next-line no-unused-vars
            const polygon = new AMap.Polygon({
              bubble: true,
              lineJoin: 'round',
              strokeColor: '#fff', // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 3, // 线宽
              fillColor: 'black', // 填充色
              fillOpacity: 0.8, // 填充透明度
              map: that.map,
              path: path
            })
          })
      }

      // eslint-disable-next-line no-undef
      AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
        initPage(DistrictExplorer)
      })

      // this.map.setLayers([new AMap.TileLayer.Satellite()])
      // this.addPolygon(AMap)
      // await this.setMarkers(AMap)
      // this.map.add(this.markers)
    }
  }
}
</script>

<style scoped lang="less">
.map {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  //background-color: cyan;
  cursor: pointer;
  pointer-events: auto;

  .header {
    width: 550px;
    height: 50px;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    z-index: 3;

    .label {
      font-size: 24px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #C7C9CE;
      line-height: 36px;
    }

    .value {
      margin-left: 20px;
      font-size: 48px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #67C4FF;
      line-height: 72px;
    }
  }
}

//.mask {
//  position: absolute;
//  z-index: 1;
//  top: 0;
//  right: 0;
//  bottom: 0;
//  left: 0;
//  pointer-events: none;
//}
</style>
