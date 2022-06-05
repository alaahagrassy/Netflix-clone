const ProfileModel = require('../Models/userProfileModel')


//addProfile
profile = async(req,res)=>{
    const {isKid} = req.body
    const UserProfile = await ProfileModel.create({
        userName,isKid
    }).save().then(data=>{
        res.status(200).json("Added")
    }).catch(err=>{
        res.status(500).json('Server Error')
    })

}
//Edit 
EditProfile = async(req,res)=>{
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

deleteProfile = async(req,res)=>{
    const {id} = req.params
    const delUserProfile = await ProfileModel.findByIdAndDelete(id)
    .then(data=>{
        res.status(200).json("deleted Successfully")
    }).catch(err=>{
        res.status(500).json("Server Error")
    }) 
}

module.exports = {profile , EditProfile , deleteProfile}