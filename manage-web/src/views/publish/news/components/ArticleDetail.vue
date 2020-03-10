<template>
  <div class="el-dialog-div">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
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
      <el-form-item label="新闻内容" prop="contentStr" style="z-index: -100">
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
      <el-button type="text">取消</el-button>
      <el-button :loading="submitLoading" type="primary">确认</el-button>
    </div>
  </div>
</template>

<script>
import Long from 'long'
import { fileUpload, fileDelete } from '@/api/file'
import { getNewsType } from '@/api/system/newsType'
import crudNewsPublish from '@/api/publish/newsPublish'
import { isExistTitle, getNewsContent } from '@/api/publish/newsPublish'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import CRUD, { presenter, header, crud } from '@crud/crud'
import Editor from '@/views/components/Editor'

// crud交由presenter持有
const defaultCrud = CRUD({ crudMethod: { ...crudNewsPublish }})
export default {
  name: 'Pictures',
  components: { Editor },
  mixins: [presenter(defaultCrud), header(), crud()],
  data() {
    return {
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
  },
  methods: {
    getNewsContent(row) {
      getNewsContent((Long.fromValue(row.id)).toString()).then(res => {
        this.form.contentStr = res.contentStr
      })
    },
    getEditorContent(data) {
      this.form.contentStr = data
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
                this.crud.refresh()
              }).catch(() => {
                this.submitLoading = false
              })
            }
          }).catch(() => {
            this.submitLoading = false
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
                this.crud.refresh()
              }).catch(() => {
                this.submitLoading = false
              })
            }
          }).catch(() => {
            this.submitLoading = false
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
    margin-top: 20px;
  }

  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }

</style>
