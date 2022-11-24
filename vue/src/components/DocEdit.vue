<template>
    <div class="editor__wrapper">
      <JsonEditor
          v-model="schema"
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
  