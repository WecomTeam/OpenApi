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
          <t-button class="mark__wrapper" @click="onMark">{{isMark ? '标记' : '取消标记'}}</t-button>
          <t-button @click="onSave">保存</t-button>
        </div>
  </div>
</template>
  
<script>
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'
import JsonEditorVue from 'json-editor-vue'


export default {
  name: 'DocEdit',
  components: {

    JsonEditorVue
  },
  props: ['apiSchema'],
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
      isMark: false
    }
  },
  methods: {
    onSave() {
      this.$emit('save', this.schema)
    },
    onMark() {
      this.isMark = !this.isMark
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
  