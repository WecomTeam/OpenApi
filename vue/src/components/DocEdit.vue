<template>
  <div class="editor">
        <yaml-editor :yaml="yaml" @input="(yaml) => onSave(yaml, true)"></yaml-editor>
        
  </div>
</template>
  
<script>
import YamlEditor from './YamlEditor/index.vue'
import axios from 'axios'

export default {
  name: 'DocEdit',
  components: {
    YamlEditor
  },
  props: ['apiYaml', 'currentCheck', 'operationid'],
  watch: {
    apiYaml: {
      handler(val) {
        this.yaml = val
        this.is_mark = this.currentCheck
      },
      deep: true
    }
  },
  data() {
    return {
      yaml: this.apiYaml,
      is_mark: this.currentCheck,
    }
  },
  methods: {
    onSave(yaml, isSilent = false) {
      this.$emit('save', {
        yaml: yaml,
        isSilent
      })
    },
    async onMark() {
      this.is_mark = !this.is_mark
      try {
        await axios.post('api/interface/mark', {
          is_check: this.is_mark,
          operationid: this.operationid
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
  
  height: 100%;  
}
</style>
  