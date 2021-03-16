import axios from 'axios'
import {baseUrl,baseMainServerUrl} from '../config/env'
import qs from 'qs';
import { Message } from 'element-ui';
import {FlowFormUtil} from '../config/util'


//全局设置超时时间 120s
axios.defaults.timeout = 120000;

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {

    if(!response.data){
      Message({
        message: "网络错误",
        type: 'error',
        showClose: true,
        duration:2000,
        customClass:'design-from-el-message'
      });
    }
    if(( response.data.status && (response.data.status >= 100 && response.data.status != 301 && response.data.status != 400)) || (response.data.hasOwnProperty("success") && response.data.success == false)){
        Message({
          message: response.data.msg || response.data.msgDesc,
          type: 'warning',
          showClose: true,
          duration:2000,
          customClass:'design-from-el-message'
        });
    }

    return response;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未授权，请登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }
  return Promise.reject(err);
})

/*申请创建流程模板*/
export const getI18NJS = function(){
    return axios.get('/wh/jsp/version3/flowform/i18n.json',{
          params:{
              time: new Date().getTime(),
          }
      })
}




// 获取流程模板列表
export const getWFModelListAjax = function(data){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.model.workflow',
          _method:'read',
          action: "list_wf_model",
          valid_flag:data.validFlag,
          page:data.page,
          page_size:data.pageSize,
          sort_col:data.sortCol,
          sch_name:data.schName,
          group_id:data.groupId,
          time: new Date().getTime(),
      }
  })
}

/*申请创建流程模板*/
export const getWFModelCreateApplyAjax = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.workflow',
        _method:'read',
        action: "apply_create_wf_model",
        time: new Date().getTime(),
    }
  })
}


//创建流程模板
export const createWFModelAjax = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.model.workflow';
    _saveData._method = 'read';
    _saveData.action = 'create_wf_model';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.operate_id = data.operateId;
    _saveData.wftemp_id = data.wftempId;
    _saveData.req_name = data.reqName;
    _saveData.is_public = data.isPublic?1:0;
    _saveData.menu_ind = data.menuInd?1:0;
    _saveData.into_comp = data.intoComp?1:0;
    _saveData.allow_init_cancel = data.allowInitCancel?1:0;
    _saveData.group = data.group;
    _saveData.sub_group = data.subGroup;
    _saveData.sys_reserve_flag = data.sysReserveFlag?1:0;
    _saveData.def_field_id = data.defFieldId;
    _saveData.code = data.code;
    _saveData.comments = data.comments;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



/*申请编辑表单信息*/
export const getformModelUpdateApplyAjax = function(formId){
    return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.model.form',
          _method:'read',
          action: "apply_update_form_model",
          form_id:formId,
          time: new Date().getTime(),
      }
    })
}


//删除表单组件
export const updateFormModelAjax = function(operateId,formId,data){
    let _saveData = {};
    _saveData.cmd = 'wf.model.form';
    _saveData._method = 'read';
    _saveData.action = 'update_form_model';
    _saveData.ajaxTime = new Date().getTime();

    _saveData.operate_id = operateId;
    _saveData.form_id = formId;
    _saveData.name = data.name;
    _saveData.short_name = data.shortName;
    _saveData.form_width = data.formWidth;
    _saveData.style_name = data.styleName;
    _saveData.title_text_color = data.titleTextColor;
    _saveData.title_bg_color = data.titleBgColor;
    _saveData.form_border_color = data.formBorderColor;

    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


/*表单渲染 (style)*/
export const getformModelReaderAjax = function(operateId){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.model.form',
          _method:'read',
          action: "render_form_model",
          operate_id:operateId,
          time: new Date().getTime(),
      }
  })
}


/*表单渲染 (value)*/
export const getformModelLoadAjax = function(operateId){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.model.form',
          _method:'read',
          action: "load_form_model",
          operate_id:operateId,
          time: new Date().getTime(),
      }
  })
}



/*申请创建表单组件*/
export const getItemModelCreateApplyAjax = function(operateId,modelType,changeLine){
    return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.model.form',
          _method:'read',
          action: "apply_create_item_model",
          operate_id:operateId,
          model_type:modelType,
          change_line:changeLine,
          time: new Date().getTime(),
      }
    })
}

/*创建表单组件*/
export const createFormItemModelAjax = function(data){

    let _saveData = {};
    _saveData.cmd = 'wf.model.form';
    _saveData._method = 'read';
    _saveData.action = 'create_formitem_model';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.operate_id = data.itemOperateId; //申请到的操作id
    _saveData.model_type = data.modelType; //组件模型类型
    _saveData.item_id = data.itemId; //组件id
    _saveData.change_line = data.changeLine; //是否换行
    _saveData.title_name = data.titleName; //标题名称
    _saveData.title_pos = data.titlePos?'n':'l'; //标题位置
    _saveData.title_align = data.titleAlign?data.titleAlign:'l'; //标题对齐方式
    _saveData.vertical_align = data.verticalAlign?data.verticalAlign:'top'; //标题对齐方式
    _saveData.title_width = data.titleWidth;//标题宽度
    _saveData.ft_color = data.ftColor; //标题字体颜色
    _saveData.bg_color = data.bgColor; //标题背景颜色
    _saveData.formula = data.formula; //公式
    _saveData.nullable = data.nullable?0:1; //必填 0 必填 1 非必填
    _saveData.visiable = data.visiable?0:1; //隐藏 0 隐藏 1 可见
    _saveData.ispk = data.ispk?1:0; //主键 1 主键 0 其他
    _saveData.isfk = data.isfk?1:0; //外 1 主键 0 其他
    _saveData.ispn = data.ispn?1:0; //记录名称 1 是 0 否
    _saveData.die_tausendstel = data.dieTausendstel?1:0; //千分位 1 是 0 否

    _saveData.item_width = data.itemWidth; //组件宽度 占比 整型
    _saveData.inst = data.inst; //操作提示
    _saveData.sub_type_id = data.subTypeId?data.subTypeId:0; //时间组件格式 ，选人选机构 选项限制
    _saveData.key_value_flag = data.keyValueFlag?data.keyValueFlag:0; //下拉 ，单选 多选 选项内容
    _saveData.key_value_list = data.sysKeyValueOptionsValue?data.sysKeyValueOptionsValue:0; //下拉 单选 多选 选项基础类别id
    _saveData.constraint_type = data.constraintType?data.constraintType:0;
    _saveData.font_weight = data.fontWeight; //字体加粗 bolder 或 空
    _saveData.font_family = data.fontFamily; //文字字体
    _saveData.font_size = data.fontSize?data.fontSize:12; //字体大小
    _saveData.grid_addbutton = data.gridAddbutton; //表单新增按钮文本 数据方阵
    _saveData.grid_row = data.gridRow?data.gridRow:1; //表单默认行数 数据方阵
    _saveData.grid_sum = data.gridSum; //列序号组成的字符串 用“|”分隔 如果 1|2|3
    _saveData.parent_id = data.parentId?data.parentId:0; //父组件id 比如：数据方阵id
    _saveData.show_col_title = data.showColTitle?1:0; //显示表头 1 显示 0 不显示 数据方阵
    _saveData.show_row_idx = data.showRowIdx?1:0; //显示行号 1 显示 0 不显示 数据方阵
    _saveData.allow_edit_row = data.allowEditRow?1:0; //允许增删行 1 允许 0 不允许 数据方阵

    _saveData.grid_import = data.allowGridImport?1:0; //允许导入 1 允许 0 不允许 数据方阵
    _saveData.grid_export = data.allowGridExport?1:0; //允许导出 1 允许 0 不允许 数据方阵

    _saveData.precision = data.precision?data.precision:0; //精度 数据方阵
    _saveData.file_uploadbutton = data.fileUploadbutton; //附件 上传 按钮名称
    _saveData.default_org_level = data.defaultOrgLevel;
    _saveData.def_field_id = data.defFieldId;
    _saveData.api_scene_id = data.apiSceneId;
    _saveData.view_scene_id = data.viewSceneId;
    _saveData.wf_scene_id = data.wfSceneId;
    _saveData.cs_levelnum = data.csLevelNum ;
    _saveData.search_cols = data.searchCols;
    _saveData.ext_param = data.extParam;

    let _itemKv = '';
    let _defaultId = 0 ; //缺省项
    if(data.modelType == 'TIMEFIELD' || data.modelType == 'USERSELECT' || data.modelType == 'ORGSELECT'
          || data.modelType == 'TEXTFIELD' || data.modelType == 'TEXTAREA' || data.modelType == 'NUMFIELD' ){/*时间组件*/
        _defaultId = data.defaultId;
    }else if(data.modelType == 'CHECKBOX' || data.modelType == 'RADIO' || data.modelType == 'SELECT' || data.modelType == 'POPSELECT' ){
        _defaultId  = -1;
        if(data.keyValueFlag == 0){ //自定义基础数据
              if(data.customOptions){
                    (data.customOptions).forEach((element,idx)=>{
                          if(idx!=0){
                              _itemKv+='^';
                          }
                          _itemKv+= element.desc;
                          if(data.customOptionsDefault == element.id){
                              _defaultId = idx;
                          }
                    })
              }
        }
    }

     _saveData.default_id = _defaultId;//缺省项
     _saveData.default_val = data.defaultVal;  //缺省值
     _saveData.item_kv = _itemKv   //下拉 单选 多选 自定义基础数据名称， 格式： 数据项1^数据项2^...^数据项n^...; 用^分隔
     _saveData.option_grid = data.optionGrid;



     //默认模版 attch_template

     let _fileTemplateLists = [];
     if(data.fileTemplateLists && data.fileTemplateLists.length > 0){
        (data.fileTemplateLists).forEach((item)=>{
            _fileTemplateLists.push(item.fileHeaderId);
        })
     }
     _saveData.attch_template = JSON.stringify({'type':0,"fileHeaderId":_fileTemplateLists.join(",")});
     _saveData.attch_suffix = data.attchSuffix;

      _saveData.compFixed = data.compFixed?1:0;
      _saveData.compWidth = data.compWidth;
     return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

/*申请编辑表单组件*/
export const getItemModelUpdateApplyAjax = function(operateId,itemId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.form',
        _method:'read',
        action: "apply_update_item_model",
        operate_id:operateId,
        item_id:itemId,
        time: new Date().getTime(),
    }
  })
}


