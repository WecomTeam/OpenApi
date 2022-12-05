const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')

import {parseTree} from '../logic/categoryParse.js'
import { genWecomApiDoc } from '../logic/getApiInfo.js'
import { getApiSchema, editApiSchema, parseToSchema } from '../logic/operation.js'

router.post('/info/get', async (req, res, next) => {
  const { operationid } = req.body;

  const {yaml, schema} = await getApiSchema(operationid)
  try {
    const md = genWecomApiDoc(schema)
    res.send({
      yaml,
      md
    })
  } catch (e) {
    console.log(`---- ${operationid} schema解析失败----`)
    console.error(e)
    res.send({
      yaml,
      md: {
        domStr: '',
        md: ''
      }
    })
  }
});

router.post('/info/edit', async (req, res, next) => {
  const { operationid, yaml } = req.body
  const newSchema = parseToSchema(yaml)
  try {
    const newMd = genWecomApiDoc(newSchema)
    await editApiSchema(operationid, yaml)
    res.send({
      yaml,
      md: newMd
    })
  } catch (e) {
    console.log(`---- ${operationid} schema解析失败----`)
    console.error(e)
    res.send({
      yaml,
      md: {
        domStr: '',
        md: ''
      }
    })
  }
})

router.post('/category/get', async (req, res, next) => {
  const category = await require('../../configs/category.json')
  const markMap = JSON.parse(await fs.readFileSync(path.join(__dirname, '../../configs/markMap.json'), 'utf-8'))
  const categoryTree = parseTree(category).children || []
  const insertMark = category => {
    category.forEach(cate => {
      if(!cate.is_folder) {
        cate.is_check = !!markMap[cate.api]
      } else {
        insertMark(cate.children)
      }
    })
  }
  insertMark(categoryTree)
  res.send(categoryTree)
})

router.post('/interface/mark', async (req, res, next) => {
  const {is_check, operationid} = req.body as {
    is_check: boolean,
    operationid: string
  }
  const markMap = JSON.parse(await fs.readFileSync(path.join(__dirname, '../../configs/markMap.json'), 'utf-8'))
  markMap[operationid] = !!is_check
  await fs.writeFileSync(path.join(__dirname, '../../configs/markMap.json'), JSON.stringify(markMap, null, 2))
  res.send({})
})
module.exports = router;