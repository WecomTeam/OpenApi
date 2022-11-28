<template>
  <div class="editor">
        <JsonEditorVue class="editor-box jse-theme-dark" v-model="schema" 
        :navigationBar="false"
        :main-menu-bar="false" 
        :status-bar="false" 
        indentation=" " 
        tab-size="4" 
        mode="text" />
        <div class="editor-action">
          <t-button class="mark__wrapper" @click="onMark" :theme="is_mark ? 'default' : 'primary'">{{is_mark ? '取消标记' : '标记确认'}}</t-button>
          <t-button @click="onSave">保存</t-button>
        </div>
  </div>
</template>
  
<script>
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'
import JsonEditorVue from 'json-editor-vue'
import axios from 'axios'

export default {
  name: 'DocEdit',
  components: {

    JsonEditorVue
  },
  props: ['apiSchema', 'defaultValue'],
  watch: {
    apiSchema: {
      handler(val) {
        this.schema = val
      },
      deep: true
    }
  },
  data() {
    return {
      schema: this.apiSchema,
      is_mark: this.defaultValue
    }
  },
  methods: {
    onSave() {
      this.$emit('save', this.schema)
    },
    async onMark() {
      this.is_mark = !this.is_mark
      try {
        await axios.post('api/interface/mark', {
          is_check: this.is_mark,
          operationid: this.schema.operationid
        })
      } catch (e) {
        this.$message.error('接口调用失败')
        this.is_mark = !this.is_mark
      }finally {
        this.$emit('mark', this.is_mark)
      }
    }
  }
}
</script>
  
<style lang="less" scoped>

@import url(../style/jsoneditorvue-darkmode.css);
.editor {
  display: flex;
  flex-direction: column;
  height:100%;
}
.editor-box{
  flex:1;
  height: 1px;
  overflow-y: auto;
}
.editor-action{
  background:     var(--td-gray-color-12);
  padding:10px;
  display: flex;
  justify-content: flex-end;
  border-left:1px solid #4f4f4f;
  text-align: right;  
}
.mark__wrapper {
  margin-right: 10px;
}
</style>
  