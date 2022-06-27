const router = require('express').Router()
const {createList , getList , getLists , deleteList ,updateList} =require('../Controllers/ListController')

//create List
router.post('/' , createList)

//get all List
router.get('/all' , getLists)

router.get('/:id' , getList)

//delete List
router.patch('/:id', updateList)

//delete List
router.delete('/:id', deleteList)


module.exports = router
