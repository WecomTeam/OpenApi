<template>
    <div class="editor__wrapper">
      <JsonEditor
          v-model="editSchema"
          :expanded-on-start="true"
          :show-btns="true"
          @json-save="onSave"
      />
    </div>
  </template>
  
  <script>
  import JsonEditor from 'vue-json-editor';
  export default {
    name: 'DocEdit',
    components: {
      JsonEditor
    },
    props:['apiSchema'],
    watch:{
      apiSchema(){
        this.editSchema = Object.assign(this.apiSchema)
      }
    },
    data() {
      return {     
        editSchema : {}
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  
  </style>
  