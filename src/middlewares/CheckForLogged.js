const checkForLoggedIn = (req , res , next)=>{
    if(req.headers.authorization)
    return res.json('You are already loged In')
    next()
}

module.exports = {checkForLoggedIn}