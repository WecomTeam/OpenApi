const express = require('express');
const router = express.Router();
const fs = require('fs')
import {genWecomApiDoc} from '../logic/getApiInfo.js'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/api/info/get', function(req, res, next) {
  const {operationid} = req.body;
  fs.isExist()
});

module.exports = router;