/*更新表单组件*/
export const updateFormItemModelAjax = function(data){

  let _saveData = {};
  _saveData.cmd = 'wf.model.form';
  _saveData._method = 'read';
  _saveData.action = 'update_formitem_model';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.operate_id = data.itemOperateId; //申请到的操作id
  _saveData.model_type = data.modelType; //组件模型类型
  _saveData.item_id = data.itemId; //组件id
  _saveData.change_line = data.changeLine; //是否换行
  _saveData.title_name = (data.titleName && data.titleName !='')?data.titleName:FlowFormUtil.getTitleNameByModelType(data.modelType); //标题名称
  _saveData.title_pos = data.titlePos?'n':'l'; //标题位置
  _saveData.title_align = data.titleAlign?data.titleAlign:'l'; //标题对齐方式
  _saveData.vertical_align = data.verticalAlign?data.verticalAlign:'top'; //标题对齐方式
  _saveData.title_width = data.titleWidth;//标题宽度
  _saveData.ft_color = data.ftColor; //标题字体颜色
  _saveData.bg_color = data.bgColor; //标题背景颜色
  _saveData.formula = data.formula; //公式
  _saveData.nullable = data.nullable?0:1; //必填 0 必填 1 非必填
  _saveData.visiable = data.visiable?0:1; //隐藏 0 隐藏 1 可见
  _saveData.ispk = data.ispk?1:0; //主键 1 主键 0 其他
  _saveData.isfk = data.isfk?1:0; //外 1 主键 0 其他
  _saveData.ispn = data.ispn?1:0; //记录名称 1 是 0 否
  _saveData.die_tausendstel = data.dieTausendstel?1:0; //千分位 1 是 0 否
  _saveData.item_width = data.itemWidth; //组件宽度 占比 整型
  _saveData.inst = data.inst; //操作提示
  _saveData.sub_type_id = data.subTypeId?data.subTypeId:0; //时间组件格式 ，选人选机构 选项限制
  _saveData.key_value_flag = data.keyValueFlag?data.keyValueFlag:0; //下拉 ，单选 多选 选项内容
  _saveData.key_value_list = data.sysKeyValueOptionsValue?data.sysKeyValueOptionsValue:0; //下拉 单选 多选 选项基础类别id
  _saveData.constraint_type = data.constraintType?data.constraintType:0;
  _saveData.font_weight = data.fontWeight; //字体加粗 bolder 或 空
  _saveData.font_family = data.fontFamily; //文字字体
  _saveData.font_size = data.fontSize?data.fontSize:12; //字体大小
  _saveData.grid_addbutton = data.gridAddbutton; //表单新增按钮文本 数据方阵
  _saveData.grid_row = data.gridRow?data.gridRow:0; //表单默认行数 数据方阵
  _saveData.grid_sum = data.gridSum; //列序号组成的字符串 用“|”分隔 如果 1|2|3
  _saveData.parent_id = data.parentId?data.parentId:0; //父组件id 比如：数据方阵id
  _saveData.show_col_title = data.showColTitle?1:0; //显示表头 1 显示 0 不显示 数据方阵
  _saveData.show_row_idx = data.showRowIdx?1:0; //显示行号 1 显示 0 不显示 数据方阵
  _saveData.allow_edit_row = data.allowEditRow?1:0; //允许增删行 1 允许 0 不允许 数据方阵
  _saveData.grid_import = data.allowGridImport?1:0; //允许导入 1 允许 0 不允许 数据方阵
  _saveData.grid_export = data.allowGridExport?1:0; //允许导出 1 允许 0 不允许 数据方阵
  _saveData.precision = data.precision?data.precision:0; //精度 数据方阵
  _saveData.file_uploadbutton = data.fileUploadbutton; //附件 上传 按钮名称
  _saveData.select_asn_type = data.selectAsnType;
  _saveData.select_asn_lg = data.selectAsnLg;
  _saveData.select_asn_val = data.selectAsnVal;
  _saveData.option_grid = data.optionGrid;
  _saveData.default_org_level = data.defaultOrgLevel;
  _saveData.def_field_id = data.defFieldId;
  _saveData.seq_group_id = data.seqGroupId;
  _saveData.exec_timing = data.execTiming;
  _saveData.api_scene_id = data.apiSceneId;
  _saveData.view_scene_id = data.viewSceneId;
  _saveData.wf_scene_id = data.wfSceneId;
  _saveData.search_cols = data.searchCols;
  _saveData.ext_param = data.extParam;



    let _itemKv = '';
    let _defaultId = 0 ; //缺省项
    let _defaultVal = data.defaultValHidden?data.defaultValHidden:(data.defaultVal?data.defaultVal:'');
    if(data.modelType == 'TIMEFIELD' || data.modelType == 'USERSELECT' || data.modelType == 'ORGSELECT'
        || data.modelType == 'TEXTFIELD' || data.modelType == 'TEXTAREA' || data.modelType == 'NUMFIELD'){/*时间组件*/
        _defaultId = data.defaultId;
    }else if(data.modelType == 'CHECKBOX' || data.modelType == 'RADIO' || data.modelType == 'SELECT' || data.modelType == 'POPSELECT'){
      if(data.keyValueFlag == 0){ //自定义基础数据
              if(data.customOptions){
                    _defaultId = -1;
                    (data.customOptions).forEach((element,idx)=>{
                        if(idx!=0){
                            _itemKv+='^';
                        }
                        _itemKv+= element.desc;
                        /* 如果是 checkbox 生成 defaultVal*/
                        if(data.modelType == 'CHECKBOX' || data.modelType == 'POPSELECT'){
                            (data.customOptionsDefault).forEach((cusItem,cusIdx)=>{
                                if(cusItem == element.id){
                                    if(_defaultVal!=''){
                                          _defaultVal+=',';
                                    }
                                    _defaultVal+= idx;
                                }
                            })
                        }else{
                            if(data.customOptionsDefault == element.id){
                                _defaultId = idx;
                            }
                        }
                    })
              }
        }else{
              if(data.sysOptions){
                  _defaultId = -1;
                  (data.sysOptions).forEach((element,idx)=>{
                        if(data.modelType == 'CHECKBOX' || data.modelType == 'POPSELECT'){
                          (data.sysOptionsDefautl).forEach((sysItem,sysIdx)=>{
                              if(sysItem == element.id){
                                  if(_defaultVal!=''){
                                      _defaultVal+=',';
                                  }
                                  _defaultVal+= idx;
                              }
                          })
                        }else{
                            if(data.sysOptionsDefautl == element.id){
                              _defaultId = idx;
                            }
                        }
                    })
              }
        }
    }else{
        _defaultId = data.defaultId;
    }

    _saveData.default_id = _defaultId;//缺省项
    _saveData.default_val = _defaultVal;  //缺省值
    _saveData.default_seal = data.defaultSeal;  //签章
    _saveData.cs_dataset = data.csDataSet;
    _saveData.cs_levelnum = data.csLevelNum ;
    _saveData.item_kv = _itemKv   //下拉 单选 多选 自定义基础数据名称， 格式： 数据项1^数据项2^...^数据项n^...; 用^分隔
    if(data.modelType == 'USERSELECT'){
        let _select_asn_val = {};
        _select_asn_val.selectUserByDept =  data.selectUserByDept?1:0;
        _select_asn_val.chooseOne = data.chooseOne?1:0;
        _saveData.select_asn_val = JSON.stringify(_select_asn_val);
    }

    /*grid的列标题更新 */
    if(data.childItems && data.childItems.length > 0){
        let _child_item_str = {};
        data.childItems.forEach((childItem)=>{
            _child_item_str[String(childItem.itemId)] = (childItem.titleName && childItem.titleName!='')?childItem.titleName:FlowFormUtil.getTitleNameByModelType(childItem.modelType);
        })

        try{
            _saveData.child_item_str = JSON.stringify(_child_item_str);
        }catch(e){
            console.log(e);
        }
    }


    let _fileTemplateLists = [];
     if(data.fileTemplateLists && data.fileTemplateLists.length > 0){
        (data.fileTemplateLists).forEach((item)=>{
            _fileTemplateLists.push(item.fileHeaderId);
        })
     }

    _saveData.attch_template = JSON.stringify({'type':0,"fileHeaderId":_fileTemplateLists.join(",")});
    _saveData.attch_suffix = data.attchSuffix;
    _saveData.compFixed = data.compFixed?1:0;
    _saveData.compWidth = data.compWidth;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}




