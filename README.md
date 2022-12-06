# OpenApi
 
企业微信开放api编辑器

## 前置准备

本项目基于 NodeJS 以及 ExpressJS 架构，前端使用 VUE + TDesign ，请确保环境：

1. NodeJS V14.18+
2. 包管理器 yarn

## 启动流程

1. 安装依赖、构建项目

```bash
yarn build
```

2. 启动服务

```bash
yarn start
```

3. 访问页面

在浏览器打开 http://localhost:3000/ 进行访问

## 共建流程

### 1、 新建分支

- 通过 Github 新建分支，命名 `br_YOURID`

### 2、 完善接口信息

- 在浏览器编辑/预览界面，在左侧的目录树上选择对应的接口
- 点击 **接口文档** ，打开对照线上的接口文档，可作为对照和参考
- 在左侧编辑器编辑接口描述，接口描述采用 YAML 语法进行标记，可以参考 [接口标准](#接口标准)
- 新增接口参数时可以通过使用**Alt+Tab快捷键**的方式并选择字段的对应数据类型进行快速添加
- 在右侧的预览窗口，实时预览编辑的接口结果

### 3、 标记接口完成

- 接口完善后，点击 **标记** 按钮
- 确保目录树上的接口显示对勾 ✅

### 4、 提交 PR

- 提交 PR 需要填写修改的接口列表

## 接口标准

每一个接口的定义都由以下几个部分内容组成：

| 字段      | 说明 | 备注 |
| :----------- | :----------- | :----------- |
| 基本信息 | 包括接口名称、调用url、调用方式等接口纬度的内容 | 参考 [接口基本信息](#1基本信息) |
| request | 请求信息 | 具体参考 [request](#2请求信息-request) |
| response | 响应信息 | 具体参考 [response](#3响应信息-response) |

### 1、基本信息

| 字段      | 说明 | 备注 |
| :----------- | :----------- | :----------- |
| summary | 接口的名称 | 接口的名称不一定是对应文档的名称，一篇文档可能会有多个接口 |
| description | 接口的描述 | 在文档中显示在最前面的对于接口描述相关的内容信息，支持**markdown**语法，需注意换行要使用`<br>`表示|
| path | 接口调用路径| 须是 `https://` 开头的 URL，且需要去掉 `?accsstoken=xxx` 等其他 query 参数 |
| method | 接口调用类型| 仅 `GET`、`POST` 两个可选值，必须大写 |
| permission | 权限描述信息| 用于展示接口的一些权限内容，会展示在接口基本信息最后一列中 |
| attention | 额外的注意事项| 仅显示于接口的末尾，支持**markdown**语法，需注意换行要使用`<br>`表示 |
| operationid | 接口内部调用ID标记 | 无须更改 |
| tag | 接口内部调用模块 | 无须更改 |
| cate_path | 接口来源 | 无须更改 |

### 2、请求信息 `request`

request 由四部分内容组成，

| 字段      | 说明 | 备注 |
| :----------- | :----------- | :----------- |
| auth | 接口调用凭证信息 | 一般指access_token等字段 |
| params | 带在 URL 里的 `query` 参数 | `[schema]` 参考 [schema](#4字段基本定义-schema) 定义 <br />除开 `access_token` 之外的 `query` 参数 |
| body | 接口调用类型为 `POST` 时的调用参数| `[schema]`，参考 [schema](#4字段基本定义-schema) 定义 |
| formData | 表示附件上下传接口中的附件数据 | `[schema]`，参考 [schema](#4字段基本定义-schema) 定义 |

### 3、响应信息 `response`

| 字段      | 说明 | 备注 |
| :----------- | :----------- | :----------- |
| status | 接口返回状态码 | 因为企业微信的接口错误码统一管理，所以 `status` 固定为 200 |
| description | 接口返回描述 | 保留字段，无需修改 |
| body | 接口返回的实际信息 | `[schema]`，参考 [schema](#4接口基本定义-schema) 定义 |

### 4、接口数据字段的基本定义 `schema`

| 字段      | 说明 | 备注 |
| :----------- | :----------- | :----------- |
| name | 字段名 | 非必有，当外层type为2且当前层type为2或3时不存在 |
| type | 字段类型 | 值为number, 分别为 1(string) 2(array) 3(object) 4(number) 5(file) 6(boolean) |
| description | 字段描述 | 非必有，当外层type为2且当前层type为2或3时不存在 |
| is_required | 是否必填 |  |
| default | 默认值 | 保留字段，填`""`即可 |
| items | 当前层type为2或3时保留，描述用来描述内部数据 | 内部只有一个字段properties |
| example | 字段示例，用来生成代码示例 | 当前层type为2或者3时不需要填写 |

## schema示例
### 1、 string 类型字段的描述

对于一个用于展示成员名称的字段，比如：
```json
"name": "Bob"
```
在 yaml 中，须要用这样的内容来描述：

```yaml
- name: name
  type: 1
  description: 成员名称
  is_required: true
  example: zhangsan
  default: ~ 
  items: {} 
```

### 2、array 和 object 类型的字段描述

对于一个部门列表数组的字段，比如：

``` json
"department_id": [
    {
      "id": 3,
      "parentid": 2,
      "order": 40
    },
    {
      "id": 4,
      "parentid": 23,
      "order": 43
    }
]
```

在 yaml 中，须要用这样的内容来描述：

``` yaml
- name: department_id
  type: 2
  description: 部门列表数据。
  default: ''
  example: ''
  items:
    properties:
  # 上层type为2，因此可去除name,description描述
      - type: 3
        is_required: false
        items:
          properties:
            - name: id
              type: 4
              description: 创建的部门id
              default: ''
              example: 3
              items: {}
            - name: parentid
              type: 4
              description: 父部门id。根部门为1。
              default: ''
              example: 2
              items: {}
            - name: order
              type: 4
              description: 在父部门中的次序值。order值大的排序靠前。值范围是[0, 2^32)。
              default: ''
              example: 40
              items: {}
```


## YAML 完整示例
``` yaml
summary: 创建部门
description: ''
path: https://qyapi.weixin.qq.com/cgi-bin/department/create
operationid: WwOpenCreateParty
tag: wwopencorplogic
method: POST
cate_path: 服务端API-通讯录管理-部门管理-创建部门
permission: 应用须拥有父部门的管理权限。
  第三方仅通讯录应用可以调用。
  注意，部门的最大层级为15层；部门总数不能超过3万个；每个部门下的节点不能超过3万个。建议保证创建的部门和对应部门成员是串行化处理。
  
request:
  auth:
    - name: access_token
      example: ACCESS_TOKEN
      type: 1
      description: ''
      is_required: true
      default: ''
  body:
    - name: name
      type: 1
      description: 部门名称。同一个层级的部门名称不能重复。长度限制为1~32个字符，字符不能包括\:*?"&lt;&gt;｜
      is_required: 是
      default: ''
      example: 广州研发中心
      items: {}
    - name: name_en
      type: 1
      description: 英文名称。同一个层级的部门名称不能重复。需要在管理后台开启多语言支持才能生效。长度限制为1~32个字符，字符不能包括\:*?"&lt;&gt;｜
      is_required: 否
      default: ''
      example: RDGZ
      items: {}
    - name: parentid
      type: 4
      description: 父部门id，32位整型
      is_required: 是
      default: ''
      example: 1
      items: {}
    - name: order
      type: 4
      description: 在父部门中的次序值。order值大的排序靠前。有效的值范围是[0, 2^32)
      is_required: 否
      default: ''
      example: 1
      items: {}
    - name: id
      type: 4
      description: 部门id，32位整型，指定时必须大于1。若不填该参数，将自动生成id
      is_required: 否
      default: ''
      example: 2
      items: {}
  params: []
  formData: []

response:
  - status: '200'
    description: ''
    body:
      - name: errcode
        type: 4
        description: 返回码
        default: ''
        example: 0
        items: {}
      - name: errmsg
        type: 1
        description: 对返回码的文本描述内容
        default: ''
        example: created
        items: {}
      - name: id
        type: 4
        description: 创建的部门id
        default: ''
        example: 2
        items: {}

attention: ''
isExampleError: false
isInterface: true

```