<template>
  <div class="app-container">
    <!--工具栏-->
    <div>
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-upload"
        style="float:left;margin: -8px 10px 0 0;"
        @click="crud.toAdd"
      >发布
      </el-button>
      <crudOperation style="float:left" />
    </div>
    <!--表单组件-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="70%"
    >
      <div class="el-dialog-div">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
          <el-form-item label="通告标题" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="通告类型" prop="ntid">
            <el-select
              v-model="form.ntid"
              filter
              placeholder="请选择"
              @change="changeNewsType"
            >
              <el-option
                v-for="item in newsTypeOptions"
                :key="item.ntid"
                :label="item.newsTName"
                :value="item.ntid"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="通告内容" prop="contentStr">
            <Editor @editorContent="getEditorContent" />
          </el-form-item>
          <el-form-item label="上传附件" prop="annexes">
            <el-upload
              ref="upload"
              multiple
              :headers="headers"
              :http-request="httpRequestFile"
              :before-remove="handleBeforeRemoveFile"
              :on-success="handleSuccessFile"
              :on-error="handleErrorFile"
              :action="imagesUploadApi"
            >
              <div class="eladmin-upload"><i class="el-icon-upload" /> 添加文件</div>
              <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="float: right;">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </div>
    </el-dialog>
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
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import Long from 'long'
import { fileUpload, fileDelete } from '@/api/file'
import { getNewsType } from '@/api/system/newsType'
import crudNoticePublish from '@/api/publish/noticesPublish'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import Editor from '@/views/components/Editor'

// crud交由presenter持有
const defaultCrud = CRUD({ title: '通告', requestType: 'post', url: 'notice/getPublishNotices', crudMethod: { ...crudNoticePublish }})
const defaultForm = { title: null, ntid: null, contentStr: null, imageid: 0, annexes: [] }
export default {
  name: 'Pictures',
  components: { crudOperation, pagination, Editor },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      newsTypeOptions: [],
      listQuery: {
        current: 1,
        pageSize: 10
      },
      headers: {
        'Authorization': getToken()
      },
      pictures: [],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        ntid: [
          { required: true, message: '请选择新闻类型', trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      pictureResult: {},
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'baseApi',
      'imagesUploadApi'
    ])
  },
  created() {
    this.crud.optShow.add = false
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getNewsType()
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {

    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {
      if (!crud.form.contentStr) {
        this.$message({
          message: '新闻内容不能为空',
          type: 'warning'
        })
        return false
      }
      return true
    },
    getEditorContent(data) {
      this.crud.form.contentStr = data
    },
    changeNewsType(val) {

    },
    getNewsType() {
      getNewsType(this.listQuery).then(res => {
        this.newsTypeOptions = res.value
      })
    },
    checkboxT(row, rowIndex) {
      return row
    },
    // 文件上传
    httpRequestFile(options) {
      const formdata = new FormData()
      formdata.append('myfile', options.file)
      fileUpload(formdata).then(res => {
        this.fileList.push({
          'fid': (Long.fromValue(res.fid)).toString(),
          'name': res.name,
          'path': res.path
        })
        this.crud.form.annexes.push({
          'fid': (Long.fromValue(res.fid)).toString()
        })
      })
    },
    handleBeforeRemoveFile(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].name === file.name) {
          fileDelete(this.fileList[i]).then(res => {
            this.crud.form.annexes.some((item, index) => {
              if (item.fid === this.fileList[i].fid) {
                this.crud.form.annexes.splice(index, 1)
                return true
              }
            })
          })
          return true
        }
      }
    },
    handleSuccessFile(response, file, fileList) {
      this.crud.notify('上传成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      this.$refs.upload.clearFiles()
      this.crud.status.add = CRUD.STATUS.NORMAL
      this.crud.resetForm()
      this.crud.toQuery()
    },
    // 监听上传失败
    handleErrorFile(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dialog-div {
    height: 60vh;
    overflow: auto;
  }

</style>
