<template>
  <div class="app-container">
    <!-- crud 操作工具-->
    <div class="crud-opts">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
      >
        新增
      </el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-edit"
      >
        修改
      </el-button>
      <el-button
        slot="reference"
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        size="mini"
      >
        删除
      </el-button>
    </div>
    <!-- 表格渲染 -->

  </div>
</template>

<script>
export default {
  name: 'User',
  method: {

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
</style>
