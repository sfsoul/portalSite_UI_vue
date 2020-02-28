<template>
  <div class="app-container">
    <!--工具栏-->
    <crudOperation :permission="permission" />
    <!-- 表单渲染 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="450px"
    >
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="110px">
        <el-form-item label="角色名称" prop="role">
          <el-input v-model="form.role" style="width: 185px;" />
        </el-form-item>
        <el-form-item label="描述信息" prop="descr">
          <el-input v-model="form.descr" style="width: 185px;" rows="2" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
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
              :disabled="showButton"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 5px 8px"
              type="primary"
              @click="openUnMenu"
            >
              授权
            </el-button>
            <el-button
              :disabled="showFobbidenButton"
              :loading="unmenuLoading"
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
              v-for="item in hasmenus"
              :key="item.id"
              :value="item.id"
              :label="item.id"
              style="display: block;padding: 2px 0 2px 0"
            >{{ item.modulename }}</el-checkbox>
          </el-checkbox-group>
        </el-card>
      </el-col>
    </el-row>
    <!-- 授权表单 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="menuDialog"
      title="添加菜单"
      width="420px"
      @close="cancelDialog"
    >
      <el-tree
        v-if="showTree"
        ref="menu"
        :props="defaultProps"
        :check-strictly="false"
        :check-descendants="true"
        :expand-on-click-node="true"
        :highlight-current="true"
        :load="loadNode"
        lazy
        accordion
        show-checkbox
        node-key="id"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancelDialog">取消</el-button>
        <el-button type="primary" :loading="menuLoading" @click="bindRoleMenu">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import crudRoles from '@/api/system/role'
import { getRoleUnEnableRootMoudles, getRoleUnEnableChildMoudles, getRoleEnableMoudles, bindRoleMoudle, unBindRoleMoudle } from '@/api/system/role'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ title: '角色', url: '/back/sysRole/lists', crudMethod: { ...crudRoles }})
const defaultForm = { role: null, descr: null }
export default {
  name: 'Role',
  components: { pagination, crudOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      permission: {
        add: true,
        edit: false,
        del: true,
        refresh: true
      },
      rules: {
        role: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        descr: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      menuLoading: false,
      unmenuLoading: false,
      showButton: true,
      showFobbidenButton: true,
      currentId: 0,
      menuDialog: false,
      rootNode: [],
      childNode: [],
      checkList: [],
      hasmenus: [],
      node: [],
      resolve: [],
      showTree: false
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

    },
    [CRUD.HOOK.afterEditError](crud) {

    },
    openUnMenu() {
      this.menuDialog = true
      this.showTree = true
      this.node.childNodes = []
      this.loadNode(this.node, this.resolve)
    },
    cancelDialog() {
      this.menuDialog = false
      this.$refs.menu.setCheckedNodes([])
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.rootNode = []
        this.node = node
        this.resolve = resolve
        getRoleUnEnableRootMoudles(this.currentId).then(res => {
          const data = res
          data.forEach(item => {
            if (item.haschild === 0) {
              this.rootNode.push({
                label: item.modulename,
                id: item.id
                // leaf: true
              })
            } else {
              this.rootNode.push({
                label: item.modulename,
                id: item.id
              })
            }
          })
          return resolve(this.rootNode)
        })
      } else if (node.level > 1) {
        return resolve([])
      } else if (node.level === 1) {
        this.getRoleUnEnableChildMoudles(node, resolve)
      }
    },
    getRoleUnEnableChildMoudles(node, resolve) {
      this.childNode = []
      getRoleUnEnableChildMoudles(this.currentId, node.data.id).then(res => {
        const data = res
        if (data.length > 0) {
          data.forEach(item => {
            this.childNode.push({
              label: item.modulename,
              id: item.id,
              leaf: true,
              parent: item.parent
            })
          })
          /* const tempChildNode = []
          this.childNode.map(item2 => {
            if (node.data.id === item2.parent) {
              tempChildNode.push(item2)
            }
          })*/
          resolve(this.childNode)
        } else {
          resolve([])
        }
      })
    },
    getRoleEnableMoudles() {
      getRoleEnableMoudles(this.currentId).then(res => {
        this.hasmenus = res
      })
    },
    // 触发单选
    handleCurrentChange(val) {
      if (val) {
        this.showButton = false
        this.currentId = val.id
        this.getRoleEnableMoudles()
      }
    },
    bindRoleMenu() {
      const checkedKeys = this.$refs.menu.getCheckedKeys()
      // 数组去重,若根模块无子模块,发送根模块Id,否则,只发送子模块Id
      const moduleParam = checkedKeys.filter(checkId => {
        return this.rootNode.every(parent => {
          return parent.id !== checkId
        })
      })
      console.log(moduleParam)
      if (checkedKeys.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一项'
        })
        return false
      }
      this.menuLoading = true
      bindRoleMoudle(this.currentId, moduleParam.join(',')).then(res => {
        this.menuLoading = false
        this.$refs.menu.setCheckedNodes([])
        this.menuDialog = false
        this.getRoleEnableMoudles()
      })
    },
    changeChecked(val) {
      this.checkList = val
      this.showFobbidenButton = false
      if (this.checkList.length === 0) {
        this.showFobbidenButton = true
      }
      this.selectRoleid = this.checkList.join(',')
    },
    unBindSubmit() {
      this.unmenuLoading = true
      unBindRoleMoudle(this.currentId, this.selectRoleid).then(res => {
        this.unmenuLoading = false
        this.showFobbidenButton = true
        this.checkList = []
        this.getRoleEnableMoudles()
      })
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
