const movieModel =require('../Models/MovieModel')


//create 
const createMovie = async (req , res)=>{
    const {title,desc,img ,trailer,video,year,limit,genre,isSeries} = req.body
    const newMovie =  new movieModel({
        title, desc, img, trailer, video , year,limit,  genre  , isSeries
    })
    try{
        const Movie = await newMovie.save()
        res.status(200).json(Movie)
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

    const {title,desc,img ,trailer,video,year,limit,genre,isSeries} = req.body;
    try{
        const movie = await movieModel.findByIdAndUpdate(_id ,{
           title , desc ,img , trailer , video , year , limit , $push:{genre : genre} , isSeries
        } )
        res.status(200).json(movie)
    }catch(err){
        res.status(500).json(err)
    }
}
//search 

const search = async (req , res)=>{
    const q = req.body.q
    if (q === "" || q === " ")
    return res.status(404).json('there is no result match')
    movieModel.find({
        title :{
            $regex : q , $options:'i'
        }
    } , {
        _id:0,
        __v:0
    }, function (err ,data){
        if(!data.length)
        return res.status(404).json('there is no result match')
        res.json(data)
    }
    ).limit(10)
}

module.exports = {createMovie , getMovie,getAllMovie , deleteMovie , updateMovie , getRandomMovie,search} 