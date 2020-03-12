<template>
  <div class="el-dialog-div">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="90px">
      <el-form-item label="荣誉标题" prop="title">
        <el-input v-model="form.title" style="width: 30%;" />
      </el-form-item>
      <el-form-item label="表彰人" prop="pepole">
        <el-autocomplete
          v-model="form.pepole"
          style="width: 15%;"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入表彰人名字"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item label="荣誉简介" prop="honortitle">
        <el-input
          v-model="form.honortitle"
          style="width: 60%;"
          type="textarea"
          placeholder="请输入荣誉简介"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="表彰内容" prop="contentStr">
        <Editor v-model="form.contentStr" :is-clear="isClear" @change="getEditorContent" />
      </el-form-item>
      <el-form-item label="表彰图片" prop="imageid">
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
      <el-form-item size="medium" style="text-align: left;margin-bottom: 45px;">
        <el-button @click="$router.push('/publish/honor')">返回</el-button>
        <el-button :loading="submitLoading" type="primary" @click="isEdit===false?createData():updateData()">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Long from 'long'
import { fileUpload, fileDelete } from '@/api/file'
import crudHonourPublish from '@/api/publish/honourPublish'
import { isExistTitle, getHonourContent } from '@/api/publish/honourPublish'
import { getUserList } from '@/api/system/user'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import CRUD, { presenter, header, crud } from '@crud/crud'
import Editor from '@/views/components/Editor'

// crud交由presenter持有
const defaultCrud = CRUD({ requestType: 'post', url: 'honour/getHonours', crudMethod: { ...crudHonourPublish }})
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
        pepole: null,
        honortitle: null,
        title: null,
        contentStr: null,
        imageid: 0,
        annexes: []
      },
      submitLoading: false,
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
        pepole: [
          { required: true, message: '请输入表彰人名字', trigger: ['blur', 'change'] }
        ],
        honortitle: [
          { required: true, message: '请输入荣誉简介', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      pictureResult: {},
      fileList: [],
      pictureList: [],
      isClear: false,
      userList: [],
      timeout: null
    }
  },
  computed: {
    ...mapGetters([
      'baseApi',
      'imagesUploadApi'
    ])
  },
  created() {
    this.getUserList()
    if (this.isEdit) {
      const row = this.$route.query.row
      this.getHonourContent(row)
      this.handleUpdate(row)
    }
  },
  methods: {
    handleUpdate(row) {
      this.form.id = (Long.fromValue(row.id)).toString()
      this.form.title = row.title
      this.form.pepole = row.pepole
      this.form.honortitle = row.honortitle
      this.form.imageid = (Long.fromValue(row.imageid)).toString()
      this.form.annexes = row.annexes
      // const imageUrl = this.baseApi + row.imageUrl
      /* this.pictureList.push({
        'url': imageUrl
      })*/
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    getHonourContent(row) {
      getHonourContent((Long.fromValue(row.id)).toString()).then(res => {
        this.form.contentStr = res.contentStr
      })
    },
    getEditorContent(data) {
      this.form.contentStr = data
    },
    resetForm() {
      this.form = {
        id: null,
        pepole: null,
        honortitle: null,
        title: null,
        contentStr: null,
        imageid: 0,
        annexes: []
      }
    },
    querySearchAsync(queryString, cb) {
      const userList = this.userList
      const results = queryString ? userList.filter(this.createStateFilter(queryString)) : userList
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 600 * Math.random())
    },
    createStateFilter(queryString) {
      return (houseNumber) => {
        return (houseNumber.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect(val) {
      this.form.pepole = val.value
    },
    getUserList() {
      const params = { current: 0, pageSize: 10 }
      getUserList(params).then(res => {
        this.userList = []
        for (let i = 0; i < res.value.length; i++) {
          this.userList.push({ 'value': res.value[i].realname })
        }
        return this.userList
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
                message: '荣誉标题已经存在,请更换后再试'
              })
              this.submitLoading = false
              return false
            } else if (!this.form.contentStr) {
              this.$message({
                message: '荣誉内容不能为空',
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
                this.$router.push('/publish/honor')
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
                message: '荣誉标题已经存在,请更换后再试'
              })
              this.submitLoading = false
              return false
            } else if (!this.form.contentStr) {
              this.$message({
                message: '荣誉内容不能为空',
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
                this.$router.push('/publish/honor')
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