/*获取系统基础数据*/
export const getSystemKVDataModelAjax = function(catId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.data',
        _method:'read',
        action: "get_systemkv_data_model",
        cat_id:catId,
        time: new Date().getTime(),
    }
  })
}



//删除表单组件
export const deleteFormItemModelAjax = function(operateId,itemId){
  let _saveData = {};
  _saveData.cmd = 'wf.model.form';
  _saveData._method = 'read';
  _saveData.action = 'delete_formitem_model';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.operate_id = operateId;
  _saveData.item_id = itemId;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



//保存表单组件布局
export const saveFormItemModelOrderAjax = function(operateId,parentId,saveLayoutArray){
  let _saveData = {};

  _saveData.cmd = 'wf.model.form';
  _saveData._method = 'read';
  _saveData.action = 'order_formitem_model';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.operate_id = operateId;
  _saveData.parent_id = parentId;
  (saveLayoutArray).forEach((element)=>{
    _saveData[String(element.itemId)] = element.value;
  })
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


/*流向设计*/

export const getTemplateOperateId = function(wftemp_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.workflow",
        _method: "read",
        action: "apply_update_wf_model",
        set_token_flag: "N",
        wftemp_id:wftemp_id,
        time: new Date().getTime(),
    }
  })
}



export const loadTopoXml = function(reqId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.graphTopo",
        _method: "read",
        action: "loadTopoXml",
        set_token_flag: "N",
        reqId:reqId,
        time: new Date().getTime(),
    }
  })
}

export const updateTopoXml = function(data){
  let param = {
      cmd:'wf.model.graphTopo',
      action:'updateTopoXml',
      _method:'read',
      set_token_flag:'N',
      reqId:data.reqId,
      xml:data.xmlStr,
      time:new Date().getTime()
  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}

export const getApplyTaskModel = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.task",
        _method: "read",
        action: "apply_update_task_model",
        set_token_flag: "N",
        operate_id:data.operate_id,
        task_id:data.task_id,
        time: new Date().getTime(),
    }
  })
}


export const updateTaskModel = function(data){
  let param = {
      cmd:'wf.model.task',
      action:'update_task_model',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),
      operate_id:data.operate_id,
      model_type:data.modelType,
      task_id:data.taskId,
      task_level:data.taskLevel,
      task_name:data.taskName,
      comments:data.comments,
      inst:data.inst,
      file_editable:data.editInfo.fileEditable,
      edit_trace:data.editInfo.editTrace,
      edit_redhead:data.editInfo.editRedhead,

  }
  // Object.keys(data).forEach(function(key){
  //   param[key] = data[key];
  // });
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}


export const updateWorkTaskModel = function(data){
  let param = {
      cmd:'wf.model.task',
      action:'update_task_model',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),
      operate_id:data.operate_id,
      model_type:data.modelType,
      task_id:data.taskId,
      task_level:data.taskLevel,
      task_name:data.taskName,
      comments:data.comments,
      inst:data.inst,
      select_asn_type:data.select_asn_type,
      select_asn_lg:data.select_asn_lg,
      select_asn_val:data.select_asn_val,
      asn_notnull:data.asnNotnull,
      approvable:data.approvable,
      apprdesc_itemid:data.apprDescItemId,
      cosignable:data.cosignable,
      delegatable:data.delegatable,
      duplicatable:data.duplicatable,
      overtime_alert:data.overtimeAlert,
      overtime_action:data.overtimeAction,
      backable:data.backable,
      asn_emptylogic:data.asnEmptyLogic,
      drive_type:data.driveType,
      time_limit_type:data.timeLimitType,
      time_limit_num:data.timeLimitNum,
      overtime_cat:data.overtimeCat,
      overtime_events:data.overtime_events,
      overtime_item:data.overtimeItem,
      plg_ukey:data.plgUkey,
      file_editable:data.editInfo?data.editInfo.fileEditable:undefined,
      edit_trace:data.editInfo?data.editInfo.editTrace:undefined,
      edit_redhead:data.editInfo?data.editInfo.editRedhead:undefined,
      appr_kv:data.appr_kv,
      it_agent:data.it_agent,
      it_agentname:data.it_agentname,
      param_in:data.param_in,
      mobile_url:data.mobile_url,
      pc_url:data.pc_url,
      it_catid:data.it_catid,
      ref_type:data.ref_type,
      sc_id:data.sc_id,
      from_asn_type:data.from_asn_type,
      from_asn_val:data.from_asn_val,
      select_asn_num:data.selectAsnNum

  }
  // Object.keys(data).forEach(function(key){
  //   param[key] = data[key];
  // });
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}

export const updateconditionTaskModel = function(data){
  let param = {
      cmd:'wf.model.task',
      action:'update_task_model',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),
      operate_id:data.operate_id,
      model_type:data.modelType,
      task_id:data.taskId,
      task_level:data.taskLevel,
      task_name:data.taskName,
      comments:data.comments,
      inst:data.inst,
      check_complate:data.checkComplate,
      single_deny:data.singleDeny,
      route_conds:data.route_conds,
  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}


export const updateSubProcessTaskModel = function(data){
  let param = {
      cmd:'wf.model.task',
      action:'update_task_model',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),
      operate_id:data.operate_id,
      model_type:data.modelType,
      task_id:data.taskId,
      task_level:data.taskLevel,
      task_name:data.taskName,
      comments:data.comments,
      inst:data.inst,
      sub_wf_id:data.subWf,
      select_asn_type:data.select_asn_type,
      select_asn_lg:data.select_asn_lg,
      select_asn_val:data.select_asn_val,
      auto_submit:data.subStatement.autoSubmit,
      sub_wfview:data.subStatement.subWfview,
      wf_subview:data.subStatement.wfSubview,
  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}

export const updateAlphaTaskModel = function(data){
  let param = {
      cmd:'wf.model.task',
      action:'update_task_model',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),
      operate_id:data.operate_id,
      model_type:data.modelType,
      task_id:data.taskId,
      task_level:data.taskLevel,
      task_name:data.taskName,
      comments:data.comments,
      inst:data.inst,
      pf_type:data.pf_type,
      rel_assignee:data.relAssignee,
      rel_orglevel:data.relOrgLevel,
      seal_cat:data.sealCat,
      seal_id:data.sealId,
      pos_item:data.posItem,
      sel_orgname:data.selOrgName,
      sel_orgid:data.selOrgId,
      seal_name:data.sealName,
      small_src:data.smallSrc,
      sc_id:data.scId,
      performer_agent:data.performer_agent,
      seqnum_item:data.seqnumItem

  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}


export const getRenderTaskItempvg = function(operate_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.task",
        _method: "read",
        action: "render_task_itempvg",
        operate_id:operate_id,
        time: new Date().getTime(),
    }
  })
}


export const getRenderTaskAssigneepvg = function(operate_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.task",
        _method: "read",
        action: "render_task_assigneepvg",
        operate_id:operate_id,
        time: new Date().getTime(),
    }
  })
}


export const getRenderTaskInspectform = function(operate_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.task",
        _method: "read",
        action: "render_task_inspectform",
        operate_id:operate_id,
        time: new Date().getTime(),
    }
  })
}


