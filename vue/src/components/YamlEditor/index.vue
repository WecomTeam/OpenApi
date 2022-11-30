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
import {debounce} from 'lodash-es'
window.jsyaml = require('js-yaml') // 引入js-yaml为codemirror提高语法检查核心支持

export default {
    model: {
        prop: 'yaml',
        event: 'input'
    },
  name: 'YamlEditor',
  props: ['yaml'],
  data() {
    return {
      yamlEditor: false,
      value: this.yaml
    }
  },
  watch: {
    yaml(yaml, pre) {
      if (yaml !== pre) {
        this.yamlEditor.setValue(yaml)
      }
    }
  },
  mounted() {
    this.yamlEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true, // 显示行号
      mode: 'text/x-yaml', // 语法model
      gutters: ['CodeMirror-lint-markers'],  // 语法检查器
      theme: 'monokai', // 编辑器主题
      lint: true, // 开启语法检查
      lineWrapping: true
    })

    this.yamlEditor.setValue(this.yaml)
    const throttledFunc = debounce((cm) => {
        const currentValue = cm.getValue()
        this.$emit('changed', currentValue)
        this.$emit('input', currentValue)
    }, 1000, {
      leading: false
    })
    this.yamlEditor.on('change', throttledFunc)
  },
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
  min-height: 100%;
}
.yaml-editor >>> .CodeMirror-scroll{
  min-height: 100%;
}
.yaml-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>