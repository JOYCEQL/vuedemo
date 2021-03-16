<template>
  <div class="relevanceFlowVue">
    <ecoLoading ref='ecoLoadingRef' text='加载中...'></ecoLoading>

    <eco-content top="0px" height="60px" type="tool">
        <el-row style="padding:12px 10px;background-color:#fff;border-bottom:1px solid #ddd;">
              <el-col :span="8" >
                  <eco-tool-title style="line-height: 34px;" :title="'流程监控'+'（'+baseInfo.total+'）'"></eco-tool-title>
              </el-col>
              <el-col :span="16" style="text-align: right;">
                  <el-select v-model="baseInfo.folder" placeholder="请选择" style="width:150px;margin-right:10px" @change="flowStateChangeFunc">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                  <el-button plain v-if="ifDeal && baseInfo.folder != '2'" class="plainBtn searchBtn btnred" @click.native="batchCancelWf" style="margin-right:15px;font-size:14px"><i class="icon el-icon-close" style="margin-right:10px;"></i>&nbsp;批量取消</el-button>
                  <el-button plain v-if="ifDeal && baseInfo.folder == '2'" class="plainBtn searchBtn btnred" @click.native="batchDeleteWf" style="margin-right:15px;font-size:14px"><i class="icon el-icon-close" style="margin-right:10px;"></i>&nbsp;批量删除</el-button>
                  <el-button plain class="plainBtn searchBtn" @click.native="searchShowFunc" style="margin-right:15px;font-size:14px"><i class="icon el-icon-search" style="margin-right:10px;"></i>&nbsp;高级检索</el-button>

             </el-col>
        </el-row>
    </eco-content>

    <eco-content top="59px" v-show="this.searchShow">
        <div class="searchBox">
            <div>
                <span>{{$t('common.type')}}：</span>
                <div class="state">
                    <el-cascader
                        v-model="baseInfo.groupTemp"
                        :options="groupsArray"
                        @change="handleGroupChange"
                        :props="{ disabled:'disabled1', label:'name',leaf:'1',value:'value',children:'child'}"
                    >
                        <template slot-scope="{ node, data }">

                            <span v-if="data.name">{{ data.name }}</span>
                            <span v-if="!node.isLeaf"> ({{ data.child.length }}) </span>
                        </template>
                    </el-cascader>
                </div>
                <span style="width:70px;text-align:left;display:inline-block;">名称：</span>
                <div class="itemInput">
                    <el-input placeholder="请输入流程名称" @keyup.enter.native="searchListFunc" v-model="baseInfo.searchMsg"></el-input>
                </div>
                  <span>部门：</span>
                <div class="itemInput">
                     <tag-select style="width: 100%;vertical-align: top;" :data="baseInfo.initDeptName" :type="'org'" :multiple=false  @callBack="tagSelectDeptCB($event,baseInfo)" :idType=0></tag-select>
                </div>
                <el-button plain class="plainBtn" style="margin-left:5px;" @click="reestSearch">清空</el-button>
                <el-button type="primary" size="small" style="margin-left:5px;height:34px;font-size:14px; " @click="searchListFunc">搜索</el-button>

            </div>
            <div>
                <span>{{$t('common.template')}}：</span>
                <div class="state">
                        <el-select v-model="baseInfo.templdateId"  filterable placeholder="请选择模板">
                            <el-option
                            v-for="item in templdateArray"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </div>
                <span>启动人员：</span>
                <div class="itemInput">
                     <tag-select style="width: 100%;vertical-align: top;" :data="baseInfo.initValueName" :type="'person'" :multiple=false  @callBack="tagSelectCB($event,baseInfo)" :idType=0></tag-select>
                </div>
                <span>启动时间：</span>
                <div style="display:inline-block;">
                    <el-date-picker placeholder="请选择" type="datetime" style="width:176px;" value-format="yyyy-MM-dd HH:mm" v-model="baseInfo.init_start_time"  format="yyyy-MM-dd HH:mm" ></el-date-picker>
                    -
                    <el-date-picker placeholder="请选择" type="datetime" style="width:176px;" value-format="yyyy-MM-dd HH:mm" v-model="baseInfo.init_end_time"  format="yyyy-MM-dd HH:mm" ></el-date-picker>
                </div>

            </div>
         </div>
    </eco-content>
    <eco-content bottom="42px" :top="getContentTop1" ref="content" style="padding:15px;">
        <el-table
          ref="multipleTable"
          :data="processTable"
          tooltip-effect="dark"
          @selection-change="changeFun"
          style="width: 100%;"
          class="flowlist"
          size="mini"
          height="100%"
          stripe
           :default-sort = "{prop: 'create_date', order: 'descending'}"
          @sort-change="sortTablefunc"

        >
           <el-table-column
            type="selection"
            :selectable="selectable"
            key="10"
            v-if="ifDeal"
            width="55">

            </el-table-column>
            <el-table-column
                prop="group_name"
                label="类别"
                width='160'
                >
                 <template slot-scope="scope">{{scope.row.group + (scope.row.sub_group? "-" + scope.row.sub_group :"")}}</template>
            </el-table-column>

            <el-table-column
                prop="request_desc"
                label="流程名称"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="pointerClass" style="display:block;" @click="goDetail(scope.row)">{{ scope.row.name}}</span>
                </template>
            </el-table-column>

             <el-table-column
                prop="status_id"
                label="状态"
                width='100'
                show-overflow-tooltip>
                 <template slot-scope="scope"><span class="circle" v-bind:class="scope.row.status == '已完成'?'green':scope.row.status == '进行中'?'blue':scope.row.status == '已取消'?'cancel':'red'"></span> {{ scope.row.status }}</template>
            </el-table-column>

            <el-table-column
                prop="delayDesc"
                label="目前环节"
                width='210'
                show-overflow-tooltip>
                 <template slot-scope="scope"><span v-html="scope.row.delayDesc"></span></template>
            </el-table-column>

            <el-table-column
                prop="create_user_id"
                label="启动人员"
                width='100'
                show-overflow-tooltip>
                 <template slot-scope="scope">{{ scope.row.createUser}}</template>
            </el-table-column>
            <el-table-column
                prop="create_date"
                label="启动时间"
                sortable='custom'
                :sort-orders="['ascending', 'descending']"
                width='150'
                show-overflow-tooltip>
                 <template slot-scope="scope">{{ scope.row.createDate}}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="210"
              >
              <template slot-scope="scope" >
                  <div v-if="scope.row.is_manager == '1'">
                    <span class="pointerClass" v-if="scope.row.status == '进行中'"  @click="showControl(scope.row.id)" style="color:#409EFF;">节点管理</span>
                    <span class="pointerClass" v-else style="width: 71px;display: inline-block;"></span>
                    <span class="split" v-if="scope.row.status == '进行中'" ></span>
                    <span class="pointerClass"  @click="showChangeStatus(scope.row.id,scope.row.status)" style="color:#409EFF;">状态变更</span>
                    <span class="split" v-if="scope.row.status == '进行中' || scope.row.status == '已取消'" ></span>
                    <span class="pointerClass"  v-if="scope.row.status == '进行中'" @click="cancelItem(scope.row.id)" style="color:#F56C6C;">取消</span>
                    <span class="pointerClass"  v-if="scope.row.status == '已取消'" @click="deleteItem(scope.row.id)" style="color:#F56C6C;">删除</span>
                 </div>
              </template>
            </el-table-column>
        </el-table>

    </eco-content>

    <eco-content  bottom="0px" type="tool" style="padding:5px 0px">
        <el-row >
          <el-col :span="24" style="text-align:right">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="baseInfo.page"
                  :page-sizes="[10,30,50,100]"
                  :page-size="baseInfo.rows"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="baseInfo.total" style="margin-right:20px">
                </el-pagination>
          </el-col>
      </el-row>
    </eco-content>

  </div>