export const updateTaskItempvg = function(data){
  let param = {
      cmd:'wf.model.task',
      action:'update_task_itempvg',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),

  }
  Object.keys(data).forEach(function(key){
     param[key] = data[key];
  });
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}



export const updateTaskInspectform = function(data){

  let param = {
      cmd:'wf.model.task',
      action:'save_task_inspectform',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),

  }
  Object.keys(data).forEach(function(key){
     param[key] = data[key];
  });
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}


export const getRenderSubwfDatamap = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.data",
        _method: "read",
        action: "render_subwf_datamap",
        operate_id:data.operate_id,
        sub_wf_id:data.sub_wf_id,
        output_mapping:data.output_mapping,
        input_mapping:data.input_mapping,
        time: new Date().getTime(),
    }
  })
}

export const updateSubwfDatamap = function(data){
  let param = {
      cmd:'wf.model.data',
      action:'save_subwf_datamap',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),

  }
  Object.keys(data).forEach(function(key){
     param[key] = data[key];
  });
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}
//获取建模时的所有环节列表
export const getAllTaskListForDesign = function(reqId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.workflow",
        _method: "read",
        action: "getAllTaskListForDesign",
        reqId:reqId,
        time: new Date().getTime(),
    }
  })
}
//保存环节排序
export const updateAllTaskListOrderForDesign = function(data){
  let param = {
      cmd:'wf.model.workflow',
      action:'updateAllTaskListOrderForDesign',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),

  }
  Object.keys(data).forEach(function(key){
     param[key] = data[key];
  });
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}



//获取测试记录
export const getFlowTestRecordList = function(template_id){
    return axios.get(baseMainServerUrl,{
        params:{
            cmd: "wf.test.record",
            _method: "read",
            action: "record_list",
            template_id:template_id,
            time: new Date().getTime(),
        }
    })
}

//创建测试记录
export const createFlowTestRecord = function(template_id,test_type){
  let param = {
      cmd:'wf.test.record',
      action:'record_create',
      _method:'read',
      set_token_flag:'N',
      template_id:template_id,
      test_type:test_type,
      time:new Date().getTime(),
  }

  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}


//访问测试记录
export const getFlowTestRecordView = function(record_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.test.record",
        _method: "read",
        action: "record_view",
        record_id:record_id,
        time: new Date().getTime(),
    }
  })
}


/*创建路线（手动）*/
export const createFlowTestLine = function(data){
  let param = {
      cmd:'wf.test.manul',
      action:'line_create',
      _method:'read',
      set_token_flag:'N',
      record_id:data.recordId,
      tempId:data.tempId,
      userReq:data.userReq,
      time:new Date().getTime(),
  }

  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}


//路线访问
export const processFlowTestLine = function(record_id,line_id){
  let param = {
      cmd:'wf.test.manul',
      action:'line_process',
      _method:'read',
      set_token_flag:'N',
      record_id:record_id,
      line_id:line_id,
      time:new Date().getTime(),
  }

  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}

//环节办理申请（手动）
export const getFlowTestProcessForm = function(task_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.test.manul",
        _method: "read",
        action: "process_form",
        task_id:task_id,
        time: new Date().getTime(),
    }
  })
}

//流程暂时保存
export const wfTestSaveFormAjax = function(data,action,root_opid){
  let _saveData = {};
  _saveData.cmd = 'wf.test.manul';
  _saveData._method = 'read';
  _saveData.action = 'save_form';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.root_opid = root_opid;

  if(action == 'submit'){
      _saveData.ss_flag = 'E'
  }else{
      _saveData.ss_flag = 'S'
  }
  Object.keys(data).forEach(function(key){
    _saveData[key] = data[key];
  });

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//环节提交
export const wfTestSubmitTaskAjax = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.test.manul';
    _saveData._method = 'read';
    _saveData.action = 'submit_task';
    _saveData.ajaxTime = new Date().getTime();
    Object.keys(data).forEach(function(key){
      _saveData[key] = data[key];
    });
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}






/*参数配置*/

//解析打印模板文件中的书签内容
export const resolvePrintTemplate = function(template_id,fileHeaderId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.printSet",
        _method: "read",
        action: "resolvePrintTemplate",
        template_id:template_id,
        fileHeaderId:fileHeaderId,
        time: new Date().getTime(),
    }
  })
}

//保存打印设置
export const savePrintTemplate = function(data){
  let param = {
      cmd:'wf.model.printSet',
      action:'savePrintSetForWm',
      _method:'read',
      set_token_flag:'N',
      time:new Date().getTime(),

  }
  Object.keys(data).forEach(function(key){
     param[key] = data[key];
  });
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}

//获取打印设置列表
export const getPrintSetList = function(template_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.printSet",
        _method: "read",
        action: "getPrintSetList",
        reqId:template_id,
        time: new Date().getTime(),
    }
  })
}
//得到某个打印模板的信息
export const getPrintSetInfo = function(template_id,id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.printSet",
        _method: "read",
        action: "getPrintSetInfo",
        reqId:template_id,
        printSetId:id,
        time: new Date().getTime(),
    }
  })
}
//删除打印设置
export const deletePrintSet = function(id){
  let param = {
      cmd:'wf.model.printSet',
      action:'deletePrintSet',
      _method:'read',
      set_token_flag:'N',
      printSetId:id,
      time:new Date().getTime(),

  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}

//获取被选中的打印设置列表
export const getSelectedPrintSetList = function(reqId){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd: "wf.model.printSet",
          _method: "read",
          action: "getSelectedPrintSetList",
          set_token_flag: "N",
          reqId:reqId,
          time: new Date().getTime(),
      }
  })
}

//打印表单
export const getPrintFormData = function(reqId,printSetId){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd: "wf.model.printSet",
          _method: "read",
          action: "printForm",
          set_token_flag: "N",
          reqId:reqId,
          printSetId:printSetId,
          time: new Date().getTime(),
      }
  })
}
//保存扩展配置

export const saveWfExtConfig = function(template_id,id){
  let param = {
      cmd:'wf.model.workflow',
      action:'save_wf_ext_config',
      _method:'read',
      set_token_flag:'N',
      reqId:template_id,
      printSetId:id,
      time:new Date().getTime(),

  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}





/*发布流程*/

//获取流程模板
export const getApplyUpdateWFModel = function(wftemp_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.workflow",
        _method: "read",
        action: "apply_update_wf_model",
        set_token_flag: "N",
        wftemp_id:wftemp_id,
        time: new Date().getTime(),
    }
  })
}


