<template>
  <div class="app-container">
    <!--工具栏-->
    <!--表格渲染-->
    <el-table
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%;"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column prop="titile" align="center" label="标题" />
      <el-table-column :show-overflow-tooltip="true" align="center" prop="summary" label="摘要" />
      <el-table-column prop="newsTName" label="新闻类型" align="center" />
      <el-table-column prop="author" label="作者" align="center" />
      <el-table-column :show-overflow-tooltip="true" align="center" prop="imageUrl" label="缩略图">
        <template slot-scope="{row}">
          <el-image
            :src="parseUrl(row.imageUrl)"
            :preview-src-list="[parseUrl(row.imageUrl)]"
            fit="contain"
            lazy
            class="el-avatar"
          />
        </template>
      </el-table-column>
      <el-table-column width="135" prop="publishdate" align="center" label="发布日期" />
      <el-table-column prop="reviewstatusStr" align="center" label="审核状态" />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button slot="reference" type="text" size="mini" @click="handleClick(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单渲染 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="verifyDialog"
      title="审核新闻"
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
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import Long from 'long'
import { mapGetters } from 'vuex'
import { reviewNews } from '@/api/verify/verifyNews'
import CRUD, { presenter, header, crud } from '@crud/crud'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ requestType: 'post', url: 'news/getNewsUnReview' })
export default {
  name: 'NewsVerify',
  components: { pagination },
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'baseApi'
    ])
  },
  created() {

  },
  methods: {
    parseUrl(imgUrl) {
      return this.baseApi + imgUrl
    },
    handleClick(row) {
      this.selectRowId = (Long.fromValue(row.id)).toString()
      this.verifyDialog = true
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
          reviewNews(this.selectRowId, this.form).then(res => {
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

</style>
