const express = require('express');
const router = express.Router();
import {genWecomApiDoc} from '../logic/getApiInfo.js'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/api/info/get', function(req, res, next) {
  const operationid = req.body;
  
});

module.exports = router;