//编辑流程模板
export const updateWFModel = function(data){
  let param = {
    cmd:'wf.model.workflow',
    action:'update_wf_model',
    _method:'read',
    set_token_flag:'N',
    time:new Date().getTime(),
    operate_id:data.operate_id,
    wftemp_id:data.wfTempId,
    req_name:data.name,
    is_public:data.isPublic,
    menu_ind:data.menuInd,
    into_comp:data.intoComp,
    allow_init_cancel:data.allowInitCancel,
    group:data.group,
    sub_group:data.subGroup,
    sys_reserve_flag:data.sysReserveFlag,
    def_field_id:data.defFieldId,
    code:data.code,
    comments:data.comments,
    revoke_flag:data.revokeFlag,
    rk_time_limit_type:data.rkTimeLimitType,
    rk_time_limit_num:data.rkTimeLimitNum,
    viewed_no_revoke:data.viewedNoRevoke,
    rate_derail:data.rateDerail,
    is_rel_klg:data.isRelKlg,
    rel_klg:data.relKlg,
    klg_acr_link:data.klgAcrLink,
    klg_acr_entity:data.klgAcrEntity,
    order_id:data.orderId,
    cancel_scene:data.cancelScene
  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}

//发布流程模板
export const publishWFModel = function(operate_id){
  let param = {
    cmd:'wf.model.workflow',
    action:'publish_wf_model',
    _method:'read',
    set_token_flag:'N',
    time:new Date().getTime(),
    operate_id:operate_id
  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}




// get 获取流程类别
export const getWFGroupsAjax = function(baseInfo){
  return axios.get(baseUrl,{
      params:{
          flag: "v3.wf",
          _method: "read",
          action: "getWFGroups",
          set_token_flag: "N",
          time: new Date().getTime(),
      }
  })
}


// get 获取流程模板
export const getWFTemplatesAjax = function(groupId){
  return axios.get(baseUrl,{
    params:{
        flag: "v3.wf",
        _method: "read",
        action: "getWFTemplates",
        set_token_flag: "N",
        group_id:groupId,
        time: new Date().getTime(),
    }
  })
}


//流程 待办流程取数
export const getTaskWFModuleAjax = function(data){
    return axios.get(baseUrl,{
        params: {
            cmd: "v3.wf",
            flag: "v3.wf",
            _method: "read",
            action: "getWfDb",
            set_token_flag: "N",
            folder: 0,
            group_id: data.groupId||-1,
            num_per_page: data.rows,
            page: data.page,
            request_desc: data.searchMsg,
            sortCol:data.sort,
            sortDir:data.order,
            template_id: data.templdateId||-1,
            init_start_time:data.init_start_time,
            init_end_time:data.init_end_time,
            assign_start_time:data.assign_start_time,
            assign_end_time:data.assign_end_time,
            initValue:data.initValue,
            time:new Date().getTime()
        }
    });
}
// get 获取我发起的流程列表
export const getWfMyProcessAjax = function(baseInfo){
  return axios.get(baseUrl,{
    params:{
        cmd: "v3.wf",
        flag: "v3.wf",
        _method: "read",
        action: "getWfMyProcess",
        set_token_flag: "N",
        folder: baseInfo.folder,
        group_id: baseInfo.groupId,
        num_per_page: baseInfo.rows,
        page: baseInfo.page,
        request_desc: baseInfo.searchMsg,
        template_id: baseInfo.templdateId||-1,
        init_start_time:baseInfo.init_start_time,
        init_end_time:baseInfo.init_end_time,
        sortCol: baseInfo.sort,
        sortDir: baseInfo.order,
        time: new Date().getTime(),
    }
  })
}
// get 获取我经办的流程列表
export const getWFMyAllProcessAjax = function(baseInfo){
  return axios.get(baseUrl,{
    params:{
        cmd: "v3.wf",
        flag: "v3.wf",
        _method: "read",
        action: "getWFMyAllProcess",
        set_token_flag: "N",
        folder: baseInfo.folder,
        group_id: baseInfo.groupId,
        num_per_page: baseInfo.rows,
        page: baseInfo.page,
        request_desc: baseInfo.searchMsg,
        template_id: baseInfo.templdateId||-1,
        init_start_time:baseInfo.init_start_time,
        init_end_time:baseInfo.init_end_time,
        op_start_time:baseInfo.op_start_time,
        op_end_time:baseInfo.op_end_time,
        initValue:baseInfo.initValue,
        sortCol: baseInfo.sort,
        sortDir: baseInfo.order,
        time: new Date().getTime(),
    }
  })
}

// get 获取流程运维列表
export const getWFControlListAjax = function(baseInfo){
  return axios.get(baseUrl,{
    params:{
        cmd: "v3.wf",
        flag: "v3.wf",
        _method: "read",
        action: "getWorkflowMonitor",
        set_token_flag: "N",
        folder: baseInfo.folder,
        group_id: baseInfo.groupId,
        num_per_page: baseInfo.rows,
        page: baseInfo.page,
        ae_ar_flag:"A",
        request_desc: baseInfo.searchMsg,
        template_id: baseInfo.templdateId||-1,
        init_start_time:baseInfo.init_start_time,
        init_end_time:baseInfo.init_end_time,
        initValue:baseInfo.initValue,
        initDept:baseInfo.initDept,
        sortCol: baseInfo.sort,
        sortDir: baseInfo.order,
        time: new Date().getTime(),
    }
  })
}
//流程 抄送列表
export const getWFCCListAjax = function(data){
  return axios.get(baseUrl,{
      params: {
          cmd: "v3.wf",
          flag: "v3.wf",
          _method: "read",
          action: "getWfCC",
          set_token_flag: "N",
          folder: data.folder,
          group_id: data.groupId||-1,
          num_per_page: data.rows,
          page: data.page,
          request_desc: data.searchMsg,
          sortCol:data.sort,
          sortDir:data.order,
          cc_user:data.cc_user,
          cc_start_time:data.assign_start_time,
          cc_end_time:data.assign_end_time,
          time:new Date().getTime()
      }
  });
}

//申请办理流程
export const getWFOperateId = function(task_id){
    return axios.get(baseMainServerUrl,{
        params:{
            cmd:'wf.flowOperate',
            _method:"create",
            action:"process_form",
            set_token_flag:"N",
            task_id:task_id,
            time:new Date().getTime()
        }
    })
}


//流程布局
export const getWFFormRender = function(root_opid){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.loadTaskForm',
          _method:"read",
          action:"render",
          set_token_flag:"N",
          operate_id:root_opid,
          time:new Date().getTime()
      }
  })
}



//流程
export const getWFFormTaskLoad = function(root_opid){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.loadTaskForm',
          _method:"read",
          action:"task_load",
          set_token_flag:"N",
          operate_id:root_opid,
          time:new Date().getTime()
      }
  })
}

//流程暂时保存
export const wfSaveFormAjax = function(data,action){
  let _saveData = {};
  _saveData.cmd = 'wf.flowOperate';
  _saveData._method = 'create';
  _saveData.action = 'save_form';
  _saveData.ajaxTime = new Date().getTime();
  if(action == 'submit'){
      _saveData.ss_flag = 'E'
  }else{
      _saveData.ss_flag = 'S'
  }

  Object.keys(data).forEach(function(key){
    _saveData[key] = data[key];
  });
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//环节提交
export const wfSubmitTaskAjax = function(data){

  let _saveData = {};
  _saveData.cmd = 'wf.flowOperate';
  _saveData._method = 'create';
  _saveData.action = 'submit_task';
  _saveData.ajaxTime = new Date().getTime();
  Object.keys(data).forEach(function(key){
    _saveData[key] = data[key];
  });

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//ajax事件
export const postWFAjaxEvent = function(url,data){
  let _postDate = {};
  _postDate.ajaxTime = new Date().getTime();

  Object.keys(data).forEach(function(key){
    _postDate[key] = data[key];
  });

  return axios.post(
    url,
    qs.stringify( _postDate,{arrayFormat:'repeat'}),
    {traditional:true}
    );
}


//表单编号事件 action=seqnum_view&cmd=wf.loadTaskForm
export const getSeqNumViewAjaxEvent = function(data,seggroup_id){
    let _saveData = {};
    _saveData.cmd = 'wf.loadTaskForm';
    _saveData._method = 'read';
    _saveData.action = 'seqnum_view';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.seggroup_id = seggroup_id;

    Object.keys(data).forEach(function(key){
        _saveData[key] = data[key];
    });

    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//启动流程获取数据接口
export const getWFStartInfo = function(data){
    return axios.get(baseMainServerUrl,{
        params:{
            cmd:"wf.model.workflow",
            _method:"read",
            action:"view_published_grid",
            set_token_flag:"N",
            collection:data,
            time:new Date().getTime()
        }
    })
}


/*初始化启动流程*/
export const initWFAjax = function(map_id){
    return axios.get(baseMainServerUrl,{
        params:{
            cmd: "wf.flowOperate",
            _method: "create",
            action: "init_wf",
            set_token_flag: "N",
            map_id:map_id,
            time: new Date().getTime(),
        }
    })
}


/*初始化启动流程*/
export const initWFByMapDefAjax = function(map_def){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd: "wf.flowOperate",
          _method: "create",
          action: "init_wf",
          set_token_flag: "N",
          map_def:map_def,
          time: new Date().getTime(),
      }
  })
}



/*获取流程历史记录*/
export const getWFHisDataAjax = function(operate_id){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd: "wf.loadTaskForm",
          _method: "read",
          action: "load_history",
          set_token_flag: "N",
          operate_id:operate_id,
          time: new Date().getTime(),
      }
  })
}


//申请查看流程
export const getWFViewOperateId = function(wfId,formView,ccId){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.flowOperate',
          _method:"create",
          action:"view_form",
          set_token_flag:"N",
          wf_id:wfId,
          cc_id:ccId,
          form_view:formView,
          time:new Date().getTime()
      }
  })
}


//待办流程抄送
export const doWFToDoCCSend = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.loadTaskForm';
    _saveData._method = 'read';
    _saveData.action = 'cc_send';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.operate_id = data.operateId;
    _saveData.cc_assignee = data.assignHiddenValue;
    _saveData.cc_title = data.title;
    _saveData.cc_content = data.content;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



//获取相关性设置
export const getRenderInteractionModel = function(operate_id){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.model.form',
          _method:"read",
          action:"render_interaction_model",
          set_token_flag:"N",
          operate_id:operate_id,
          time:new Date().getTime()
      }
  })
}
//保存相关性设置
export const saveInteractionModel = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.form';
  _saveData._method = 'read';
  _saveData.action = 'save_interaction_model';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.operate_id = data.operateId;
  _saveData.interaction_conds = data.interaction_conds;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//删除流程模版
