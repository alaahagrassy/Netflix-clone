const router = require('express').Router()
const {createMovie , getMovie , getAllMovie , deleteMovie , updateMovie , getRandomMovie} =require('../Controllers/MovieController')

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
router.put('/:id', updateMovie)



module.exports = router
