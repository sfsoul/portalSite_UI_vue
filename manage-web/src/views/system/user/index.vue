<template>
  <div class="app-container">
    <!-- crud 操作工具-->
    <div class="crud-opts">
      <el-button
        :loading="crud.refreshLoading"
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-refresh"
        @click="refresh"
      >
        刷新
      </el-button>
      <el-button
        slot="reference"
        class="filter-item"
        type="danger"
        icon="el-icon-refresh-left"
        size="mini"
        :loading="crud.resetPassLoading"
        :disabled="crud.selections.length === 0"
        @click="crud.resetPassDialogVisible = true"
      >
        重置密码
      </el-button>
    </div>
    <!-- 表单渲染 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="crud.resetPassDialogVisible"
      title="重置密码"
      width="260"
    >
      <div style="text-align:center">
        <p>此操作将会把用户名为<span style="color:red"> {{ crud.selectUser }} </span>的密码重置为其<strong
          style="color: green"
        >用户名</strong>，是否继续重置？
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="crud.resetPassDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">重 置</el-button>
      </span>
    </el-dialog>
    <!-- 表格渲染 -->
    <el-table
      ref="table"
      v-loading="crud.loading"
      border
      :data="crud.data"
      style="width: 100%;margin-top: 12px;"
      @selection-change="selectionChangeHandler"
    >
      <el-table-column :selectable="checkboxT" type="selection" align="center" width="55" />
      <el-table-column :show-overflow-tooltip="true" prop="username" align="center" label="用户名" />
      <el-table-column :show-overflow-tooltip="true" prop="realname" align="center" label="真实姓名" />
      <el-table-column :show-overflow-tooltip="true" prop="roleName" align="center" width="140" label="所属角色" />
    </el-table>
    <!--分页组件-->
    <pagination
      v-show="crud.total>0"
      class="pageination"
      :total="crud.total"
      :page.sync="crud.listQuery.current"
      :limit.sync="crud.listQuery.pageSize"
      @pagination="getUserList()"
    />
  </div>
</template>

<script>
import { getUserList } from '@/api/system/user'
import pagination from '@/components/Pagination'
export default {
  name: 'User',
  components: { pagination },
  data() {
    return {
      crud: {
        loading: false,
        refreshLoading: false,
        resetPassLoading: false,
        data: [],
        selections: [],
        listQuery: {
          current: 1,
          pageSize: 10
        },
        total: 0,
        resetPassDialogVisible: false,
        selectUser: []
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 选择改变
    selectionChangeHandler(val) {
      this.crud.selections = val
      this.crud.selectUser = []
      val.forEach(item => {
        this.crud.selectUser.push(item.realname)
      })
    },
    checkboxT(row, rowIndex) {
      return row.id
    },
    getUserList() {
      this.crud.loading = true
      getUserList(this.crud.listQuery).then(res => {
        this.crud.data = res.value
        this.crud.total = res.page.total
        this.crud.loading = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '获取用户列表失败'
        })
        this.crud.loading = false
      })
    },
    refresh() {
      this.crud.refreshLoading = true
      this.$nextTick(() => {
        this.getUserList()
      })
      this.crud.refreshLoading = false
    },
    resetPass() {

    }
  }
}
</script>

<style scoped>
  .crud-opts {
    margin: -8px 0 0 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .pageination {
    margin-top: -24px;
  }
</style>
