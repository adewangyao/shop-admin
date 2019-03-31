<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
    <button v-on:click="getContent">查看内容</button>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {
    getContent: function () {
      console.log(this.editorContent)
    }
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.customConfig.uploadImgServer = 'http://localhost:8888/api/private/v1/upload'
    editor.customConfig.uploadImgHeaders = {
    'Authorization': window.localStorage.getItem('token')
    }
    editor.customConfig.uploadFileName = 'file'
    editor.create()
  }
}
</script>

<style scoped>
</style>
