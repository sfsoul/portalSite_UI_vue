<template>
  <div class="app-container">
    <!--工具栏-->
    <crudOperation />
    <!--表格渲染-->
    <el-table
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%;margin-top: 12px;"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="content" label="评论内容" align="center" />
      <el-table-column prop="ip" label="评论IP" align="center" />
      <el-table-column prop="author" label="作者" align="center" />
      <el-table-column width="135" prop="publishtime" align="center" label="评论时间" />
      <el-table-column prop="reviewstatusStr" align="center" label="审核状态" />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button slot="reference" type="warning" size="mini" @click="handleClick(scope.row)">审核</el-button>
          <el-button slot="reference" type="primary" size="mini" @click="handleClickDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单渲染 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="verifyDialog"
      title="审核评论"
      width="420px"
      @close="cancelCU"
    >
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="110px">
        <el-form-item label="审核意见" prop="reviewComment">
          <el-input v-model="form.reviewComment" style="width: 185px;" rows="2" type="textarea" />
        </el-form-item>
        <el-form-item label="是否通过" prop="reviewstatus">
          <el-radio-group v-model="form.reviewstatus" @change="changeRadio">
            <el-radio :label="1" style="margin-left: 23px;">通过</el-radio>
            <el-radio :label="0" style="margin-left: -12px;">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancelCU">取消</el-button>
        <el-button :loading="verifyLoading" type="primary" @click="verifySubmit">确认</el-button>
      </div>
    </el-dialog>
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
import { mapGetters } from 'vuex'
import { reviewComment, getVerifyDetail } from '@/api/verify/verifyComment'
import crudComment from '@/api/verify/verifyComment'
import CRUD, { presenter, header, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ requestType: 'post', url: 'comment/getNoPassComments', crudMethod: { ...crudComment }})
export default {
  name: 'NewsVerify',
  components: { crudOperation, pagination },
  mixins: [presenter(defaultCrud), header(), crud()],
  data() {
    return {
      verifyDialog: false,
      verifyLoading: false,
      form: {
        reviewComment: null,
        reviewstatus: 1
      },
      selectRowId: undefined,
      rules: {
        reviewComment: [
          { required: true, message: '请输入审核意见', trigger: 'blur' }
        ]
      },
      showdetail: false,
      detail: {},
      detailsList: {}
    }
  },
  computed: {
    ...mapGetters([
      'baseApi'
    ])
  },
  created() {
    this.crud.optShow.add = false
    this.crud.optShow.edit = false
  },
  methods: {
    handleClick(row) {
      this.selectRowId = (Long.fromValue(row.id)).toString()
      this.verifyDialog = true
    },
    handleClickDetail(row) {
      this.detail = row
      this.showdetail = true
      this.detailsList = {}
      getVerifyDetail(row.id).then(res => {
        this.detailsList = res
      })
    },
    resetForm() {
      this.form = {
        reviewComment: null,
        reviewstatus: 1
      }
    },
    cancelCU() {
      this.resetForm()
      this.verifyDialog = false
    },
    changeRadio(val) {
      this.form.reviewstatus = val
    },
    verifySubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.verifyLoading = true
          reviewComment(this.selectRowId, this.form).then(res => {
            this.verifyLoading = false
            this.verifyDialog = false
            this.crud.refresh()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }
</style>
