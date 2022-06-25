const UserModel = require('../Models/AuthModel')
const { validationResult } = require('express-validator')


//register function
const register = async (req, res, next) => {
    const { email, password,isAdmin} = req.body
    const username = email.split('@')[0]
    const user = await UserModel.findOne({ email })
    // check if email Exist 
    if (user) {
        return res.status(404).json({ message: 'User exist' })
    }
    const AddUser = new UserModel({
        email, password,isAdmin,
        userName : username
    })
    try{
    const NewUser = await AddUser.save();
    await  NewUser.updateOne({
        $push:{isActive : 1}
    }).exec()
    const token = await NewUser.generatToken();
    if(!token)
    return res.json('Error')
    return res.status(200).json({token})
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
            return res.json('Invalid email or password')
        }

        if(FindUser.plan==='Basic'&& FindUser.isActive.length===1)
        return res.json("You can't login")
        else if(FindUser.plan==='Standard'&& FindUser.isActive.length===2)
        return res.json("you can't logIn")
        else if(FindUser.plan==='Premmium'&& FindUser.isActive.length===4)
        return res.json("you can't logIn")
        
        const token = await FindUser.generatToken();
        if(!token)
        res.status(404).json('Failed')
        res.json({ token })
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
    const id = req.userId
    const {userName, email  ,password} = req.body
    try {
        const user = await UserModel.findOneAndUpdate(id, {
            userName, email , password
        })
        res.status(200).json('Updated Successfully')
    }
    catch (err) {
        res.json({
            message: err
        })
    }
}

 /// get All User function

 const getUsers = async (req , res )=>{

        const users = await UserModel.find()
        .populate('profile')
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
 //get userById function

 const getById = async (req ,res)=>{
    const id = req.userId
    const user = await UserModel.findById(id)
    .populate('UserProfile')
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
           
            error:err
        })
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
         res.status(500).json({
             message : err
         })
     })
 }


 // Choose plane

 const plan  = async(req,res)=>{
     const id = req.userId
     const {plan} = req.body   
 const UserPlane = await UserModel.findByIdAndUpdate(id , {
        plan
     }).then(data=>{
       if(!data)       
       return res.status(404).json("Not Found")
       return res.status(200).json('Updated')
        }).catch(err=>{
         console.log(err.message)
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
      if(!data)       
      return res.status(404).json("Not Found")
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
      if(!data)       
      return res.status(404).json("Not Found")
      return res.status(200).json('Deleted Device/s')
       }).catch(err=>{
        res.status(500).json('Server Error')
    })
 } 
 


 // payment
 const payment = async(req,res)=>{
    const id = req.userId
    const {FirstName,LastName , cardNumber,expirationDate,securityCode,PhoneNumber } = req.body
    const UserPayment = await UserModel.findByIdAndUpdate(id , {
       FirstName ,LastName ,cardNumber , expirationDate ,securityCode, PhoneNumber
    }).then(data=>{
      if(!data)
      return res.status(404).json("Not Found")

      return res.status(200).json('Updated')
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
      if(!data)       
      return res.status(404).json("Not Found")
      return res.status(200).json('logged')
       }).catch(err=>{
        res.status(500).json('Server Error')
    })
}

module.exports = { register, logIn, edit ,getUsers,getById,Remove,payment,plan,destroy,devices ,removeDevice ,logOut}