export const deleteWFTemplateSingle = function(template_id){
  let _saveData = {};
  _saveData.cmd = 'wf.model.workflow';
  _saveData._method = 'read';
  _saveData.action = 'invalid_workflow_template';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.template_id = template_id
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//恢复流程模版
export const recoverWFTemplateSingle = function(template_id){
  let _saveData = {};
  _saveData.cmd = 'wf.model.workflow';
  _saveData._method = 'read';
  _saveData.action = 'recover_workflow_template';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.template_id = template_id
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//拷贝流程模板
export const copyWFTemplate = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.workflow';
  _saveData._method = 'read';
  _saveData.action = 'copy_wf_model';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.wftemp_id = data.wftemp_id;
  _saveData.wf_name = data.wf_name;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}




//保存模板权限
export const saveFlowStartPermission = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.workflow';
  _saveData._method = 'read';
  _saveData.action = 'save_wm_permission';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.template_id = data.template_id;
  _saveData.role_str = data.role_str;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//获取模板权限
export const getFlowStartPermission = function(template_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.workflow',
        _method:"read",
        action:"get_wm_permission",
        set_token_flag:"N",
        template_id:template_id,
        time:new Date().getTime()
    }
})}

//修改流程状态
export const changeWfStatus = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.maintain';
  _saveData._method = 'read';
  _saveData.action = 'changeWfStatus';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.wf_id = data.wf_id;
  _saveData.target_status_flag = data.target_status_flag;
  _saveData.check_op = data.check_op;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//批量取消流程
export const batchCancelWf = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.maintain';
  _saveData._method = 'read';
  _saveData.action = 'batchCancelWf';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.wf_id_str = data.wf_id_str;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


// //修改流程状态
// export const reCallWF = function(data){
//   let _saveData = {};
//   _saveData.cmd = 'wf.model.maintain';
//   _saveData._method = 'read';
//   _saveData.action = 'wfBackOff';
//   _saveData.ajaxTime = new Date().getTime();
//   _saveData.wf_id = data.wf_id;
//   return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
// }
//环节撤回

export const reCallWF = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.flowOperate';
  _saveData._method = 'read';
  _saveData.action = 'revoke_process';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.wf_id = data.wf_id;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}
//获取流程大环节列表
export const getDriveTaskList = function(wf_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.maintain',
        _method:"read",
        action:"getDriveTaskList",
        set_token_flag:"N",
        wf_id:wf_id,
        time:new Date().getTime()
    }
})}


//变更整个大环节（同一task_level）状态
export const changeTaskStatusForLevel = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.model.maintain';
    _saveData._method = 'read';
    _saveData.action = 'batchChangeTaskStatusForLevel';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.task_level = data.task_level;
    _saveData.wf_id = data.wf_id;
    _saveData.target_status_flag = data.target_status_flag;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//获取某个大环节当前轮的所有办理环节
export const getProcessTaskListByTaskLevel = function(wf_id,task_level){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.maintain',
        _method:"read",
        action:"getProcessTaskListByTaskLevel",
        set_token_flag:"N",
        wf_id:wf_id,
        task_level:task_level,
        time:new Date().getTime()
    }
})}

//变更单个环节状态
export const changeTaskStatus = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.maintain';
  _saveData._method = 'read';
  _saveData.action = 'changeTaskStatus';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.task_id = data.task_id;
  _saveData.wf_id = data.wf_id;
  _saveData.target_status_flag = data.target_status_flag;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}




// 获取编号序列列表
export const getWFSeqIndexListAjax = function(data){
  return axios.get(baseMainServerUrl,{
        params:{
            cmd:'wf.facade.seqIndx',
            _method:'read',
            action: "search_list",
            search_name:data.schName,
            page:data.page,
            page_size:data.pageSize,
            sort_col:data.sortCol,
            time: new Date().getTime(),
        }
  })
}


// 获取编号序列列表
export const getWFSeqIndexDetailAjax = function(id){
  return axios.get(baseMainServerUrl,{
        params:{
            cmd:'wf.facade.seqIndx',
            _method:'read',
            action: "load_seq_indx",
            lg_id:id,
            time: new Date().getTime(),
        }
  })
}



export const createWFSeqIndexAjax = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.facade.seqIndx';
    _saveData._method = 'read';
    _saveData.action = 'add_seq_indx';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.name = data.name;
    _saveData.seg_size = data.segSize;
    _saveData.overflow_lg = data.overflowLg;
    _saveData.reset_cycl = data.resetCycl;
    _saveData.init_val = data.initVal;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



export const editWFSeqIndexAjax = function(data){
      let _saveData = {};
      _saveData.cmd = 'wf.facade.seqIndx';
      _saveData._method = 'read';
      _saveData.action = 'update_seq_indx';
      _saveData.ajaxTime = new Date().getTime();
      _saveData.name = data.name;
      _saveData.seg_size = data.segSize;
      _saveData.overflow_lg = data.overflowLg;
      _saveData.reset_cycl = data.resetCycl;
      _saveData.curr_val = data.currVal;
      _saveData.lg_id = data.id;
      return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});

}


export const renderSeqGroupModelAjax = function(operateId,seqGroupId){
  return axios.get(baseMainServerUrl,{
        params:{
            cmd:'wf.model.form',
            _method:'read',
            action: "render_seqgroup_model",
            operate_id:operateId,
            seq_group_id:seqGroupId,
            time: new Date().getTime(),
        }
  })
}

//保存组件序号逻辑
export const saveSeqgroupModelAjax = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.form';
  _saveData._method = 'read';
  _saveData.action = 'save_seqgroup_model';
  _saveData.ajaxTime = new Date().getTime();

  _saveData.operate_id = data.operateId;
  _saveData.seq_group_id = data.seqGroupId;
  _saveData.seq_group_list = data.seqGroupList;

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//获取组件相关性
export const getItemInteractionAjax = function(data){
   let _saveData = {};
  _saveData.cmd = 'wf.loadTaskForm';
  _saveData._method = 'read';
  _saveData.action = 'interaction_event';
  _saveData.ajaxTime = new Date().getTime();

  Object.keys(data).forEach(function(key){
    _saveData[key] = data[key];
  });

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//获取印章信息列表
export const getSignatureList = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'sealController',
        _method:'queryList',
        linkId:data.linkId,
        type:data.type,
        groupId:data.groupId,
        nullGroupId:data.nullGroupId,
        sort:data.sort,
        order:data.order,
        page:data.page,
        rows:data.rows,
        time: new Date().getTime(),
    }
  })
}
//组件签章加载设置
export const getSignatureSettingInfo = function(operateId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.form',
        _method:'read',
        action:"load_item_default_seal",
        operate_id:operateId,
        time: new Date().getTime(),
    }
  })
}
//组件签章设置保存

export const saveSignatureSettingInfo = function(data){
  let _saveData = {};
 _saveData.cmd = 'wf.model.form';
 _saveData._method = 'read';
 _saveData.action = 'save_item_default_seal';
 _saveData.ajaxTime = new Date().getTime();

 Object.keys(data).forEach(function(key){
   _saveData[key] = data[key];
 });

 return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}




//获取连接器类型列表
export const getConnectorTypeList = function(agentId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.afbotSet',
        _method:'read',
        action:"getConnectorTypeList",
        agent_id:agentId,
        time: new Date().getTime(),
    }
  })
}


//获取某类连接器列表
export const getConnectorListByType = function(desc,agentId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.afbotSet',
        _method:'read',
        action:"getConnectorListByType",
        connector_type_desc:desc,
        agent_id:agentId,
        time: new Date().getTime(),
    }
  })
}

//获取某连接器相关的接口列表
export const getApiListByConnector = function(id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.afbotSet',
        _method:'read',
        action:"getApiListByConnector",
        connector_id:id,
        time: new Date().getTime(),
    }
  })
}

//获取某接口的详细信息
export const getApiDetByApiId = function(id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.afbotSet',
        _method:'read',
        action:"getApiDetByApiId",
        api_id:id,
        time: new Date().getTime(),
    }
  })
}

//获取连接器列表
export const getConnectorList = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.facade.perform',
        _method:'read',
        action:"pfm_ref_list",
        operate_id:data.operate_id,
        page:0,
        cat_name:data.cat_name,
        if_name:data.if_name,
        ref_name:data.ref_name,
        agent_id:data.it_agent,
        time: new Date().getTime(),
    }
  })
}
// 保存执行器配置
export const saveConnectorInfo = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.facade.perform';
  _saveData._method = 'read';
  _saveData.action = 'save_pfm_ref_info';
  _saveData.ajaxTime = new Date().getTime();

  Object.keys(data).forEach(function(key){
    _saveData[key] = data[key];
  });

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}
//加载执行器详情
export const loadConnectorInfo = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.facade.perform',
        _method:'read',
        action:"load_pfm_ref_info",
        operate_id:data.operate_id,
        ref_id:data.ref_id,
        time: new Date().getTime(),
    }
  })
}

