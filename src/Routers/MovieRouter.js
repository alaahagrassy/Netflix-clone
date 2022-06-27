const router = require('express').Router()
const {createMovie , getMovie , getAllMovie , deleteMovie , updateMovie , getRandomMovie,search} =require('../Controllers/MovieController')
const {AuthorizeAdmin} =require('../middlewares/AuthorizeAdmin')
//create movie
router.post('/' ,AuthorizeAdmin, createMovie)

//get all movie
router.get('/all' , getAllMovie)

//get random movie
router.get('/random' , getRandomMovie)

//get movie
router.get('/:id' , getMovie)

//delete movie
router.delete('/:id',AuthorizeAdmin, deleteMovie)

//update movie
router.put('/:id',AuthorizeAdmin,updateMovie)

router.post('/search',search)



module.exports = router
