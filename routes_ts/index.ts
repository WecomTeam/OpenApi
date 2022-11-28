const express = require('express');
const router = express.Router();
const fs = require('fs');
const categoryParse = require("../logic/categoryParse.js");
import { parseTree } from '../logic/categoryParse.js'

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });

  try {
    fs.readFile('./configs/category.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err)
        res.send(err)
      }
      else {
        let category = JSON.parse(data) || {}
        let categoryTree = parseTree(category).children || []
        let global_data = { category: categoryTree }
        res.render('../vue/dist/index.ejs', { global_data_string: JSON.stringify(global_data) });
      }
      // Display the file content


    });
  } catch (error) {
    console.log(error)
    res.send(error)
  }

});

module.exports = router;