//加载场景详情
export const loadSceneInfo = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.facade.perform',
        _method:'read',
        action:"load_pfm_scene_info",
        operate_id:data.operate_id,
        sc_id:data.sc_id,
        ref_id:data.ref_id,
        time: new Date().getTime(),
    }
  })
}

// 保存场景配置
export const saveSceneInfo = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.facade.perform';
  _saveData._method = 'read';
  _saveData.action = 'save_pfm_scene_info';
  _saveData.ajaxTime = new Date().getTime();

  Object.keys(data).forEach(function(key){
    _saveData[key] = data[key];
  });

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



// api 组件接口
export const getFormApiSceneEvent = function(data,baseInfo,searchData){
    let _saveData = {};
  _saveData.cmd = 'wf.loadTaskForm';
  _saveData._method = 'read';
  _saveData.action = 'form_scene_event';
  _saveData.ajaxTime = new Date().getTime();

  Object.keys(data).forEach(function(key){
      _saveData[key] = data[key];
  });

  if(baseInfo && baseInfo.ispage == 1){ //分页
      _saveData['#page'] = baseInfo.page;
      _saveData['#page_size'] = baseInfo.pageSize;
  }
  if(searchData){
    Object.keys(searchData).forEach(function(key){
      _saveData[key] = searchData[key];
    });
  }



 return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


// api 组件接口
export const getViewApiSceneEvent = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.loadTaskForm';
    _saveData._method = 'read';
    _saveData.action = 'view_scene_event';

    _saveData.ajaxTime = new Date().getTime();

    Object.keys(data).forEach(function(key){
      _saveData[key] = data[key];
    });

    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//关联流程加载接口
export const loadRelWfInfo = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.form',
        _method:'read',
        action:"load_relwf_scene",
        operate_id:data.operate_id,
        sc_id:data.sc_id,
        time: new Date().getTime(),
    }
  })
}
//获取关联流程表单数据项
export const getRelWfFormData = function(wf_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.data',
        _method:'read',
        action:"wf_datamodel_form",
        wf_id:wf_id,
        time: new Date().getTime(),
    }
  })
}
//保存关联流程数据
export const saveWfLinkInfo = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.form';
  _saveData._method = 'read';
  _saveData.action = 'save_relwf_scene';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.operate_id = data.operate_id;
  _saveData.sc_id = data.sc_id;
  _saveData.sc_select = data.sc_select;
  _saveData.wf_status = data.wf_status_string;
  _saveData.wf_template = data.wf_template;
  _saveData.sel_wfname = data.templateName;
  _saveData.rel_data = data.rel_data;
  _saveData.sel_scope = data.sel_scope_string;
  _saveData.sc_mapping = data.sc_mapping;

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//根据审批意见组件自动生成审批环节
export const addTaskForApprItem = function(reqId,formId){
  let _saveData = {};
  _saveData.cmd = 'wf.model.graphTopo';
  _saveData._method = 'read';
  _saveData.action = 'addTaskForApprItem';
  _saveData.reqId = reqId;
  _saveData.formId = formId;
  _saveData.ajaxTime = new Date().getTime();

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



// 流程关联 组件接口
export const getWFSceneEventAjax = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.loadTaskForm';
    _saveData._method = 'read';
    _saveData.action = 'wf_scene_event';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.operate_id = data.operateId;
    _saveData.sc_id = data.scId;

 return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}




// 流程关联 组件接口
export const getWFSceneLoadAjax = function(data){
  let _saveData = {};
 _saveData.cmd = 'wf.loadTaskForm';
 _saveData._method = 'read';
 _saveData.action = 'wf_scene_load';
 _saveData.ajaxTime = new Date().getTime();

 _saveData.operate_id = data.operateId;
 _saveData.sc_scope = data.scScope; //选择范围
 _saveData.sc_status = data.scStatus;
 _saveData.wf_tempid = data.wfTempId;

 _saveData.page = data.page;
 _saveData.page_size = data.pageSize;
 _saveData.sc_name = data.scName;

 _saveData.sc_init_req = data.sc_init_req;
 _saveData.sc_inittime_start = data.sc_inittime_start;
 _saveData.sc_inittime_end = data.sc_inittime_end;
 _saveData.sc_duetime_start = data.sc_duetime_start;
 _saveData.sc_duetime_end = data.sc_duetime_end;

 return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



// 流程关联 组件接口
export const getWFSceneFormDataAjax = function(data,_selWf){
  let _saveData = {};
  _saveData.cmd = 'wf.loadTaskForm';
  _saveData._method = 'read';
  _saveData.action = 'wf_scene_formdata';
  _saveData.ajaxTime = new Date().getTime();

  _saveData.operate_id = data.operateId;
  _saveData.sc_id = data.scId;
  _saveData.sel_wf = _selWf;

 return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//获取激活的Agent列表
export const getAgentList = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.afbotSet',
        _method:'read',
        action:"getActiveAgents",
        time: new Date().getTime(),
    }
  })
}

export const changeTaskAssingee = function(data,_selWf){
  let _saveData = {};
  _saveData.cmd = 'wf.model.maintain';
  _saveData._method = 'read';
  _saveData.action = 'changeTaskAssingee';
  _saveData.ajaxTime = new Date().getTime();

  _saveData.wf_id = data.wf_id;
  _saveData.task_level = data.task_level;
  _saveData.task_id = data.task_id;
  _saveData.assignee = data.assignee;
 return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

export const addTaskLevelAssignee = function(data,_selWf){
  let _saveData = {};
  _saveData.cmd = 'wf.model.maintain';
  _saveData._method = 'read';
  _saveData.action = 'addTaskLevelAssignee';
  _saveData.ajaxTime = new Date().getTime();

  _saveData.wf_id = data.wf_id;
  _saveData.task_level = data.task_level;
  _saveData.assignee = data.assignee;
 return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//删除流程
export const deleteWorkFlow = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.maintain';
  _saveData._method = 'read';
  _saveData.action = 'delete_workflow';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.wf_id = data.wf_id;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


//批量删除流程
export const batchDeleteWf = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.model.maintain';
  _saveData._method = 'read';
  _saveData.action = 'delete_workflow_batch';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.wf_ids = data.wf_ids;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//获取输出项
export const getOutPutInfo = function(ref_id){
  let _saveData = {};
  _saveData.cmd = 'wf.facade.perform';
  _saveData._method = 'read';
  _saveData.action = 'load_ref_outitems';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.ref_id = ref_id;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



//Ukey 上传附件
export const updateFileToServerUKey = function(data,url){
      let _saveData = {};
      Object.keys(data).forEach(function(key){
          _saveData[key] = data[key];
      });
      let config = {
          headers:{'Content-Type':'application/json'}
      };
      let _url = url+'/TGCtrlApi';
      return axios.post(_url,_saveData,config);
}


//get Ukey 基本信息
export const getUKeyBaseInfo = function(data){
    return axios.get(baseMainServerUrl,{
        params:{
            cmd:'ukeySealConstant',
            _method:'getUkeyContant',
            time: new Date().getTime(),
        }
    })
}


// 删除执行器配置
export const deleteConnectorInfo = function(ref_id){
  let _saveData = {};
  _saveData.cmd = 'wf.facade.perform';
  _saveData._method = 'read';
  _saveData.action = 'delete_pfm';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.ref_id = ref_id;


  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

//pc端导入流程模板
export const resolveFormByImportFile = function(fileHeaderId,curr_user_id,curr_user_req_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.aiImport",
        _method: "read",
        action: "resolveFormByImportFile",
        fileHeaderId:fileHeaderId,
        curr_user_id:curr_user_id,
        curr_user_req_id:curr_user_req_id,
        time: new Date().getTime(),
    }
  })
}
//轮询缓存


export const repeatCacheIdData = function(cacheId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd: "wf.model.aiImport",
        _method: "read",
        action: "checkCache",
        checkCacheId:cacheId,
        time: new Date().getTime(),
    }
  })
}



//获取数据集列表
export const getCascaderDataMapTypeList = function(){
    return axios.get(baseMainServerUrl,{
        params:{
              cmd:'wf.ext.dataset',
              _method:'read',
              action:"select_dataset_list",
              ds_type:2,
              time: new Date().getTime(),
        }
    })
}



//获取节点列表
export const getCascaderNodeList = function(data){
    return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.ext.kvtree',
          _method:'read',
          action:"select_node_list",
          parent_id:data.parent_id,
          level_id:data.level_id,
          ds_id:data.ds_id,
          time: new Date().getTime(),
      }
    })
}


