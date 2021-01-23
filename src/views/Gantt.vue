<template>
  <div class="Gantt">
    <el-row>
      <el-col>
        <el-date-picker
          size="small"
          v-model="chooseDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <div class="content">
      <div class="time-bar clear">
        <ul class="gui-table clear">
          <li
            :style="{width: 100/(config.endTime-config.startTime+1)+'%'}"
            v-for="(item, index) in (config.endTime-config.startTime+1)"
            :key="index"
          >
            <span><span v-if="config.startTime+index<10">0</span>{{config.startTime+index}}:00</span>
            <div class="gui-cle"></div>
            <div class="gui-lit"></div>
          </li>
        </ul>
      </div>
      <div
        class="info"
        style="margin-top: 2px;overflow:auto;"
        :style="{height:'700px'}"
      >
        <div id="gui-content">
          <div
            class="gui-content gui-list clear room-gui-list"
            v-for="room in roomList"
            :key="room.id"
          >
            <div
              id="roomName"
              class="fasten ellipsis"
              :title="room.name"
            >{{room.name}}</div>
            <ul class="gui-tab">
              <li
                v-for="(o) in (config.endTime-config.startTime+1)"
                :key="o"
                :style="{width: 100/(config.endTime-config.startTime+1)+'%',cursor:'pointer'}"
              ></li>
            </ul>
            <template v-if="room.id">
              <div
                    v-for="(item, index) in room.roomData"
                    :key="index"
                    class="meet-item-one"
                    v-bind:class="[(item.statusDesc== '进行中')?'meet-color-having':'meet-color-finished']"
                    :title="item.content"
                    :style="{left:getLeftTime(item.startTime)+'%',width:getWidth(item)+'%'}"
                    v-show="getWidth(item)!=0"
                  >
                    <p
                      class="ellipsis"
                    >{{item.content}}</p>
                  </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gantt',
  data () {
    return {
      date: '',
      chooseDate: '2021-01-14',
      config: {
        startTime: 6,
        endTime: 18
      },
      roomList: [
        {
          id: '1123',
          name: '会议室1',
          roomData: [
            {
              id: '223865',
              statusDesc: '进行中',
              startTime: '2021-01-14 8:00:00',
              endTime: '2021-01-14 10:00:00',
              content: '消防演习'
            }
          ]
        },
        {
          id: '23234',
          name: '会议室2',
          roomData: [
            {
              id: '879786',
              statusDesc: '已完成',
              startTime: '2021-01-14 14:00:00',
              endTime: '2021-01-14 16:00:00',
              content: '开会'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getLeftTime (cTime) {
      const dTime = new Date(cTime).getTime()
      // 2020-01-14 6:00:00
      const leftTime = new Date(this.chooseDate + ' ' + this.config.startTime + ':00:00').getTime()
      console.log(leftTime, 'leftTime')
      if (leftTime >= dTime) {
        return 12
        // return 0;
      } else {
        const time = (dTime - leftTime) / 1000// 秒数
        const bai = time / ((this.config.endTime - this.config.startTime + 1) * 60 * 60) * 100 * 0.88 + 12
        if (bai < 100) {
          return bai
        } else {
          return 100
        }
      }
    },
    getWidth (item) {
      const _left1 = this.getLeftTime(item.startTime)
      const _left2 = this.getLeftTime(item.endTime)
      console.log(_left1, _left2)
      return _left2 - _left1
    }
  }
}
</script>

<style scoped >
.Gantt {
  padding: 20px;
}
.content {
  padding-top: 20px;
}
.Gantt .gui-table,
.gui-tab {
  font-size: 12px;
  color: #333;
  margin: 0;
  width: 88%;
  float: right;
  white-space: nowrap;
  height: 60px;
}
.Gantt .gui-table li {
  position: relative;
  border-bottom: solid 1px #1ba5fa;
  z-index: 666;
}
.Gantt .gui-table li {
  cursor: default;
}

.Gantt .gui-table li,
.gui-tab li {
  float: left;
  text-align: left;
  width: 8.9%;
  height: 60px;
  line-height: 60px;
  /* cursor: pointer; */
}
.Gantt .gui-cle {
  position: absolute;
  left: -5px;
  bottom: -5px;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  border: solid 2px #1ba5fa;
  z-index: 666;
}
.Gantt .gui-lit {
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 3px;
  height: 3px;
  background: #fff;
  border-radius: 50%;
  border: solid 1px #1ba5fa;
  margin-left: 50%;
  z-index: 666;
}
.clear {
  *zoom: 1;
}
.clear:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.Gantt .fasten {
  width: 12%;
  float: left;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 12px;
  color: #333;
}
.Gantt .gui-table,
.gui-tab {
  font-size: 12px;
  color: #333;
  margin: 0;
  width: 88%;
  float: right;
  white-space: nowrap;
  height: 60px;
}
.Gantt .gui-list:first-child {
  background: #fff;
}
.Gantt .gui-list {
  position: relative;
}

.Gantt .room-gui-list {
  /* border-bottom: 1px solid #f5f5f5; */
}
.gui-tab li{
  border: 1px solid #f5f5f5;
}
.Gantt .meet-color-finished {
  background: #4dc394;
}

.Gantt .meet-color-having {
  background: #eb865e;
}
.Gantt .meet-item-one {
  color: #000;
  text-align: center;
  position: absolute;
  height: 58px;
  left: 12%;
  top: 1px;
  color: #fafafa;
  font: 14px/60px microsoft yahei;
  padding: 0 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  width: 20%;
}

li {
  list-style: none;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
