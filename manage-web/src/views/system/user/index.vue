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
        <el-button type="primary" @click="resetPass">重 置</el-button>
      </span>
    </el-dialog>
    <el-row :gutter="15" style="margin-top: 12px;">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">用户列表</span>
          </div>
          <el-table
            ref="table"
            v-loading="crud.loading"
            :data="crud.data"
            style="width: 100%;margin-top: 12px;"
            @selection-change="selectionChangeHandler"
            @current-change="handleCurrentChange"
          >
            <el-table-column :selectable="checkboxT" type="selection" align="center" width="55" />
            <el-table-column :show-overflow-tooltip="true" prop="username" align="center" label="用户名" />
            <el-table-column :show-overflow-tooltip="true" prop="realname" align="center" label="真实姓名" />
          </el-table>
        </el-card>
      </el-col>
      <!-- 角色授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" content="选择指定用户分配角色" placement="top">
              <span class="role-span">角色分配</span>
            </el-tooltip>
            <el-button
              :disabled="showButton"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 5px 8px"
              type="primary"
              @click="openUnRole"
            >
              授权
            </el-button>
            <el-button
              :disabled="showFobbidenButton"
              :loading="roleLoading"
              icon="el-icon-close"
              size="mini"
              style="float: right;padding: 5px 8px;margin-right: 8px;"
              type="danger"
              @click="unBindSubmit"
            >
              禁权
            </el-button>
          </div>
          <el-checkbox-group v-model="checkList" @change="changeChecked">
            <el-checkbox
              v-for="item in roles"
              :key="item.id"
              :value="item.id"
              :label="item.id"
              style="display: block;padding: 2px 0 2px 0"
            >{{ item.descr }}</el-checkbox>
          </el-checkbox-group>
        </el-card>
      </el-col>
    </el-row>
    <!-- dialog -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="unroleDialog"
      :title=title
      width="420px"
    >
      <el-checkbox-group v-model="unCheckList" @change="changeUnChecked" v-if="unroles.length !== 0">
        <el-checkbox
          v-for="item in unroles"
          :key="item.id"
          :value="item.id"
          :label="item.id"
          style="display: block;padding: 2px 0 2px 0;margin-left: 24px;"
        >{{ item.descr }}</el-checkbox>
      </el-checkbox-group>
      <div v-else style="text-align: center">您已拥有所有角色,无需添加</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="unroleDialog = false">取消</el-button>
        <el-button :loading="bindLoading" type="primary" @click="bindSubmit" v-if="unroles.length !== 0">确认</el-button>
      </div>
    </el-dialog>
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
import { getUserList, getUserRoles, bindUserRole, getUserUnRoles, unBindUserRole } from '@/api/system/user'
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
      },
      roleLoading: false,
      showButton: true,
      showFobbidenButton: true,
      roles: [],
      unroles: [],
      checkList: [],
      unCheckList: [],
      currentUserid: 0,
      selectRoleid: null,
      unseclectid: null,
      unroleDialog: false,
      bindLoading: false,
      currentUserName: null,
      title: ''
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
    openUnRole() {
      this.title = this.currentUserName + '未有角色'
      this.unroleDialog = true
      this.getUserUnRoles()
    },
    // 触发单选
    handleCurrentChange(val) {
      this.unroles = []
      this.roles = []
      this.checkList = []
      this.showButton = false
      // 保存当前的用户id
      this.currentUserid = val.id
      this.currentUserName = val.realname
      this.getUserRoles()
    },
    getUserRoles() {
      getUserRoles(this.currentUserid).then(res => {
        this.roles = res
      })
    },
    getUserUnRoles() {
      getUserUnRoles(this.currentUserid).then(res => {
        this.unroles = res
      })
    },
    changeChecked(val) {
      this.checkList = val
      this.showFobbidenButton = false
      this.selectRoleid = this.checkList.join(',')
    },
    changeUnChecked(val) {
      this.unCheckList = val
      this.unseclectid = this.unCheckList.join(',')
    },
    unBindSubmit() {
      this.roleLoading = true
      unBindUserRole(this.currentUserid, this.selectRoleid).then(res => {
        this.roleLoading = false
        this.showFobbidenButton = true
        this.checkList = []
        this.getUserRoles()
      })
    },
    bindSubmit() {
      this.bindLoading = true
      bindUserRole(this.currentUserid, this.unseclectid).then(res => {
        this.bindLoading = false
        this.unroleDialog = false
        this.showFobbidenButton = true
        this.unCheckList = []
        this.getUserRoles()
      })
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
