const ListModel = require("../Models/ListModel");

//create
const createList = async (req, res) => {
  const {title , type , genre,MovieId} = req.body;
  const newList = new ListModel({
    title , type , genre , MovieId
  });
  try {
    const saved = await newList.save();
    res.status(200).json(saved);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

//get
const getList = async (req, res) => {
  // const type = req.query.type;
  // const genre = req.query.genre;
  // let List = [];
  // try {
  //   if (type) {
  //     if (genre) {
  //       List = await ListModel.aggregate([
  //         { $match: { type: type, genre: genre } },
  //         { $sample: { size: 10 } },
  //       ]).populate('MovieId','title');
  //     } else {
  //       List = await ListModel.aggregate([
  //         { $match: { genre: genre } },
  //         { $sample: { size: 10 } },
  //       ]).populate('MovieId' , 'title');
  //     }
  //   } else {
  //     List = await ListModel.aggregate([{ $sample: { size: 10 } }]);
  //   }
  //   res.status(200).json(List).populate('MovieId' , 'title');
  // } catch (err) {
  //   console.log(err)
  //   res.status(500).json(err);
  // }

  
  ListModel.find().limit(10)
        .populate('MovieId' ,'title')
        .exec()
        .then(list => {
          if(!list)
          return res.status(404).json('Error')

            res.status(200).json(list)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};
//update
const updateList = async (req , res)=>{
  const _id = req.params.id;

  const {movieId} = req.body;
  try{
      const movie =await ListModel.findById(_id)
      console.log(movie);
      await movie.updateOne({
        $push:{content:movieId}
      })
      // const newM = await ListModel.findByIdAndUpdate(_id ,{
      //     $set:update
      // } )
      res.status(200).json(movie)
  }catch(err){
      res.status(500).json(err)
  }
}
//delete
const deleteList = async (req, res) => {
  const _id = req.params.id;
  try {
    const List = await ListModel.findByIdAndDelete(_id);
    res.status(200).json("List Deleted Succefully");
  } catch {
    res.status(500).json(err);
  }
};

module.exports = { createList, deleteList, getList ,updateList};
