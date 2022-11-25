<template>
  <div class="editor__wrapper">
    <!-- <JsonEditor
          v-model="schema"
          mode="code"
          :expanded-on-start="true"
          :show-btns="true"
          @json-save="onSave"
          :main-menu-bar="false"          
          :mainMenuBar="false"
          :navigation-bar="false"
          :status-bar="false"
          tabSize="4"
      /> -->
      
        <JsonEditorVue class="jse-theme-dark" v-model="schema" :main-menu-bar="true" indentation=" " tabSize="4" mode="code" />
      
    
  </div>
</template>
  
<script>

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
      schema: this.apiSchema
    }
  },
  methods: {
    onSave() {
      this.$emit('save', this.schema)
    }
  }
}
</script>
  
<style lang="less" scoped>
.editor__wrapper {
  height: calc(100vh - 113px);

  &>div {
    height: 100%;
  }
}

/deep/.jsoneditor-vue {
  height: calc(100% - 50px);
}
</style>
  