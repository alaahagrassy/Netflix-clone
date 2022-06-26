const ProfileModel = require('../Models/userProfileModel')
const UserModel = require('../Models/AuthModel')

//addProfile
const profile = async(req,res)=>{
    const userid = req.userId
    const {userName , avatar } = req.body
    UserModel.findById(userid)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }
            const order = new ProfileModel({
               user: userid,
                userName,
                avatar
            });
            order.save()
                .then(
                    re => {
                        res.status(201).json(re);
                    })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error',
                error: err
            })
        })
}


const getUsers = async (req , res )=>{

    const profile = await ProfileModel.find()
    .populate('user' ,'userName')
    .exec()
    .then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

//Edit 
const EditProfile = async(req,res)=>{
    const {id} = req.params
    const {userName , isKid} = req.body
    const user = await ProfileModel.findByIdAndUpdate(id ,{
        userName , isKid
    }).then(data=>{
        res.status(200).json("Updated")
    }).catch(err=>{
        res.status(500).json("Server Error")
    })
}

//deleteProfile 

const deleteProfile = async(req,res)=>{
    const {id} = req.params
    const delUserProfile = await ProfileModel.findByIdAndDelete(id)
    .then(data=>{
        res.status(200).json("deleted Successfully")
    }).catch(err=>{
        res.status(500).json("Server Error")
    }) 
}
deleteAllprofiles = async(req,res)=>{
    const delUserProfile = await ProfileModel.deleteMany()
    .then(data=>{
        res.status(200).json("deleted Successfully")
    }).catch(err=>{
        res.status(500).json("Server Error")
    }) 
}

module.exports = {profile , EditProfile , deleteProfile,getUsers,deleteAllprofiles }