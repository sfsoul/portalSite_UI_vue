<template>
  <div class="app-container">
    <!--工具栏-->
    <div>
      <router-link :to="'/publish/train/create/'">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-upload"
          style="float:left;margin: -8px 10px 0 0;"
        >发布
        </el-button>
      </router-link>
      <router-link :to="{path: '/publish/train/edit/', query: {row: crud.selections[0]}}">
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-edit"
          style="float:left;margin: -8px 10px 0 0;"
          :disabled="crud.selections.length !== 1"
        >修改
        </el-button>
      </router-link>
      <crudOperation style="float:left" />
    </div>
    <!--表格渲染-->
    <el-table
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%;margin-top: 24px;"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column prop="title" align="center" label="标题" />
      <el-table-column prop="author" label="作者" align="center" />
      <el-table-column width="135" prop="publishdate" align="center" label="发布日期" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudTrainPublish from '@/api/publish/trainPublish'
import CRUD, { presenter, header, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ requestType: 'post', url: 'train/getOrgTrains', crudMethod: { ...crudTrainPublish }})
export default {
  name: 'Pictures',
  components: { crudOperation, pagination },
  mixins: [presenter(defaultCrud), header(), crud()],
  data() {
    return {
    }
  },
  created() {
    this.crud.optShow.add = false
    this.crud.optShow.edit = false
  },
  methods: {
    checkboxT(row, rowIndex) {
      return row
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dialog-div {
    height: 60vh;
    overflow: auto;
  }

  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }

</style>
