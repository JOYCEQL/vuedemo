<template>
  <div class="EditTable">
    <!-- <vxe-table
          border
          resizable
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell',icon: 'fa fa-pencil'}">
          <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex6" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value2', label: 'label'}}"></vxe-table-column>
          <vxe-table-column field="sex1" title="多选下拉" :edit-render="{name: '$select', options: sexList, props: {multiple: true}}"></vxe-table-column>
          <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
          <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
        </vxe-table> -->
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）"
      >
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）"
      >
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'EditTable',
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  created () {
    this.tableData = this.tableData.map(v => {
      this.$set(v, 'edit', false)
      return v
    })
  },
  methods: {
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }

}
</script>

<style >
</style>
