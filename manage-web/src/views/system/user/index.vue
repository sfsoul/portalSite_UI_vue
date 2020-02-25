<template>
  <div class="app-container">
    <!-- crud 操作工具-->
    <div class="crud-opts">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="toAdd"
      >
        新增
      </el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-edit"
        :disabled="crud.selections.length !== 1"
        @click="toEdit(crud.selections[0])"
      >
        修改
      </el-button>
      <el-button
        slot="reference"
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        :loading="crud.delAllLoading"
        :disabled="crud.selections.length === 0"
        @click="toDeleteAll(crud.selections)"
      >
        删除
      </el-button>
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
    </div>
    <!--表单渲染-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="crud.dialogFormVisible"
      :title="crud.textMap[crud.dialogStatus]"
      width="420px"
    >
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="110px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model.number="form.realname" />
        </el-form-item>
        <el-form-item v-if="crud.dialogStatus==='create'" label="密码" prop="passwd">
          <el-input v-model="form.passwd" type="password" />
        </el-form-item>
        <el-form-item v-if="crud.dialogStatus==='update'" label="角色" prop="roleid">
          <el-select
            v-model="form.roleid"
            filterable
            style="width: 180px;"
            placeholder="请选择"
            @visible-change="getRoleList"
            @change="changeRole"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.descr"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancelCU">取消</el-button>
        <el-button :loading="crud.submitLoading" type="primary" @click="crud.dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
    <!-- 表格渲染 -->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%;margin-top: 12px;"
      @selection-change="selectionChangeHandler"
    >
      <el-table-column :selectable="checkboxT" type="selection" align="center" width="55" />
      <el-table-column :show-overflow-tooltip="true" prop="username" align="center" label="用户名" />
      <el-table-column :show-overflow-tooltip="true" prop="realname" align="center" label="真实姓名" />
      <el-table-column :show-overflow-tooltip="true" prop="roleName" align="center" width="100" label="所属角色" />
      <el-table-column
        label="操作"
        width="125"
        align="center"
      >
        <template slot-scope="{row}">
          <div>
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="toEdit(row)" />
            <el-popover v-model="row.popVisible" placement="top" width="180" trigger="manual" @show="onPopoverShow" @hide="onPopoverHide">
              <p>{{ msg }}</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="doCancel(row)">取消</el-button>
                <el-button type="primary" size="mini" @click="doDelete(row)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="toDelete(row)" />
            </el-popover>
          </div>
        </template>
      </el-table-column>
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
import { getUserList, adduser, updateuser } from '@/api/system/user'
import { getRoleList } from '@/api/system/role'
import pagination from '@/components/Pagination'
export default {
  name: 'User',
  components: { pagination },
  props: {
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    }
  },
  data() {
    return {
      crud: {
        loading: false,
        delAllLoading: false,
        refreshLoading: false,
        submitLoading: false,
        data: [],
        selections: [],
        listQuery: {
          current: 1,
          pageSize: 10
        },
        total: 0,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改用户',
          create: '新增用户'
        }
      },
      form: {
        id: undefined,
        username: null,
        realname: null,
        passwd: null,
        roleid: null
      },
      roles: [],
      pop: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入用户真实姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        roleid: [
          { required: true, message: '请选择所属角色', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
    this.getUserList()
  },
  methods: {
    // 选择改变
    selectionChangeHandler(val) {
      this.crud.selections = val
    },
    checkboxT(row, rowIndex) {
      return row.id
    },
    getUserList() {
      this.crud.loading = true
      getUserList(this.crud.listQuery).then(res => {
        this.crud.data = res.value.map(v => {
          this.$set(v, 'popVisible', false)
          return v
        })
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
    getRoleList() {
      getRoleList(this.crud.listQuery).then(res => {
        this.roles = res.value
      })
    },
    changeRole(row) {
      this.form.roleid = row
    },
    toAdd() {
      this.resetForm()
      this.crud.dialogStatus = 'create'
      this.crud.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    toEdit(row) {
      this.form = Object.assign({}, row)
      this.crud.dialogStatus = 'update'
      this.crud.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    toDeleteAll() {

    },
    refresh() {
      this.crud.refreshLoading = true
      this.$nextTick(() => {
        this.getUserList()
      })
      this.crud.refreshLoading = false
    },
    cancelCU() {
      this.crud.dialogFormVisible = false
    },
    resetForm() {
      this.form = {
        id: undefined,
        username: null,
        realname: null,
        passwd: null,
        roleid: null
      }
    },
    createData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.crud.submitLoading = true
          adduser(this.form).then(() => {
            this.$message({
              message: '新增用户成功',
              type: 'success',
              duration: 2000
            })
            this.crud.submitLoading = false
            this.crud.dialogFormVisible = false
            this.getUserList()
          }).catch(() => {
            this.crud.submitLoading = false
            this.$message({
              message: '新增用户失败',
              type: 'error',
              duration: 2000
            })
            this.crud.dialogFormVisible = false
          })
        }
      })
    },
    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.crud.submitLoading = true
          updateuser(this.form).then(() => {
            this.$message({
              message: '修改用户成功',
              type: 'success',
              duration: 2000
            })
            this.crud.submitLoading = false
            this.crud.dialogFormVisible = false
            this.getUserList()
          }).catch(() => {
            this.crud.submitLoading = false
            this.$message({
              message: '修改用户失败',
              type: 'error',
              duration: 2000
            })
            this.crud.dialogFormVisible = false
          })
        }
      })
    },
    doCancel(row) {
      row.popVisible = false
    },
    toDelete(row) {
      row.popVisible = true
    },
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick)
      }, 0)
    },
    onPopoverHide() {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick(event) {
      this.pop = false
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
