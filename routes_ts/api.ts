const express = require('express');
const router = express.Router();
const fs = require('fs')
import {genWecomApiDoc} from '../logic/getApiInfo.js'

router.post('/info/get', async (req, res, next) => {
    const {operationid} = req.body;
    const filePath = `../api/${operationid.replace(/[\.\/\\]/g, '')}`
    
    try {
      if (fs.existsSync(filePath)) {
        //file exists
        const jsonData = await require(filePath)
      res.send({
          schema: jsonData,
          md: genWecomApiDoc(jsonData)
      })
      }
    } catch(err) {
      console.error(err)
    }

  });


router.post('/api/edit',(req,res,next)=>{

})
module.exports = router;