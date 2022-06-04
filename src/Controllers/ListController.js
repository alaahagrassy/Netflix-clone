const ListModel = require("../Models/ListModel");

//create
const createList = async (req, res) => {
  const List = req.body;
  const newList = new ListModel(List);
  try {
    const saved = await newList.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get
const getList = async (req, res) => {
  const type = req.query.type;
  const genre = req.query.genre;
  let List = [];
  try {
    if (type) {
      if (genre) {
        List = await ListModel.aggregate([
          { $match: { type: type, genre: genre } },
          { $sample: { size: 10 } },
        ]);
      } else {
        List = await ListModel.aggregate([
          { $match: { genre: genre } },
          { $sample: { size: 10 } },
        ]);
      }
    } else {
      List = await ListModel.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(List);
  } catch (err) {
    res.status(500).json(err);
  }
};

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

module.exports = { createList, deleteList, getList };
