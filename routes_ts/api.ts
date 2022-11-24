const express = require('express');
const router = express.Router();
const fs = require('fs')
import {genWecomApiDoc} from '../logic/getApiInfo.js'

router.post('/info/get', async (req, res, next) => {
    const {operationid} = req.body;
    const filePath = `../api/${operationid.replace(/[\.\/\\]/g, '')}`
    if(fs.isExist(filePath)) {
      const jsonData = await require(filePath)
      res.send({
          schema: jsonData,
          md: genWecomApiDoc(jsonData)
      })
    }
  });

module.exports = router;