export const getCascaderNodeListByCache = function(data){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.loadTaskForm',
        _method:'read',
        action:"select_dataset_tree",
        parent_id:data.parent_id,
        ds_id:data.ds_id,
        operate_id:data.operate_id,
        time: new Date().getTime(),
    }
  })
}



export const getCascaderNodeLevelNum = function(ds_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.ext.kvtree',
        _method:'read',
        action:"select_max_level",
        ds_id:ds_id,
        time: new Date().getTime(),
    }
  })
}

//评价流程
export const rateWorkFlow = function(data){
  let _saveData = {};
  _saveData.cmd = 'workflowRateController';
  _saveData._method = 'addWorkflowRate';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.workflowId = data.wfId;
  _saveData.score = data.score;
  _saveData.comment = data.comments;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}
//获取流程评价信息
export const getWorkFlowRateInfo = function(workflowId){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'workflowRateController',
        _method:'queryWorkflowRateByWorkflowId',
        workflowId:workflowId,
        time: new Date().getTime(),
    }
  })
}
//获取系统默认审批秒速
export const getWorkFlowApprKv = function(){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.model.workflow',
        _method:'read',
        action:"bpm_appr_kv",
        time: new Date().getTime(),
    }
  })
}
//批量审批校验
export const checkBatchAppr = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.flowOperate';
  _saveData._method = 'create';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.action = "batch_check_form";
  _saveData.batch_tasks = data.batchTasks;
  _saveData.appr_code = data.apprCode;
  _saveData.appr_desc = data.apprDesc;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}
//批量审批提交
export const submitBatchAppr = function(data){
  let _saveData = {};
  _saveData.cmd = 'wf.flowOperate';
  _saveData._method = 'create';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.action = "batch_submit";
  _saveData.batch_tasks = data.batchTasks;
  _saveData.appr_code = data.apprCode;
  _saveData.appr_desc = data.apprDesc;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}
//获取知识库列表
export const getKMListInfo = function(){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'knowledgeExtController',
          _method:"queryList",
          time: new Date().getTime(),
      }
  })
}
//获取知识库数据
export const getKMInfoByReqId = function(reqId){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'knowledgeExtController',
          _method:"queryFolderTree",
          id:reqId,
          time: new Date().getTime(),
      }
  })
}



//（通讯录）根据KEY 搜索组织架构 
export const searchUser = function(operate_id,item_id,sch_key){
    return axios.get(baseMainServerUrl,{
          params:{
                  cmd:"wf.loadTaskForm",
                  _method:"read",
                  action:"search_user",
                  operate_id:operate_id,
                  item_id:item_id,
                  sch_key:sch_key,
                  time:new Date().getTime()
          }
    })
}

//（通讯录）根据KEY 搜索组织架构 
export const searchOrg = function(operate_id,item_id,sch_key){
  return axios.get(baseMainServerUrl,{
        params:{
                cmd:"wf.loadTaskForm",
                _method:"read",
                action:"search_dept",
                operate_id:operate_id,
                item_id:item_id,
                sch_key:sch_key,
                time:new Date().getTime()
        }
  })
}


//（通讯录）根据KEY 搜索组织架构 
export const getAddressBookSearch = function(key,options){
  return axios.get(baseUrl,{
    params:{
          flag:"v3.org",
          _method:"read",
          action:"getAddressbookSearch",
          key:key,
          idType:options.idType,
          filterType:0,
          selectType:options.selectType,
          beginId:options.beginId,
          time:new Date().getTime()
    }
  })
}

//获取流程退回任务环节

export const getWorkFlowHisBackList = function(operate_id){
  return axios.get(baseMainServerUrl,{
    params:{
        cmd:'wf.loadTaskForm',
        _method:'read',
        action:"his_backlist",
        operate_id:operate_id,
        time: new Date().getTime(),
    }
  })
}




/*获取流程启动门户列表*/
export const getWFPortalGroupList = function(){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.portal.group',
          _method:'queryGroupList',
          time: new Date().getTime(),
      }
  })
}


export const getWFPortalGroupDetById = function(id){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.portal.group',
          _method:'queryGroupSingle',
          id:id,
          time: new Date().getTime(),
      }
  })
}


export const addWFPortalGroup = function(data){
      let _saveData = {};
      _saveData.cmd = 'wf.portal.group';
      _saveData._method = 'insertGroup';
      _saveData.ajaxTime = new Date().getTime();
      _saveData.name = data.name;
      // _saveData.orderId = data.orderId;
      return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


export const updateWFPortalGroup = function(data){
      let _saveData = {};
      _saveData.cmd = 'wf.portal.group';
      _saveData._method = 'updateGroup';
      _saveData.ajaxTime = new Date().getTime();
      _saveData.id = data.id;
      _saveData.name = data.name;
      _saveData.orderId = data.orderId;
      return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



export const deleteWFPortalGroup = function(id){
    let _saveData = {};
    _saveData.cmd = 'wf.portal.group';
    _saveData._method = 'deleteGroup';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.id = id;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}



export const sortWFPortalGroup = function(ids){
    let _saveData = {};
    _saveData.cmd = 'wf.portal.group';
    _saveData._method = 'orderGroupList';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.ids = ids;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}




//获取流程门户中，流程模版的接口
export const getWFPortalGroupItemList = function(groupId){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.portal.group',
          _method:'queryGroupItemList',
          groupId:groupId,
          time: new Date().getTime(),
      }
  })
}


export const addWFPortalGroupItem = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.portal.group';
    _saveData._method = 'insertGroupItem';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.groupId = data.groupId;
    _saveData.itemName = data.itemName;
    _saveData.iconId = data.iconId;
    // _saveData.orderId = data.orderId;
    _saveData.evUrl = data.evUrl;
    _saveData.evModelId = data.evModelId;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}

export const deleteWFPortalGroupItem = function(id){
  let _saveData = {};
  _saveData.cmd = 'wf.portal.group';
  _saveData._method = 'deleteGroupItem';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.id = id;

  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


export const getWFPortalGroupItemDetById = function(id){
  return axios.get(baseMainServerUrl,{
      params:{
          cmd:'wf.portal.group',
          _method:'queryGroupItemSingle',
          id:id,
          time: new Date().getTime(),
      }
  })
}

export const updateWFPortalGroupItem = function(data){
    let _saveData = {};
    _saveData.cmd = 'wf.portal.group';
    _saveData._method = 'updateGroupItem';
    _saveData.ajaxTime = new Date().getTime();
    _saveData.groupId = data.groupId;
    _saveData.id = data.itemId;
    _saveData.itemName = data.itemName;
    _saveData.iconId = data.iconId;
    _saveData.orderId = data.orderId;
    _saveData.evUrl = data.evUrl;
    _saveData.evModelId = data.evModelId;
    return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


export const sortWFPortalGroupItems = function(ids){
  let _saveData = {};
  _saveData.cmd = 'wf.portal.group';
  _saveData._method = 'orderGroupItemList';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.ids = ids;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}




export const doGridExlImpAjax = function(data,fileList){
    let param = new window.FormData();
    param.append("itemId", data.itemId);
    // param.append("gridData",data.gridData); //要添加的节点的ID
    param.append("saveType",data.saveType);
    param.append("startIdx",data.startIdx);//要添加的节点的fileLevel
    param.append("time",new Date().getTime());

    for(let i = 0;i < fileList.length;i++){
          param.append('file',fileList[i].file,fileList[i].file.name);
    }

    let config = {
        headers:{'Content-Type':'multipart/form-data'},
        traditional:true
    };  //添加请求头

     let url = baseMainServerUrl+'?cmd=wf.loadTaskForm&_method=read&action=griddata_upload&operate_id='+data.operateId;
    return axios.post(url,param,config);
}


export const doGridExlExportAjax = function(data){ //数据方阵导出
  let _saveData = {};
  _saveData.cmd = 'wf.form.griddata.download';
  _saveData._method = 'read';
  _saveData.ajaxTime = new Date().getTime();
  _saveData.operate_id = data.operateId;
  _saveData.grid_data = data.gridData;
  _saveData.item_id = data.itemId;
  return axios.post(baseMainServerUrl,qs.stringify(_saveData,{arrayFormat:'repeat'}),{traditional:true});
}


// 流程收藏
export const flowStartCollectAjax = function(wfTempId){
  let param = {
      cmd:'wfTempCollectionController',
      _method:'updateCollection',
      set_token_flag:'N',
      templateId:wfTempId,
      time:new Date().getTime(),
  }
  return axios.post(baseMainServerUrl,qs.stringify(param,{arrayFormat:'repeat'}),{traditional:true});
}
