<template>
  <div class="wfStart">
      <div class="m-header clearfix header">
            <!-- <span class="m-header-tip themeB"></span> -->
                <!-- <span class="m-title">全部流程</span>
                <span class="m-title" class="collect">我的收藏</span> -->
                <el-tabs v-model="activeType" @tab-click="handleTypeClick" style="float:left;height:30px" >
                <el-tab-pane label="全部流程" name="all"></el-tab-pane>
                <el-tab-pane label="我的收藏" name="my" ></el-tab-pane>
              </el-tabs>
              <div style="float:right">
              <el-autocomplete
                popper-class="wfstart-autocomplete"
                v-model="srchTxt"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                style="width: 250px;vertical-align: middle;margin-left:20px;"
                @select="itemClick"
                size="mini"
            >

                <template slot-scope="{ item }">
                    <div  class="wfStartSearchName" :title="item.name ">{{ item.name }}</div>
                    <span class="wfStartSearchDesc"><i>{{ groupMap[String(item.group)] }}</i><i v-if="item.subGroup!=0">-{{groupMap[String(item.subGroup)]}}</i></span>
                </template>
            </el-autocomplete>
            <!-- <el-input style="width: 200px;vertical-align: middle;margin-left:20px;" v-model="srchTxt" size="mini" @keyup.enter.native="search"></el-input> -->
            <div class="h-button themeB"  @click="search"><i class="icon el-icon-search"></i>搜索</div>
              </div>
      </div>

      <div style="padding:20px;">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="8" :md="8" v-for="(item,index) in itemList" :style="{clear:index%3==0?'left':'none'}" :key="'g'+item.groupId" >
                <div class="flow-card">
                <div class="title">{{item.groupName}}</div>
                <el-collapse v-model="openCollapseItems">
                    <el-collapse-item v-for="(fgroup,index) in item.childGroup" :style="{maxHeight:fgroup.child.length*26+32+'px'}" :key="'g'+item.groupId+index" :title="fgroup.name" :name="(item.groupId+'-'+fgroup.subGroupId)">
                          <div class="flow-item" v-for="fitem1 in fgroup.child" :key="fitem1.wfTempId">
                                <div class="flow-wrap ellipsis" @click.stop="itemClick(fitem1)" :id="'f'+fitem1.wfTempId" :style="{backgroundColor:choosedItems.indexOf(fitem1.wfTempId)>-1?'#cce8d3':'inherit'}" :title="fitem1.name">{{fitem1.code?fitem1.code+'.':''}}
                                  <i v-if="!fitem1.collected" style="fontSize:14px;marginRight:6px" class="iconfont iconshoucang " @click.stop="handleCollect(fitem1)"></i>
                                  <i v-else style="fontSize:16px;marginRight:6px;color:orange" class="iconfont iconshoucangdianjihou1 " @click.stop="handleCollect(fitem1)"></i>
                                  {{fitem1.name}}</div>
                          </div>
                    </el-collapse-item>
                    <div class="flow-item"  v-for="(fitem2,idx) in item.childItem" v-if="idx < moreLength" :key="fitem2.wfTempId">
                          <div class="flow-wrap ellipsis" @click.stop="itemClick(fitem2)" :id="'f'+fitem2.wfTempId" :style="{backgroundColor:choosedItems.indexOf(fitem2.wfTempId)>-1?'#cce8d3':'inherit'}" :title="fitem2.name">{{fitem2.code?fitem2.code+'.':''}}   <i v-if="!fitem2.collected" style="fontSize:16px;marginRight:6px" class="iconfont iconshoucang " @click.stop="handleCollect(fitem2)"></i>
                        <i v-else style="fontSize:16px;marginRight:6px;color:orange" class="iconfont iconshoucangdianjihou1 " @click.stop="handleCollect(fitem2)"></i>
                        {{fitem2.name}}</div>
                    </div>

                    <el-collapse-transition>
                        <div v-show="groupShowObj[String(item.groupId)]">
                            <div class="flow-item" v-for="(fitem2,idx) in item.childItem" v-if="idx >= moreLength" :key="fitem2.wfTempId">
                                  <div class="flow-wrap ellipsis" @click="itemClick(fitem2)" :id="'f'+fitem2.wfTempId" :style="{backgroundColor:choosedItems.indexOf(fitem2.wfTempId)>-1?'#cce8d3':'inherit'}" :title="fitem2.name">{{fitem2.code?fitem2.code+'.':''}}
                                  <i v-if="!fitem2.collected" style="fontSize:16px;marginRight:6px" class="iconfont iconshoucang " @click.stop="handleCollect(fitem2)"></i>
                              <i v-else style="fontSize:16px;marginRight:6px;color:orange" class="iconfont iconshoucangdianjihou1 " @click.stop="handleCollect(fitem2)"></i>
                    {{fitem2.name}}</div>
                            </div>
                        </div>
                    </el-collapse-transition>

                    <div class="flow-item-more" v-if=" item.childItem.length > moreLength" @click="toggleGroupFlowItem(item.groupId)" >
                        <span class="pointerCalss" v-show="!groupShowObj[String(item.groupId)]">更多&nbsp;</span>
                        <span class="pointerCalss" v-show="groupShowObj[String(item.groupId)]">收缩&nbsp;</span>
                    </div>

                </el-collapse>
            </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import {getWFStartInfo,initWFAjax,flowStartCollectAjax} from'@/flowform/service/service'
