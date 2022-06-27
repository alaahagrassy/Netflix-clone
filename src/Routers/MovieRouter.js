const router = require('express').Router()
const {createMovie , getMovie , getAllMovie , deleteMovie , updateMovie , getRandomMovie,search} =require('../Controllers/MovieController')
const {AuthorizeAdmin} =require('../middlewares/AuthorizeAdmin')
//create movie
router.post('/' , createMovie)

//get all movie
router.get('/all' , getAllMovie)

//get random movie
router.get('/random' , getRandomMovie)

//get movie
router.get('/:id' , getMovie)

//delete movie
router.delete('/:id', deleteMovie)

//update movie
router.put('/:id',updateMovie)

router.post('/search',search)



module.exports = router
