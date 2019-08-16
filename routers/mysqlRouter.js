var express = require('express')
var router = express.Router()
const {categoriesController} = require('../controllers')

router.get('/category', categoriesController.getCategories)
router.post('/category',categoriesController.addCategories)
router.put('/category/:id',categoriesController.editCategories)
router.delete('/category/:id',categoriesController.deleteCategories)

module.exports = router;