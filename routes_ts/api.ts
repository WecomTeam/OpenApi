const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
import {genWecomApiDoc} from '../logic/getApiInfo.js'

router.post('/info/get', async (req, res, next) => {
    const {operationid} = req.body;
    const filePath = path.join(__dirname, `../../api/${operationid.replace(/[\.\/\\]/g, '')}.json`)
    fs.exists(filePath, async function(exists) {
      if(exists) {
        const jsonData = await require(filePath)
        try {
          const md = genWecomApiDoc(jsonData)
          res.send({
              schema: jsonData,
              md
          })
        } catch(e) {
          console.log(`---- ${operationid} schema解析失败----`)
          res.send({
            schema: jsonData,
            md: ''
        })
        }
      } else {
        res.send({
          schema: {
            operationid
          }
        })
      }
    })
  });



router.post('/api/edit', (req, res, next) => {

})
module.exports = router;