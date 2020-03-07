<template>
  <div ref="editor" class="text" />
</template>

<script>
import { fileUpload } from '@/api/file'
import { mapGetters } from 'vuex'
import E from 'wangeditor'
export default {
  name: 'Editor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      info_: null
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi',
      'baseApi'
    ])
  },
  watch: {
    isClear(val) {
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor() {
      const _this = this
      this.editor = new E(this.$refs.editor)
      // 文件上传
      this.editor.customConfig.customUploadImg = function(files, insert) {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法
        files.forEach(image => {
          const formData = new FormData()
          formData.append('myfile', image)
          fileUpload(formData).then(data => {
            insert(_this.baseApi + data.path)
          })
        })
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()
    }
  }
}
</script>

<style scoped>
  .text {
    width: 100%;
    text-align: left;
  }

  /deep/ .w-e-text-container {
    height: 200px !important;
  }
</style>
