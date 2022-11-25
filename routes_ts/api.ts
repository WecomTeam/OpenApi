const express = require('express');
const router = express.Router();
const fs = require('fs')
const parseTree = require('../logic/categoryParse.js')

import { genWecomApiDoc } from '../logic/getApiInfo.js'
import { getApiSchema, editApiSchema } from '../logic/operation.js'

router.get('/catalog/gettree', function (req, res, next) {
  try {
    fs.readFile('./configs/category.json', 'utf8', function (err, data) {
      if(err){
        console.log(err)
        res.send("")
      }
      else{
        let category = JSON.parse(data) || {}
        let categoryTree = parseTree(category).children || []
        res.send({
          category:categoryTree
        })
      }
      // Display the file content
      console.log(data);
    });
  } catch (error) {
    console.log(error)
  }

})


router.post('/info/get', async (req, res, next) => {
  const { operationid } = req.body;

  const jsonData = await getApiSchema(operationid)
  try {
    const md = genWecomApiDoc(jsonData)
    res.send({
      schema: jsonData,
      md
    })
  } catch (e) {
    console.log(`---- ${operationid} schema解析失败----`)
    console.error(e)
    res.send({
      schema: jsonData,
      md: {
        domStr: '',
        md: ''
      }
    })
  }
});

router.post('/info/edit', async (req, res, next) => {
  const { operationid, schema } = req.body
  await editApiSchema(operationid, schema)
  res.send({})
})

router.post('/category/get', async (req, res, next) => {
  const { operationid } = req.body
  const category = await require('../../config/category.json')
  const insertMarkToCategory = () => {}
  res.send({})
})
module.exports = router;