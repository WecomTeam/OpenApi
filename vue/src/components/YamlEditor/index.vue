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
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
// 搜索
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/comment-fold'

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
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],  // 语法检查器
      theme: 'monokai', // 编辑器主题
      lint: true, // 开启语法检查
      foldGutter: true,
      lineWrapping: true,
      matchBrackets: true,
      tabSize: 2,
      extraKeys: {
        Tab: (cm) => {
          // 存在文本选择
          if (cm.somethingSelected()) {
              // 正向缩进文本
              cm.indentSelection('add');
          } else {
              cm.replaceSelection(Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
          }
      },
        'Alt-Tab': 'autocomplete'
      },
      hintOptions: {
        completeSingle: false,
        hint: this.handleShowHint
      }
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
  methods: {
    concatDefine(line, typeOriginal) {
      const indent = '  '
      const typeMap = {
        'string': 1,
        'array': 2,
        'object': 3,
        'number': 4,
        'file': 5,
        'boolean': 6
      }
      const type = typeMap[typeOriginal]
      let tempText = line.replace(/^( *)/g, (match, p1) => {
        const baseStr = `${p1}- name: ''\n${p1}${indent}type: ${type}\n${p1}${indent}description: ''\n${p1}${indent}example: ''\n${p1}${indent}is_required: false\n${p1}${indent}default: ''`
        if(typeOriginal !== 'array' && typeOriginal !== 'object') {
          return baseStr
        } else {
          return baseStr + `\n${p1}${indent}items:\n${p1}${indent + indent}properties: []`
        }
      })

      return tempText
    },
    handleShowHint(cmInstance) {
      let cursor = cmInstance.getCursor();
      let cursorLine = cmInstance.getLine(cursor.line);
      let token = cmInstance.getTokenAt(cursor)

      return {
        list: [{
            text: this.concatDefine(cursorLine, 'string'),
            displayText: "字符串",
            displayInfo: "以字符串格式新增字段定义",
            render: this.hintRender
          }, {
            text: this.concatDefine(cursorLine, 'number'),
            displayText: "数值",
            displayInfo: "以数值格式新增字段定义",
            render: this.hintRender
          }, {
            text: this.concatDefine(cursorLine, 'boolean'),
            displayText: "布尔值",
            displayInfo: "以布尔值格式新增字段定义",
            render: this.hintRender
          }, {
            text: this.concatDefine(cursorLine, 'array'),
            displayText: "数组",
            displayInfo: "以数组格式新增字段定义",
            render: this.hintRender
          }, {
            text: this.concatDefine(cursorLine, 'object'),
            displayText: "对象",
            displayInfo: "以对象格式新增字段定义",
            render: this.hintRender
          }],
        from: {
          ch: 0, line: cursor.line
        },
        to: {
          ch: token.end, line: cursor.line
        }
      }
    },
    hintRender(element, self, data) {
      let div = document.createElement("div");
      div.setAttribute("class", "autocomplete-div");

      let divText = document.createElement("div");
      divText.setAttribute("class", "autocomplete-name");
      divText.innerText = data.displayText;

      let divInfo = document.createElement("div");
      divInfo.setAttribute("class", "autocomplete-hint");
      divInfo.innerText = data.displayInfo;

      div.appendChild(divText);
      div.appendChild(divInfo);
      element.appendChild(div);
    }
  },
}
</script>

<style scoped lang="less">
.yaml-editor{
  height:100%;
}
/deep/ .CodeMirror{
  height:100%;
  font-family: Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;
  font-size: 13px;  
}
/deep/ .CodeMirror-sizer{

}
/deep/ .CodeMirror-scroll{
  margin-bottom:0 !important;
  padding-bottom: 0 !important;
}
</style>