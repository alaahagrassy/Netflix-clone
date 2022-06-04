const router = require('express').Router()
const {createList , getList , deleteList } =require('../Controllers/ListController')

//create List
router.post('/' , createList)

//get all List
router.get('/' , getList)

//delete List
router.delete('/:id', deleteList)


module.exports = router
