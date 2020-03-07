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
        @click="handleCreate"
      >发布
      </el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-edit"
        style="float:left;margin: -8px 10px 0 0;"
        :disabled="crud.selections.length !== 1"
        @click="handleUpdate(crud.selections[0])"
      >修改
      </el-button>
      <crudOperation style="float:left" />
    </div>
    <!--表单组件-->
    <el-dialog
      append-to-body
      :visible.sync="dialogFormVisible"
      :title="textMap[dialogStatus]"
      width="70%"
    >
      <div class="el-dialog-div">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px" @close="cancelCU">
          <el-form-item label="新闻标题" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="新闻类型" prop="ntid">
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
          <el-form-item label="新闻内容" prop="contentStr">
            <Editor v-model="form.contentStr" :is-clear="isClear" @change="getEditorContent" />
          </el-form-item>
          <el-form-item label="新闻图片" prop="imageid">
            <el-upload
              id="pictureUpload"
              v-model="form.imageid"
              :limit="1"
              :file-list="pictureList"
              :on-preview="handlePictureCardPreview"
              :http-request="httpRequest"
              :before-remove="handleBeforeRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :headers="headers"
              :action="imagesUploadApi"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-dialog append-to-body :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
          <el-form-item label="上传附件" prop="annexes">
            <el-upload
              ref="upload"
              v-model="form.annexes"
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
          <el-button type="text" @click="cancelCU">取消</el-button>
          <el-button :loading="submitLoading" type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
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
      <el-table-column :show-overflow-tooltip="true" align="center" prop="summary" label="概要" />
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
        label="审核详情"
      >
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="mini" @click="handleClick(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { fileUpload, fileDelete } from '@/api/file'
import { getNewsType } from '@/api/system/newsType'
import crudNewsPublish from '@/api/publish/newsPublish'
import { isExistTitle, getNewsDetail, getNewsContent } from '@/api/publish/newsPublish'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import CRUD, { presenter, header, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import Editor from '@/views/components/Editor'

// crud交由presenter持有
const defaultCrud = CRUD({ requestType: 'post', url: 'news/getPublishNews', crudMethod: { ...crudNewsPublish }})
export default {
  name: 'Pictures',
  components: { crudOperation, pagination, Editor },
  mixins: [presenter(defaultCrud), header(), crud()],
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改新闻',
        create: '发布新闻'
      },
      form: {
        id: null,
        title: null,
        ntid: null,
        contentStr: null,
        imageid: 0,
        annexes: []
      },
      submitLoading: false,
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
      fileList: [],
      pictureList: [],
      showdetail: false,
      detail: {},
      detailsList: {},
      isClear: false
    }
  },
  computed: {
    ...mapGetters([
      'baseApi',
      'imagesUploadApi'
    ])
  },
  created() {
    this.getNewsType()
    this.crud.optShow.add = false
    this.crud.optShow.edit = false
  },
  methods: {
    handleClick(row) {
      this.detail = row
      this.showdetail = true
      this.detailsList = {}
      getNewsDetail((Long.fromValue(row.id)).toString()).then(res => {
        this.detailsList = res
      })
    },
    getNewsContent(row) {
      getNewsContent((Long.fromValue(row.id)).toString()).then(res => {
        this.form.contentStr = res.contentStr
      })
    },
    getEditorContent(data) {
      this.form.contentStr = data
    },
    cancelCU() {
      this.dialogFormVisible = false
      this.isClear = true
      this.form.contentStr = ''
      this.pictureList = []
    },
    resetForm() {
      this.form = {
        id: null,
        title: null,
        ntid: null,
        contentStr: null,
        imageid: 0,
        annexes: []
      }
    },
    handleCreate() {
      this.resetForm()
      this.isClear = true
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.getNewsContent(row)
      this.form.id = (Long.fromValue(row.id)).toString()
      this.form.title = row.title
      this.form.ntid = row.ntid
      this.form.imageid = (Long.fromValue(row.imageid)).toString()
      this.form.annexes = row.annexes
      // const imageUrl = this.baseApi + row.imageUrl
      /* this.pictureList.push({
        'url': imageUrl
      })*/
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    createData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          isExistTitle(this.form.title).then(resp => {
            if (resp === true) {
              this.$message({
                type: 'error',
                message: '新闻标题已经存在,请更换后再试'
              })
              this.submitLoading = false
              return false
            } else if (!this.form.contentStr) {
              this.$message({
                message: '新闻内容不能为空',
                type: 'warning'
              })
              this.submitLoading = false
              return false
            } else {
              this.crud.crudMethod.add(JSON.stringify(this.form)).then(res => {
                console.log(res)
                this.submitLoading = false
                this.dialogFormVisible = false
                this.crud.refresh()
              }).catch(() => {
                this.submitLoading = false
                this.dialogFormVisible = false
              })
            }
          }).catch(() => {
            this.submitLoading = false
            this.dialogFormVisible = false
          })
        }
      })
    },
    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          isExistTitle(this.form.title).then(resp => {
            if (resp === true) {
              this.$message({
                type: 'error',
                message: '新闻标题已经存在,请更换后再试'
              })
              this.submitLoading = false
              return false
            } else if (!this.form.contentStr) {
              this.$message({
                message: '新闻内容不能为空',
                type: 'warning'
              })
              this.submitLoading = false
              return false
            } else {
              this.crud.crudMethod.edit(JSON.stringify(this.form)).then(res => {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                this.submitLoading = false
                this.dialogFormVisible = false
                this.crud.refresh()
              }).catch(() => {
                this.submitLoading = false
                this.dialogFormVisible = false
              })
            }
          }).catch(() => {
            this.submitLoading = false
            this.dialogFormVisible = false
          })
        }
      })
    },
    changeNewsType(val) {
      this.form.ntid = val
    },
    getNewsType() {
      getNewsType(this.listQuery).then(res => {
        this.newsTypeOptions = res.value
      })
    },
    parseUrl(imgUrl) {
      return this.baseApi + imgUrl
    },
    checkboxT(row, rowIndex) {
      return row
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.message({
        type: 'error',
        message: msg.message,
        duration: 2500
      })
    },
    // 图片上传
    httpRequest(options) {
      const pictureDom = document.getElementById('pictureUpload')
        .getElementsByClassName('el-upload--picture-card')[0]
      const formdata = new FormData()
      formdata.append('myfile', options.file)
      fileUpload(formdata).then(res => {
        this.pictureResult = res
        this.form.imageid = (Long.fromValue(res.fid)).toString()
      })
      pictureDom.style.display = 'none'
    },
    handleSuccess(response, file, fileList) {

    },
    handleBeforeRemove() {
      const pictureDom = document.getElementById('pictureUpload')
        .getElementsByClassName('el-upload--picture-card')[0]
      fileDelete(this.pictureResult).then(res => {
        this.form.imageid = 0
      })
      pictureDom.style.display = 'block'
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
        this.form.annexes.push({
          'fid': (Long.fromValue(res.fid)).toString()
        })
      })
    },
    handleBeforeRemoveFile(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].name === file.name) {
          fileDelete(this.fileList[i]).then(res => {
            this.form.annexes.some((item, index) => {
              if (item.fid === this.fileList[i].fid) {
                this.form.annexes.splice(index, 1)
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

  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }

</style>
