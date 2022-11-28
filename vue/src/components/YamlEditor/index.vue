<template>
  <div class="yaml-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/yaml-lint'
import {throttle} from 'lodash-es'
window.jsyaml = require('js-yaml') // 引入js-yaml为codemirror提高语法检查核心支持

export default {
    model: {
        prop: 'schema',
        event: 'input'
    },
  name: 'YamlEditor',
  props: ['schema'],
  data() {
    return {
      yamlEditor: false,
      value: window.jsyaml.dump(this.schema)
    }
  },
  watch: {
    schema(schema) {
      const value = window.jsyaml.dump(schema)
      const editorValue = this.getValue()
      if (value !== editorValue) {
        // this.yamlEditor.setValue(value)
      }
    }
  },
  mounted() {
    this.yamlEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true, // 显示行号
      mode: 'text/x-yaml', // 语法model
      gutters: ['CodeMirror-lint-markers'],  // 语法检查器
      theme: 'monokai', // 编辑器主题
      lint: true // 开启语法检查
    })

    this.yamlEditor.setValue(this.value)
    const throttledFunc = throttle((cm) => {
        const currentValue = cm.getValue()
        this.$emit('changed', window.jsyaml.load(currentValue))
        this.$emit('input', window.jsyaml.load(currentValue))
    })
    this.yamlEditor.on('change', throttledFunc)
  },
  methods: {
    getValue() {
      return this.yamlEditor.getValue()
    }
  }
}
</script>

<style scoped>
.yaml-editor{
  height: 100%;
  position: relative;
  overflow: auto;
}
.yaml-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.yaml-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.yaml-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>