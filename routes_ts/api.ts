const express = require('express');
const router = express.Router();

import {genWecomApiDoc} from '../logic/getApiInfo.js'
import {getApiSchema, editApiSchema} from '../logic/operation.js'

router.post('/info/get', async (req, res, next) => {
    const {operationid} = req.body;

    const jsonData = await getApiSchema(operationid)
    try {
          const md = genWecomApiDoc(jsonData)
          res.send({
              schema: jsonData,
              md
          })
        } catch(e) {
          console.log(`---- ${operationid} schema解析失败----`)
          console.error(e)
          res.send({
            schema: jsonData,
            md: ''
        })
      } 
  });

router.post('/info/edit', async(req, res, next) => {
  const {operationid, schema} = req.body
  await editApiSchema(operationid, schema)
  res.send({})
})
module.exports = router;