</template>
<script>

import { getWFControlListAjax, getWFViewOperateId, getWFGroupsAjax, getWFTemplatesAjax, changeWfStatus, batchCancelWf, deleteWorkFlow, batchDeleteWf } from '@/flowform/service/service.js'
import { rows, sysEnv, wfViewStyle } from '@/flowform/config/env.js'
import { Loading } from 'element-ui'
import { mapState, mapMutations } from 'vuex'
import ecoContent from '@/components/pageAb/ecoContent.vue'
import ecoButton from '@/components/button/ecoButton.vue'
import ecoToolTitle from '@/components/tool/ecoToolTitle.vue'
import ecoLoading from '@/components/loading/ecoLoading.vue'
import { EcoMessageBox } from '@/components/messageBox/main.js'
import { EcoUserPick } from '@/components/userPick/main.js'
import { EcoUtil } from '@/components/util/main.js'
import tagSelect from '@/flowform/views/direction/module/tagSelect.vue'
export default {
  components: {
    ecoContent,
    ecoButton,
    ecoToolTitle,
    ecoLoading,
    tagSelect
  },
  data () {
    return {
      options: [{
        value: '-1',
        label: this.$t('statusOptions.all')
      }, {
        value: '0',
        label: this.$t('statusOptions.doing')
      }, {
        value: '1',
        label: this.$t('statusOptions.finished')
      }, {
        value: '2',
        label: this.$t('statusOptions.cancel')
      }],
      processTable: [],
      groupsArray: [],
      templdateArray: [],
      multipleSelection: [],
      baseInfo: {
        folder: '-1', // -1 全部 0 进行中 1 已完成/被拒绝 2 已取消
        page: 1,
        rows: 30,
        total: 0,
        groupId: '-1',
        groupTemp: '-1',
        templdateId: '-1',
        searchMsg: '',
        sort: '',
        order: '',
        init_start_time: '',
        init_end_time: '',
        initValue: '',
        initValueName: '',
        initDeptValue: '',
        initDeptName: ''
      },
      searchShow: false,
      ifDeal: true
    }
  },
  computed: {
    ...mapState([
      'wfFullScreen'
    ]),

    getContentTop1: function () {
      if (this.searchShow) {
        return '161px'
      } else {
        return '59px'
      }
    }
  },
  created () {

  },
  mounted () {
    this.getWFGroupsFunc()
    this.getWFTemplatesFunc()
    this.getWfMyProcessFunc()
    this.listAction()
    window.ecoTodoVm = this
  },

  methods: {

    listAction () {
      window.tabClickFunc = function () {
        window.ecoTodoVm.getWfMyProcessFunc()
      }
      const this_ = this
      const callBackDialogFunc = function (obj) {
        if (obj && (obj.action == 'changeWfStatus' || obj.action == 'flowControl')) {
          this_.$message({
            message: '状态变更成功',
            showClose: true,
            duration: 2000,
            customClass: 'design-from-el-message',
            type: 'success'
          })
          window.ecoTodoVm.getWfMyProcessFunc(true)
        }
        if (obj && obj.action == 'flowStartQuanXian') {
          this_.$message({
            message: '权限设置成功！',
            showClose: true,
            duration: 2000,
            customClass: 'design-from-el-message',
            type: 'success'
          })
        }
      }
      EcoUtil.addCallBackDialogFunc(callBackDialogFunc, 'wfToControl')
    },

    // 保存选择事件
    saveChoiceFlowFunc () {
      // console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        EcoMessageBox.alert('请选择要操作的数据', '提示')
        return false
      }
      // window.returnValue = this.multipleSelection;
      const doObj = {}
      doObj.action = 'saveMyWorkflowCKAction'
      doObj.data = this.multipleSelection
      doObj.close = true
      parent.window.sysvm.callBackDialogFunc(doObj)
    },

    // 流程状态切换
    flowStateChangeFunc (e) {
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      this.getWfMyProcessFunc()
    },

    // 获取我发起的流程列表
    getWfMyProcessFunc (flag) {
      this.$refs.ecoLoadingRef.open()
      getWFControlListAjax(this.baseInfo).then((response) => {
        this.processTable = response.data.info
        this.baseInfo.total = response.data.total
        if (this.processTable.every(item => item.is_manager == 0)) {
          this.ifDeal = false
        } else {
          this.ifDeal = true
        }
        this.$refs.ecoLoadingRef.close()
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          if (!flag) {
            this.$refs.multipleTable.doLayout()
          }
        })
      }).catch((error) => {
        this.$refs.ecoLoadingRef.close()
      })
    },

    // 获取流程类别
    getWFGroupsFunc () {
      getWFGroupsAjax().then((response) => {
        this.groupsArray = response.data.info
      }).catch((error) => {

      })
    },

    // 获取流程模板
    getWFTemplatesFunc () {
      getWFTemplatesAjax(this.baseInfo.groupId).then((response) => {
        this.templdateArray = response.data.info
      }).catch((error) => {

      })
    },

    groupsStateChangeFunc (e) {
      this.getWFTemplatesFunc()
    },

    searchShowFunc () {
      if (this.searchShow) {
        this.searchShow = false
      } else {
        this.searchShow = true
      }
    },

    searchListFunc () {
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      this.baseInfo.page = 1
      this.getWfMyProcessFunc()
    },

    changeFun (rows) {
      this.multipleSelection = rows
    },

    // 表格排序
    sortTablefunc (column, prop, order) {
      if (column.prop && column.order) {
        this.baseInfo.sort = column.prop
        if (column.order == 'ascending') {
          this.baseInfo.order = 'asc'
        } else if (column.order == 'descending') {
          this.baseInfo.order = 'desc'
        }
      }
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      this.getWfMyProcessFunc()
    },

    // 每页条数
    handleSizeChange (val) {
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      this.baseInfo.rows = val
      this.baseInfo.page = 1
      this.getWfMyProcessFunc()
    },

    // 跳转页码
    handleCurrentChange (val) {
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      this.baseInfo.page = val
      this.getWfMyProcessFunc()
    },

    goDetail (item) {
      const wfId = item.id
      const formView = 2
      getWFViewOperateId(wfId, formView).then((response) => {
        if (response.data.status == 0) {
          const operateId = response.data.operate_id
          if (sysEnv == 1) {
            const tabObj = {}
            const goPage = '/wh/jsp/version3/flowform/index.html@/' + wfViewStyle + '/' + wfId + '/' + operateId
            tabObj.desc = item.name
            tabObj.r_func = "{menuTarget:'IFRAME',tabKey:'wfViewDetail" + wfId + "',doNothing:'N',cmd:'v3.goPage',goPage:'" + goPage + "',fullScreen:" + this.wfFullScreen + '}'
            window.parent.window.sysvm.doTab(tabObj)
          } else {
            this.$router.push({ name: wfViewStyle, params: { wfId: wfId, operateId: operateId } })
          }
        } else {
          EcoMessageBox.alert(response.data.msg)
        }
      })
    },
    reestSearch () {
      this.baseInfo.groupId = '-1'
      this.baseInfo.templdateId = '-1'
      this.baseInfo.searchMsg = ''
      this.baseInfo.init_start_time = ''
      this.baseInfo.init_end_time = ''
      this.baseInfo.initValue = ''
    },
    tagSelectCB () {
      arguments[1].initValue = arguments[0].id
    },
    tagSelectDeptCB () {
      arguments[1].initDeptValue = arguments[0].id
    },
    handleGroupChange (value) {
      this.baseInfo.groupId = value.join(',')
      this.baseInfo.templdateId = '-1'
      this.getWFTemplatesFunc()
    },
    showControl (id) {
      if (sysEnv == 1) {
        const _width = '650'
        const _height = '480'
        const url = '/wh/jsp/version3/flowform/index.html#/flowControl/' + id
        EcoUtil.getSysvm().openDialog('节点管理', url, _width, _height, '15vh')
      } else {
        this.$router.push({ name: 'flowControl', params: { wfId: id } })
      }
    },
    showChangeStatus (wf_id, folder) {
      if (sysEnv == 1) {
        const _width = '500'
        const _height = '320'
        const url = encodeURI('/wh/jsp/version3/flowform/index.html#/changeWfStatus/' + wf_id + '/' + folder)
        EcoUtil.getSysvm().openDialog('流程状态变更', url, _width, _height, '15vh')
      } else {
        this.$router.push({ name: 'changeWfStatus', params: { wfId: wf_id, folder: folder } })
      }
    },
    showChangeTaskLevel () {

    },
    cancelItem (wfId) {
      var that = this
      const confirmYesFunc = function () {
        const data = {
          wf_id: wfId,
          target_status_flag: 'to_canceled'
        }
        changeWfStatus(data).then((response) => {
          if (response.data.status < 100) {
            that.$message({
              message: '状态变更成功',
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'success'
            })
            that.getWfMyProcessFunc()
          } else {
            that.$message({
              message: response.data.msg,
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'warning'
            })
          }
        })
      }
      const options = {
        type: 'warning',
        lockScroll: false
      }
      EcoMessageBox.confirm('确定要取消该流程吗?', '提示', options, confirmYesFunc)
    },
    batchCancelWf () {
      if (this.multipleSelection.length == 0) {
        EcoMessageBox.alert('请选择记录')
        return
      }

      var that = this
      const confirmYesFunc = function () {
        const wf_id_array = []
        for (let i = 0; i < that.multipleSelection.length; i++) {
          wf_id_array.push(that.multipleSelection[i].id)
        }

        const data = {
          wf_id_str: wf_id_array.join('|')
        }
        batchCancelWf(data).then((response) => {
          if (response.data.status < 100) {
            that.$message({
              message: '状态变更成功',
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'success'
            })

            that.getWfMyProcessFunc()
          } else {
            that.$message({
              message: response.data.msg,
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'warning'
            })
          }
        })
      }
      const options = {
        type: 'warning',
        lockScroll: false
      }
      EcoMessageBox.confirm('确定要取消这些流程吗？?', '提示', options, confirmYesFunc)
    },
    selectable (row, index) {
      if (row.is_manager == 0) {
        return false
      }
      return true
    },
    batchDeleteWf () {
      if (this.multipleSelection.length == 0) {
        EcoMessageBox.alert('请选择记录')
        return
      }

      var that = this
      const confirmYesFunc = function () {
        const wf_id_array = []
        for (let i = 0; i < that.multipleSelection.length; i++) {
          wf_id_array.push(that.multipleSelection[i].id)
        }

        const data = {
          wf_ids: wf_id_array.join(',')
        }
        batchDeleteWf(data).then((response) => {
          if (response.data.status < 100) {
            that.$message({
              message: '删除成功',
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'success'
            })

            that.getWfMyProcessFunc()
          } else {
            that.$message({
              message: response.data.msg,
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'warning'
            })
          }
        })
      }
      const options = {
        type: 'warning',
        lockScroll: false
      }
      EcoMessageBox.confirm('确定要删除这些流程吗？?', '提示', options, confirmYesFunc)
    },
    deleteItem (wfId) {
      var that = this
      const confirmYesFunc = function () {
        const data = {
          wf_id: wfId
        }
        deleteWorkFlow(data).then((response) => {
          if (response.data.status < 100) {
            that.$message({
              message: '删除成功',
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'success'
            })
            that.getWfMyProcessFunc()
          } else {
            that.$message({
              message: response.data.msg,
              showClose: true,
              duration: 2000,
              customClass: 'design-from-el-message',
              type: 'warning'
            })
          }
        })
      }
      const options = {
        type: 'warning',
        lockScroll: false
      }
      EcoMessageBox.confirm('确定要删除该流程吗?', '提示', options, confirmYesFunc)
    }
  },
  watch: {

  },
  filters: {

  }

}
</script>

