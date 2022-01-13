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
        <el-button style="float:right" type="primary" size="small" @click="insert">新增</el-button>
      </el-col>
    </el-row>
    <div class="content">
      <div class="time-bar clear">
        <div class="gui-table clear">
          <li
            :style="{width: 100/(config.endTime-config.startTime+1)+'%'}"
            v-for="(item, index) in (config.endTime-config.startTime+1)"
            :key="index"
          >
            <span><span v-if="config.startTime+index<10">0</span>{{config.startTime+index}}:00</span>
            <div class="gui-cle"></div>
            <div class="gui-lit"></div>
          </li>
        </div>
      </div>
      <div
        class="info"
        style="margin-top: 2px;overflow:auto;"
        :style="{height:'auto'}"
      >
        <div id="gui-content">
          <div
            class="gui-content gui-list clear room-gui-list"
            v-for="room in roomList"
            :key="room.roomId"
          >
            <div
              id="roomName"
              class="fasten ellipsis"
              :title="room.name"
            >{{room.name}}</div>
          <div class="gui-tab">
              <li
                v-for="(o) in (config.endTime-config.startTime+1)"
                :key="o"
                :style="{width: 100/(config.endTime-config.startTime+1)+'%',cursor:'pointer'}"
              ></li>
          </div>
            <template v-if="room.roomId">
              <div
                    v-for="(item, index) in room.roomData"
                    :key="index"
                    class="meet-item-one"
                    v-bind:class="[!item.status?'meet-color-having':'meet-color-finished']"
                    :title="item.content"
                    :style="{left:getLeftTime(item.startTime)+'%',width:getWidth(item)+'%'}"
                    v-show="getWidth(item)!=0"
                    @click="edit(item)"
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
  <el-dialog title="新增安排" :visible.sync="dialogFormVisible" width="600px">
  <el-form :model="form">
    <el-form-item label="会议室" :label-width="formLabelWidth">
      <el-select v-model="form.roomId" placeholder="请选择会议室" style="width:400px">
        <el-option label="一号会议室" value="1123"></el-option>
        <el-option label="二号会议室" value="23234"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="会议时间" :label-width="formLabelWidth">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width:400px"
          v-model="meetTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="会议状态" :label-width="formLabelWidth">
      <el-select v-model="form.status" placeholder="请选择活动区域" style="width:400px">
        <el-option label="进行中" :value="0"></el-option>
        <el-option label="已完成" :value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="内容" :label-width="formLabelWidth">
      <el-input v-model="form.content" style="width:400px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Gantt',
  data () {
    return {
      date: '',
      chooseDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      config: {
        startTime: 6,
        endTime: 18
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      meetTime: [],
      form: {
        id: new Date().getTime(),
        roomId: '',
        content: '',
        status: 0,
        startTime: '',
        endTime: ''
      },
      roomList: [
        {
          roomId: '1123',
          name: '一号会议室',
          roomData: [
            {
              roomId: '1123',
              id: '223865',
              status: 0,
              startTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 8:10:00`,
              endTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 10:00:00`,
              content: '商量产品选型'
            }
          ]
        },
        {
          roomId: '23234',
          name: '二号会议室',
          roomData: [
            {
              roomId: '23234',
              id: '879786',
              status: 1,
              startTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 14:00:00`,
              endTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 16:00:00`,
              content: '方案修改计划'
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
        const leftPercent = time / ((this.config.endTime - this.config.startTime + 1) * 60 * 60) * 100 * 0.88 + 12
        // eslint-disable-next-line no-debugger
        if (leftPercent < 100) {
          return leftPercent
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
    },
    insert () {
      this.meetTime = []
      this.form = this.$options.data().form
      this.dialogFormVisible = true
    },
    edit (item) {
      this.dialogFormVisible = true
      this.form = { ...item }
      this.meetTime = [item.startTime, item.endTime]
    },
    submit () {
      this.form.startTime = this.meetTime[0]
      this.form.endTime = this.meetTime[1]
      // 添加到roomList中
      this.roomList.forEach(item => {
        if (item.roomId === this.form.roomId) {
          item.roomData.push(this.form)
        }
      })

      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped >
.Gantt {
  padding: 20px;
  border-radius: 3px;
  border: 1px solid red;
  height:100%;
  box-sizing: border-box;
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
