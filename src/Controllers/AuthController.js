const UserModel = require('../Models/AuthModel')
const MovieModel = require('../Models/MovieModel')
const _ =require ('lodash')
const salt_round = Number(process.env.salt_rounds);
const bcrypt = require("bcrypt");

//register function
const register = async (req, res, next) => {
    const { email, password,isAdmin ,avatar} = req.body
    const username = email.split('@')[0]
    const user = await UserModel.findOne({ email })
    // check if email Exist 
    if (user) {
        return res.status(404).json({ message: 'User exist' })
    }
    const AddUser = new UserModel({
        email, password,isAdmin,
        userName : username,
        avatar
    })
    try{
    const NewUser = await AddUser.save();
    await  NewUser.updateOne({
        $push:{isActive : 1}
    }).exec()
    const token = await NewUser.generatToken();
    if(!token)
    return res.json('Error')
    return res.status(200).json({user:NewUser,token})
    }catch(err){
        console.log(err);
        return res.status(500).json('Server Error ')
    }
}

///login function

 const logIn = async (req, res) => {
    const { email, password } = req.body
    const FindUser = await UserModel.findOne({ email })
    if (FindUser) {
        const copmarePassword = await FindUser.comparepassword(password)
        if (!copmarePassword) {
            return res.status(404).json('Invalid email or password')
        }

        if(FindUser.plan==='Basic'&& FindUser.isActive.length===1)
        return res.status(404).json("You can't login")
        else if(FindUser.plan==='Standard'&& FindUser.isActive.length===2)
        return res.status(404).json("you can't logIn")
        else if(FindUser.plan==='Premmium'&& FindUser.isActive.length===4)
        return res.status(404).json("you can't logIn")
        
        const token = await FindUser.generatToken();
        if(!token)
        res.status(404).json('Failed')
        res.json({user:FindUser , token})
        await FindUser.updateOne({
            $push:{isActive : 1}
        }).exec()
    }
    else {
        return res.status(400).json("Not Found")
    }
}

//Update Profile function 
const edit = async (req, res) => {
    
    const id= req.userId
    const {userName, email , PhoneNumber , cardNumber , securityCode,password , plan} = req.body
  let hashedpassword = await bcrypt.hash(password,salt_round );
    try {
        const user = await UserModel.findByIdAndUpdate(id, {
            userName, email , PhoneNumber , cardNumber , securityCode , plan,password:hashedpassword
        })
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
}
const editForAdmin = async (req, res) => {

    const {id}= req.params
    const {userName, email , PhoneNumber , cardNumber , securityCode , plan} = req.body
    try {
        const user = await UserModel.findByIdAndUpdate(id, {
            userName, email , PhoneNumber , cardNumber , securityCode , plan
        })
        res.status(200).json('updataed')
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
}

 /// get All User function

 const getUsers = async (req , res )=>{

        const users = await UserModel.find()
        .populate(['Fav' , 'watched'])
        .exec()
        .then(data=>{
            res.status(200).json(data)
        }).catch(err=>{
            console.log(err);
            res.status(500).json(err)
        })
 }
 //get userById function

 const getById = async (req ,res)=>{
    const id = req.userId
    const user = await UserModel.findById(id)
    .populate(['Fav' , 'watched'])
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
 }

 //get userById function For Admin
 const getuser = async (req ,res)=>{
    const {id} = req.params
    const user = await UserModel.findById(id)
    .populate(['Fav' , 'watched'])
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
 }

 //Delete User
 const Remove = async (req ,res)=>{
     const {id} = req.params
     const user = await UserModel.findByIdAndDelete(id).then(data=>{
         if(!data)
         return res.status(404).json({
             message:'Not Found'
         })
         return res.status(200).json({
             message:'Deleted'
         })
     }).catch(err=>{
         res.status(500).json(err)
     })
 }


 // Choose plane

 const plan  = async(req,res)=>{
     const id = req.userId
     const {plan} = req.body   
 const UserPlane = await UserModel.findByIdAndUpdate(id , {
        plan
     }).then(data=>{
       return res.status(200).json('Updated')
        }).catch(err=>{
         res.status(500).json('Server Error')
     })

 }

 //add Devices to open

 const devices = async (req , res)=>{
    const id = req.userId
    const {device} = req.body   
const UserDevice = await UserModel.findByIdAndUpdate(id , {
    $push:{device : device}
    }).then(data=>{   
      return res.status(200).json('Added Device/s')
       }).catch(err=>{
        res.status(500).json('Server Error')
    })
 } 
 const removeDevice = async (req , res)=>{
    const id = req.userId
    const {device} = req.body   
const UserDevice = await UserModel.findByIdAndUpdate(id , {
    $pull:{device : device}
    }).then(data=>{
      return res.status(200).json('Deleted Device/s')
       }).catch(err=>{
        res.status(500).json('Server Error')
    })
 } 
 

const destroy = async (req, res, next) =>{
    UserModel.deleteMany().then(data=>{
        return res.status(200).json('Deleted All')
    }
        ).catch(err=>{
            res.status(500).json('Server Error')
        })
        
}

//log out

logOut = async (req , res )=>{
    const id = req.userId 
const UserActive = await UserModel.findByIdAndUpdate(id , {
    $pull:{isActive : 1}
    }).then(data=>{
      return res.status(200).json('logged')
       }).catch(err=>{
        res.status(500).json('Server Error')
    })
}



//Fav Movies

const FavMovies = async (req ,res)=>{
    const id = req.userId
    const {Fav} = req.body
    const Movieid = await MovieModel.findById(Fav)
    if(!Movieid){
        return res.status(404).json("Not Found")
    }
    const user = await UserModel.findById(id)
    const arrayFav = user.Fav
   const existFav =  arrayFav.filter(el=>{
       if(el === Fav)
       return el
    })
   if(existFav.length)
   return res.status(200).json('Exist')

    const favMovie = await UserModel.findByIdAndUpdate(id,{
        $push:{Fav:Fav}
    }) 
    .then(data=>{
        return res.status(200).json('updated')
    }).catch(err=>{
       return res.status(500).json(err)
    })
    
}

//watch Movie
const watchedMovies = async (req ,res)=>{
    const id = req.userId
    const {watched} = req.body
    const Movieid = await MovieModel.findById(watched)
    if(!Movieid){
        return res.status(404).json("Not Found")
    }

    const user = await UserModel.findById(id)
    const arraywatched = user.watched
   const existwatched =  arraywatched.filter(el=>{
       if(el === watched)
       return el
    })
   if(existwatched.length)
   return res.status(200).json('Exist')

    const watchedMovie = await UserModel.findByIdAndUpdate(id,{
        $push:{watched : watched}
    }) 
    .then(data=>{
        if(!data)
        return res.status(404).json({
            message:'Not Found'
        })
        return res.status(200).json('updated')
    }).catch(err=>{
        res.status(500).json(err)
    })
}


const DeletFav = async (req ,res)=>{
    const id = req.userId
    const {Fav} = req.body
    if(!Fav){
        return res.status(404).json("Not Found")
    }
    const favMovie = await UserModel.findByIdAndUpdate(id,{
        $pull:{Fav:Fav}
    }) 
    .then(data=>{
        if(!data)
        return res.status(404).json({
            message:'Not Found'
        })
        return res.status(200).json('updated')
    }).catch(err=>{
        res.status(500).json(err)
    })
}





module.exports = { register, logIn, edit ,getUsers,getById,Remove,editForAdmin,plan,destroy,devices ,watchedMovies,removeDevice ,logOut,getuser,FavMovies,DeletFav}