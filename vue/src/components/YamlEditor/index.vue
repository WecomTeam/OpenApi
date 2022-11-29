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
      value: this.addComment(window.jsyaml.dump(this.schema))
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
      return this.addComment(this.yamlEditor.getValue())
    },
    addComment(yaml) {
        let tempYaml = yaml
        tempYaml = tempYaml.replace('summary:', '# 接口中文名\nsummary:')
        tempYaml = tempYaml.replace('description:', '# 接口详细描述，将展示在接口文档顶部\ndescription:')
        tempYaml = tempYaml.replace('permission:', '# 表示权限说明，将会显示在接口的基本信息表格中\npermission:')
        tempYaml = tempYaml.replace('request:', '# 字段描述的基本类型(之后以baseType表示)：\n# - name: string\n#       example: string\n#       type: number 1(string)|2(array)|3(object)|4(number)|5(file)|6(boolean)\n#       description: 字段详细描述\n#       is_required: boolean true|false\n#       default: string\n# request类型：\n# auth 表示凭证参数\n# params 表示get请求的query参数\n# body 表示post请求的body参数\n# formData 表示附件上下传接口中的附件数据\nrequest:')
        tempYaml = tempYaml.replace(/( +)items:/g, '#$1如果items字段type为2|3时需要补充items的内容，当type为2时，只有第一个baseType生效，格式如下:\n#$1properties:\n#$1      baseType\n$1items:')
        tempYaml = tempYaml.replace('attention:', '# 注意事项，仅显示于接口的末尾\nattention:')
        tempYaml = tempYaml.replace('response:', '# 以baseType的格式补充到body下\n# - name: string\n#       example: string\n#       type: number 1(string)|2(array)|3(object)|4(number)|5(file)|6(boolean)\n#       description: 字段详细描述\n#       is_required: boolean true|false\n#       default: string\nresponse:')
        return tempYaml
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