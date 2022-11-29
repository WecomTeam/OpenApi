<template>
  <div class="editor">
        <yaml-editor v-model="schema" @input="() => onSave(true)"></yaml-editor>
        <div class="editor-action">
          <t-button class="mark__wrapper" @click="onMark" :theme="is_mark ? 'default' : 'primary'">{{is_mark ? '取消标记' : '标记确认'}}</t-button>
        </div>
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
  props: ['apiSchema', 'currentCheck'],
  watch: {
    apiSchema: {
      handler(val) {
        this.schema = val
        this.is_mark = this.currentCheck
        this.onSave()
      },
      deep: true
    }
  },
  data() {
    return {
      schema: this.apiSchema,
      is_mark: this.defaultValue,
    }
  },
  methods: {
    onSave(isSilent = false) {
      this.$emit('save', {
        schema: this.schema,
        isSilent
      })
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
  