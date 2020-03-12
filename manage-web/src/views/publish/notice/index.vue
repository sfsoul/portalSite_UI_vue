<template>
  <div class="app-container">
    <!--工具栏-->
    <div>
      <router-link :to="'/publish/notice/create/'">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-upload"
          style="float:left;margin: -8px 10px 0 0;"
        >发布
        </el-button>
      </router-link>
      <router-link :to="{path: '/publish/notice/edit/', query: {row: crud.selections[0]}}">
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
      <el-table-column prop="noticeTName" label="通告类型" align="center" />
      <el-table-column prop="author" label="作者" align="center" />
      <el-table-column width="135" prop="publishdate" align="center" label="发布日期" />
      <el-table-column prop="reviewstatusStr" align="center" label="审核状态" />
      <el-table-column
        label="审核详情"
      >
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="mini" @click="handleClick(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :title="detail.title"
      :visible.sync="showdetail"
      direction="rtl"
      size="30%"
    >
      <div>
        <div class="drawer-item" style="margin-top: -30px;">
          <span style="margin-left: 22px;">审核状态:</span>
          <span>{{ detailsList.reviewstatusStr }}</span>
        </div>
        <div class="drawer-item" style="margin-top: -10px;">
          <span style="margin-left: 22px;">审核意见:</span>
          <span>{{ detailsList.reviewComment }}</span>
        </div>
        <div class="drawer-item" style="margin-top: -10px;">
          <span style="margin-left: 22px;">审核人:</span>
          <span>{{ detailsList.reviewer }}</span>
        </div>
        <div class="drawer-item" style="margin-top: -10px;">
          <span style="margin-left: 22px;">审核日期:</span>
          <span>{{ detailsList.reviewdate }}</span>
        </div>
      </div>
    </el-drawer>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import Long from 'long'
import crudNoticesPublish from '@/api/publish/noticesPublish'
import { getNoticeDetail } from '@/api/publish/noticesPublish'
import CRUD, { presenter, header, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ requestType: 'post', url: 'notice/getPublishNotices', crudMethod: { ...crudNoticesPublish }})
export default {
  name: 'Pictures',
  components: { crudOperation, pagination },
  mixins: [presenter(defaultCrud), header(), crud()],
  data() {
    return {
      showdetail: false,
      detail: {},
      detailsList: {}
    }
  },
  created() {
    this.crud.optShow.add = false
    this.crud.optShow.edit = false
  },
  methods: {
    handleClick(row) {
      this.detail = row
      this.showdetail = true
      this.detailsList = {}
      getNoticeDetail((Long.fromValue(row.id)).toString()).then(res => {
        this.detailsList = res
      })
    },
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
