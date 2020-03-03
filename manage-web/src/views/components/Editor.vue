<template>
  <div ref="editor" class="text" />
</template>

<script>
import { fileUpload } from '@/api/file'
import { mapGetters } from 'vuex'
import E from 'wangeditor'
export default {
  name: 'Editor',
  data() {
    return {
      editorContent:
        `
        <ul>
          <li>请输入新闻内容：</li>
          <li>更多帮助请查看官方文档：<a style="color: #42b983" target="_blank" href="https://www.kancloud.cn/wangfupeng/wangeditor3/332599">wangEditor</a></li>
        </ul>`
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi',
      'baseApi'
    ])
  },
  mounted() {
    const _this = this
    var editor = new E(this.$refs.editor)
    // 自定义菜单配置
    editor.customConfig.zIndex = 10
    // 文件上传
    editor.customConfig.customUploadImg = function(files, insert) {
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
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
      this.$emit('editorContent', this.editorContent)
    }
    editor.create()
    // 初始化数据
    // editor.txt.html(this.editorContent)
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
