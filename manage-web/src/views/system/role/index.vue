<template>
  <div class="app-container">
    <!--工具栏-->
    <crudOperation />
    <!-- 表单渲染 -->
    <el-row :gutter="15" style="margin-top: 12px;">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">角色列表</span>
          </div>
          <el-table
            ref="table"
            v-loading="crud.loading"
            border
            highlight-current-row
            style="width: 100%;"
            :data="crud.data"
            @selection-change="crud.selectionChangeHandler"
            @current-change="handleCurrentChange"
          >
            <el-table-column :selectable="checkboxT" type="selection" align="center" width="55" />
            <el-table-column prop="role" align="center" label="名称" />
            <el-table-column :show-overflow-tooltip="true" align="center" prop="descr" label="描述" />
            <el-table-column label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <udOperation
                  :data="scope.row"
                />
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-card>
      </el-col>
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <el-button
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
            >保存</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crudRoles from '@/api/system/role'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ title: '角色', url: '/back/sysRole/lists', crudMethod: { ...crudRoles }})
const defaultForm = { id: null, name: null, remark: null }
export default {
  name: 'Role',
  components: { pagination, crudOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      defaultProps: { children: 'children', label: 'label' },
      currentId: 0, menuLoading: false, showButton: false,
      menus: [], menuIds: []
    }
  },
  created() {

  },
  methods: {
    [CRUD.HOOK.afterRefresh]() {

    },
    // 编辑前
    [CRUD.HOOK.beforeToEdit](crud, form) {

    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {

    },
    [CRUD.HOOK.afterAddError](crud) {
      this.afterErrorMethod(crud)
    },
    [CRUD.HOOK.afterEditError](crud) {
      this.afterErrorMethod(crud)
    },
    // 触发单选
    handleCurrentChange(val) {

    },
    checkboxT(row, rowIndex) {
      return row
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