import {sysEnv,wfStyle} from '@/flowform/config/env.js'
import {EcoUtil} from '@/components/util/main.js'
import { Loading } from 'element-ui';
import {mapState,mapMutations} from 'vuex'
export default{
  name:'start',
  data(){
    return {
        isMultiWs:false,
        itemList:[],
        fitems:[],
        srchTxt:"",
        choosedItems:[],
        openCollapseItems:[],
        moreLength:5,
        groupShowObj:{},
        groupMap:{},
        activeType:'all',
        collectFlag:''
    }
  },
  created(){

  },
  mounted(){
        this.listAction();
        window.ecoVm = this;
        this.getWFStartInfo(this.collectFlag);
  },
  computed:{
      ...mapState([
            'wfFullScreen',
        ]),
  },
  methods: {

    //监听dialog 回写事件
    listAction(){
          let callBackDialogFunc = function(obj){
              if(obj && obj.action == 'initWorkflow'){
                  window.ecoVm.initWorkflowCallBack(obj);
              }
          }
          EcoUtil.addCallBackDialogFunc(callBackDialogFunc);
    },

    search(){
        if (this.srchTxt==''){
              this.$message({
                  // message: this.$t('msg.srchTxtNotNull'),
                  message:"搜索内容不为空",
                  type: 'error'
              });
              return false;
        }

      let that = this;
      let choosedItems = this.fitems.filter(item=>{
          if (item.name.indexOf(that.srchTxt)>-1){
              that.openCollapseItems.indexOf(item.group+'-'+item.subGroup)>-1?null:
              that.openCollapseItems.push(item.group+'-'+item.subGroup);
              that.groupShowObj[String(item.group)] = true;
              return true;
          }else{
              return false;
          }
      }).map(item=>item.wfTempId);

        this.choosedItems = choosedItems;
        this.$nextTick(()=>{
          if (choosedItems.length==0){
              this.$message({
                  // message: this.$t('msg.srchResultNone'),
                  message:"没有搜索到任何流程",
                  type: 'error'
              });
          }else{
              let firstId = choosedItems[0];
              let firstElem = document.getElementById('f'+firstId);
              if (firstElem.offsetTop > window.innerHeight){
                  setTimeout(function(){
                     window.scrollTo(0,firstElem.offsetTop - window.innerHeight/2)
                  },300)
              }
          }
        });
      },

    /*获取初始化数据*/
    getWFStartInfo(collectFlag){
          getWFStartInfo(collectFlag).then((res)=>{
              if(res.data.success){
                    this.isMultiWs = res.data.queryObj.isMultiWs;
                    let _infoArray = res.data.queryObj.info;
                    let _itemList = [];
                    for(let i = 0;i<_infoArray.length;i++){
                        this.groupMap[String(_infoArray[i].groupId)] = _infoArray[i].groupName;

                        let _oneItem = {};
                        _oneItem.groupId = _infoArray[i].groupId;
                        _oneItem.groupName = _infoArray[i].groupName;

                        let _oneChildGroupArray = [];
                        let _oneChildItemArray = [];
                        if(_infoArray[i].child){
                            for(let j = 0;j<_infoArray[i].child.length;j++){
                                if(_infoArray[i].child[j].child){
                                    _oneChildGroupArray.push(_infoArray[i].child[j]);
                                    this.groupMap[String(_infoArray[i].child[j].subGroupId)] = _infoArray[i].child[j].name;
                                }else{
                                    _oneChildItemArray.push(_infoArray[i].child[j]);
                                }
                            }
                        }

                        _oneItem.childGroup = _oneChildGroupArray;
                        _oneItem.childItem = _oneChildItemArray;

                        _itemList.push(_oneItem);
                    }

                    this.itemList = _itemList;
                    res.data.queryObj.info.map(item=>{
                          return item.child.map(item=>{
                              if (item.child) {
                                  this.fitems = this.fitems.concat(item.child);
                              }else{
                                  this.fitems.push(item)
                              }
                          })
                    })

              }
          }).catch((error)=>{});
    },

    itemClick(fitem){
        let loadingInstance = Loading.service({ fullscreen: true,text:"启动中...."});
        initWFAjax(fitem.wfTempId).then((response)=>{
              this.$nextTick(() => {
                loadingInstance.close();
              })
              if(response.data.status == 0){
                  if(sysEnv ==1){
                      let tabObj = {};
                      let goPage = null;
                      if(fitem.defFieldId && fitem.defFieldId.startsWith('RSF-S2')){
                          goPage = '/wh/jsp/version3/flowform/index.html@/wfDetailStyle2/'+response.data.remap.task_id+'/'+response.data.operate_id;
                      }else{
                          goPage = '/wh/jsp/version3/flowform/index.html@/'+wfStyle+'/'+response.data.remap.task_id+'/'+response.data.operate_id;
                      }
                      tabObj.r_func = "{menuTarget:'IFRAME',tabKey:'wftask_info_"+response.data.operate_id+"',doNothing:'N',cmd:'v3.goPage',goPage:'"+goPage+"',fullScreen:"+this.wfFullScreen+"}";
                      tabObj.desc = fitem.name;
                      window.parent.window.sysvm.doTab(tabObj);
                  }else{
                       if(fitem.defFieldId && fitem.defFieldId.startsWith('RSF-S2')){
                            this.$router.push({name:'wfDetailStyle2',params:{taskId:response.data.remap.task_id,operateId:response.data.operate_id}});
                       }else{
                           this.$router.push({name:wfStyle,params:{taskId:response.data.remap.task_id,operateId:response.data.operate_id}});
                       }
                  }
              }
        })

        return;
        if(this.isMultiWs){
            window.parent.window.sysvm.openDialog(fitem.name,'/wh/jsp/component/workflow/newworkflowinstance.jsp?map_id='+fitem.id
            +'&req_name='+encodeURIComponent(fitem.name)
            +'&req_desc='+encodeURIComponent(fitem.comments)
            +'&priority='+fitem.priority,600,260);
        }else{
            let tabObj = {};
            tabObj.name = fitem.name;
            let goPage = '/jsp/version3/wf/wfStartWf.jsp?map_id='+fitem.id
            +'&req_name='+encodeURIComponent(fitem.name)
            +'&req_desc='+encodeURIComponent(fitem.comments)
            +'&priority='+fitem.priority;
            tabObj.tabKey = "wftask_info_"+fitem.id;
            tabObj.r_func = "{menuTarget:'IFRAME',tabKey:'wftask_info_"+fitem.id+"',doNothing:'Y',nextPage:'"+goPage+"'}";
            window.parent.window.sysvm.doTab(tabObj);
        }
    },
    handleCollect(item){
      flowStartCollectAjax(item.wfTempId).then(res=>{
          if(res.data.success){
             item.collected=res.data.queryObj
            //  this.$forceUpdate()
          }
      })
    },
    initWorkflowCallBack(obj){
        let tabObj = {};
        tabObj.name = obj.data.name;
        let goPage = '/jsp/version3/wf/wfAdapter.jsp?id='+obj.data.id;
        tabObj.r_func = "{menuTarget:'IFRAME',tabKey:'wftask_info_"+obj.data.mapId+"',doNothing:'Y',nextPage:'"+goPage+"'}";
        window.parent.window.sysvm.doTab(tabObj);
    },

    toggleGroupFlowItem(groupId){
        this.$set(this.groupShowObj,String(groupId),!this.groupShowObj[String(groupId)]);
    },

    querySearch(queryString, cb){

        let that = this;
        let choosedItems = this.fitems.filter(item=>{
            if (item.name.indexOf(that.srchTxt)>-1){
                that.openCollapseItems.indexOf(item.group+'-'+item.subGroup)>-1?null:
                that.openCollapseItems.push(item.group+'-'+item.subGroup);
                that.groupShowObj[String(item.group)] = true;
                return true;
            }else{
                return false;
            }
        });

        cb(choosedItems);
    },
    handleTypeClick(val){
      if(val.name=='my'){
         this.collectFlag=true
         this.getWFStartInfo(this.collectFlag);
      }else{
          this.collectFlag=''
         this.getWFStartInfo(this.collectFlag);
      }
    }
  },
  watch: {

  }
}
</script>

