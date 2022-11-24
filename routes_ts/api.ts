const express = require('express');
const router = express.Router();
const fs = require('fs')
import { genWecomApiDoc } from '../logic/getApiInfo.js'

router.post('/info/get', async (req, res, next) => {
  const { operationid } = req.body;
  const filePath = `./api/${operationid.replace(/[\.\/\\]/g, '')}.json`
  console.log(filePath)



  try {
    const jsonString = fs.readFileSync(filePath, 'utf8');
    console.log(jsonString)
    try {
      let schema = JSON.parse(jsonString)
      res.send({
        schema
        // md: genWecomApiDoc(data)
      })  
    } catch (error) {
        console.log(error)
    }
    
  } catch (err) {
    console.error(err);
  }



});


router.post('/api/edit', (req, res, next) => {

})
module.exports = router;