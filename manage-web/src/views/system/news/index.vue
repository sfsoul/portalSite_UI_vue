<template>
  <div class="app-container">
    <!--工具栏-->
    <crudOperation />
    <!--表单组件-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="470px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
        <el-form-item label="新闻类型" prop="newsTName">
          <el-input v-model="form.newsTName" style="width: 230px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%;margin-top: 12px;"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="newsTName" label="新闻类型" align="center" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudNewsType from '@/api/system/newsType'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
// crud交由presenter持有
const defaultCrud = CRUD({ title: '新闻类型', requestType: 'post', url: 'back/settings/newsType/getTypes', crudMethod: { ...crudNewsType }})
const defaultForm = { newsTName: null }
export default {
  name: 'NewsType',
  components: { pagination, crudOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      loading: false,
      rules: {
        newsTName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.crud.optShow.del = false
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
