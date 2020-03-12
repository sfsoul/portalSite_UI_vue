<template>
  <div class="el-dialog-div">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="90px">
      <el-form-item label="通告标题" prop="title">
        <el-input v-model="form.title" style="width: 30%;" />
      </el-form-item>
      <el-form-item label="通告类型" prop="ntid">
        <el-select
          v-model="form.ntid"
          style="width: 15%;"
          filter
          placeholder="请选择"
          @change="changeNewsType"
        >
          <el-option
            v-for="item in noticesTypeOptions"
            :key="item.ntid"
            :label="item.noticeTName"
            :value="item.ntid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="通告内容" prop="contentStr">
        <Editor v-model="form.contentStr" :is-clear="isClear" @change="getEditorContent" />
      </el-form-item>
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
      <el-form-item size="medium" style="text-align: left;margin-bottom: 45px;">
        <el-button @click="$router.push('/publish/notice')">返回</el-button>
        <el-button :loading="submitLoading" type="primary" @click="isEdit===false?createData():updateData()">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Long from 'long'
import { fileUpload, fileDelete } from '@/api/file'
import { getNoticesType } from '@/api/system/noticeType'
import crudNoticesPublish from '@/api/publish/noticesPublish'
import { isExistTitle, getNoticesContent } from '@/api/publish/noticesPublish'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import CRUD, { presenter, header, crud } from '@crud/crud'
import Editor from '@/views/components/Editor'

// crud交由presenter持有
const defaultCrud = CRUD({ requestType: 'post', url: 'news/getPublishNews', crudMethod: { ...crudNoticesPublish }})
export default {
  name: 'Pictures',
  components: { Editor },
  mixins: [presenter(defaultCrud), header(), crud()],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        id: null,
        title: null,
        ntid: null,
        contentStr: null,
        annexes: []
      },
      submitLoading: false,
      noticesTypeOptions: [],
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
          { required: true, message: '请选择通告类型', trigger: 'change' }
        ]
      },
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
    this.getNoticesType()
    if (this.isEdit) {
      const row = this.$route.query.row
      this.getNoticesContent(row)
      this.handleUpdate(row)
    }
  },
  methods: {
    handleUpdate(row) {
      this.getNoticesContent(row)
      this.form.id = (Long.fromValue(row.id)).toString()
      this.form.title = row.title
      this.form.ntid = row.ntid
      this.form.annexes = row.annexes
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    getNoticesContent(row) {
      getNoticesContent((Long.fromValue(row.id)).toString()).then(res => {
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
                message: '通告标题已经存在,请更换后再试'
              })
              this.submitLoading = false
              return false
            } else if (!this.form.contentStr) {
              this.$message({
                message: '通告内容不能为空',
                type: 'warning'
              })
              this.submitLoading = false
              return false
            } else {
              this.crud.crudMethod.add(JSON.stringify(this.form)).then(res => {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.submitLoading = false
                this.$router.push('/publish/notice')
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
                message: '通告标题已经存在,请更换后再试'
              })
              this.submitLoading = false
              return false
            } else if (!this.form.contentStr) {
              this.$message({
                message: '通告内容不能为空',
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
                this.$router.push('/publish/notice')
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
    getNoticesType() {
      getNoticesType(this.listQuery).then(res => {
        this.noticesTypeOptions = res.value
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
