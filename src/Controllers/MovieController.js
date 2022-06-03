const movieModel =require('../Models/MovieModel')


//create 
const createMovie = async (req , res)=>{
    const movie = req.body
    const newMovie =  new movieModel(movie)
    try{
        const saved = await newMovie.save()
        res.status(200).json(saved)
    }catch(err){
        res.status(500).json(err);
    }
}

//get 
const getMovie =async (req , res)=>{
    const _id =req.params.id;
    try{
        const movie =await movieModel.findById(_id)
        res.status(200).json(movie)

    }catch(err){
        res.status(500).json(err)
    }
}

//getAll
const getAllMovie =async (req , res)=>{
    try{
        const movie =await movieModel.find();
        res.status(200).json(movie)

    }catch(err){
        res.status(500).json(err)
    }
}

//random
const getRandomMovie=async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await movieModel.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
        console.log('series');
      } else {
        movie = await movieModel.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  

//delete 
const deleteMovie = async (req , res)=>{
    const _id = req.params.id;
    try{
        const movie = await movieModel.findByIdAndDelete(_id)
        res.status(200).json('Movie Deleted Succefully')
    }catch{
        res.status(500).json(err)
    }
}


//update
const updateMovie = async (req , res)=>{
    const _id = req.params.id;

    const update = req.body;
    try{
        const movie = await movieModel.findByIdAndUpdate(_id ,{
            $set:update
        } )
        res.status(200).json(movie)
    }catch{
        res.status(500).json(err)
    }
}
module.exports = {createMovie , getMovie,getAllMovie , deleteMovie , updateMovie , getRandomMovie} 