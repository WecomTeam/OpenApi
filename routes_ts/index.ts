const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
import { parseTree } from '../logic/categoryParse.js'

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
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
    res.render('../vue/dist/index.ejs', { global_category_tree_string: JSON.stringify(categoryTree) });
  } catch (error) {
    res.send(error)
  }

});

module.exports = router;