<style>

.wfstart-autocomplete.el-autocomplete-suggestion li{
    line-height: normal;
    padding: 7px;
    font-size:12px;
}


 .wfstart-autocomplete.el-autocomplete-suggestion .wfStartSearchName {
    text-overflow: ellipsis;
    overflow: hidden;
}

.wfstart-autocomplete.el-autocomplete-suggestion .wfStartSearchDesc {
    font-size: 12px;
     color: #b4b4b4;
}

.wfstart-autocomplete.el-autocomplete-suggestion .highlighted .wfStartSearchDesc {
      color: #ddd;
}
</style>

<style scoped>



.flow-card{
  margin-bottom: 20px;
}
.flow-card>.title{
  position: relative;
  height: 34px;
  line-height: 34px;
  color: #fff;
  padding-left: 12px;
  font-size: 14px;
}
.flow-card>.title::before{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 34px;
  width: 2px;
  background-color: #fff9;
}
@media screen and (min-width: 768px){
  .flow-card{
    min-height: 250px;
  }
}

.wfStart .flow-item{
    color:#444;
}

.wfStart .flow-item-more{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 26px;
    line-height: 22px;
    border: none;
    margin-bottom: 1px;
    padding: 2px 18px;
    color: #999;
    background: #f6f6f6;
    font-size: 12px;
    text-align:center;
}

.wfStart .flow-item-more i{
  font-size: 12px;
}

.wfStart .h-button{
    background-color:#43a4e0;
}



.custom-d70835 .wfStart .h-button{
    background-color: #e76f6f;
}

.custom-45a86f .wfStart .h-button{
    background-color: #45a86f;
}
.wfStart .el-tabs /deep/ .el-tabs__nav-wrap::after{
    display: none;
}
.wfStart .el-tabs /deep/  .el-tabs__item.is-active{
    color:#43a4e0;
  }
.wfStart .el-tabs /deep/  .el-tabs__active-bar{
    background-color:#43a4e0;
}
.wfStart .el-tabs /deep/  .el-tabs__item{
    font-size: 16px;
  }
.header{
    padding: 10px 0 6px 20px;
    line-height: 38px;
    font-size: 0;
    background-color: #f8f9fb;
}
.wfStart  .el-autocomplete /deep/ .el-input{
    vertical-align: middle;
}

