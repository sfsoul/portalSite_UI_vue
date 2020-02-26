<template>
  <div class="crud-opts">
    <el-button
      v-if="permission.add"
      class="filter-item"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="crud.toAdd"
    >
      新增
    </el-button>
    <el-button
      v-if="permission.edit"
      class="filter-item"
      size="mini"
      type="success"
      icon="el-icon-edit"
      :disabled="crud.selections.length !== 1"
      @click="crud.toEdit(crud.selections[0])"
    >
      修改
    </el-button>
    <el-button
      v-if="permission.del"
      slot="reference"
      class="filter-item"
      type="danger"
      icon="el-icon-delete"
      size="mini"
      :loading="crud.delAllLoading"
      :disabled="crud.selections.length === 0"
      @click="toDelete(crud.selections)"
    >
      删除
    </el-button>
    <el-button
      v-if="permission.refresh"
      :disabled="!crud.data.length"
      class="filter-item"
      size="mini"
      type="warning"
      icon="el-icon-refresh"
      @click="crud.refresh()"
    >
      刷新
    </el-button>
  </div>
</template>
<script>
import { crud } from '@crud/crud'
export default {
  mixins: [crud()],
  props: {
    permission: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    toDelete(datas) {
      this.$confirm(`确认删除选中的${datas.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.crud.delAllLoading = true
        this.crud.doDelete(datas)
      }).catch(() => {
      })
    }
  }
}
</script>

<style>
  .crud-opts {
    margin: -8px 0 0 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .crud-opts .crud-opts-right {
    margin-left: auto;
  }
</style>