<style scope>

.relevanceFlowVue{
    position: relative;
    height: 96%;
    margin: 0 24px;
    top: 2%;
    overflow-y: hidden;
    min-width: 1131px;
    border: 1px solid #ddd;
}
.relevanceFlowVue .plainBtn{
    border-color: #409EFF;
    color: #409EFF;
    font-size:14px;
}

.custom-45a86f .relevanceFlowVue .plainBtn{
    border-color: #45a86f;
    color: #45a86f;
}

.relevanceFlowVue .plainBtn.btnred{
    color: #f56c6c;
    border-color: #f56c6c;
}
.relevanceFlowVue .plainBtn.btnred:hover{
    color: #f56c6c;
    border-color: #f56c6c;
}
.relevanceFlowVue .searchBtn{
    float:right;
    margin-right: 15px;
    min-width:105px;
    width:45%;
     max-width:140px;
}
  .relevanceFlowVue .state{
      display: inline-block;
      width: 160px;
      margin-right: 10px;
  }
  .relevanceFlowVue .templateInput{
      display: inline-block;
      width: 300px;
  }
  .relevanceFlowVue .templateInput div{
      display: inline-block;
      width: 376px;
  }
  .relevanceFlowVue .itemInput{
      display: inline-block;
      width: 180px;
      margin-right: 10px;
  }
  .relevanceFlowVue .searchBox{
      font-size: 14px;
      padding: 0px 20px;
      line-height: 50px;
      background-color: #f5f5f5 ;
      border-bottom: 1px solid #ddd;
      height:101px;
      overflow-y:auto;
  }
  .split{
    border-right: 1px solid #ddd;
    margin: 0 10px 0 5px;
    }
  .circle{
        width: 6px;
        height: 6px;
        position: relative;
        top: -2px;
        border-radius: 50%;
        display: inline-block;
        margin-right:2px;
  }
    .blue{
      background-color:#409EFF;
  }
  .red{
      background-color:#F56C6C;
  }
  .green{
       background-color:#67C23A;
  }
  .cancel{
      background-color:#909399;
  }
  .delayDesc{
        text-overflow: ellipsis;
        overflow: hidden;
  }
</style>
