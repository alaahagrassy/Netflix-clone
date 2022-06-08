const Joi = require('@hapi/joi')
// Joi.objectId = require('joi-objectid')(Joi)

const signup =Joi.object({
    userName: Joi.string(),
    email : Joi.string()
    .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }).required(),
    password: Joi.string().required().min(6),
    cardNumber:Joi.number(),
    expirationDate:Joi.date(),
    securityCode:Joi.number().min(3).max(4),
    isAdmin: Joi.boolean()
})

const UpdateUser = Joi.object({
    userName: Joi.string(),
    email : Joi.string()
    .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(6),
})

const validateSignUp = (req , res  , next)=>{
    const validation = signup.validate(req.body)
    if(validation.error){
      return res.json(validation.error.message)
    }
    next();
};

const valdateUpdateUser = (req , res , next)=>{
    const validation = UpdateUser.validate(req.body)
    if(validation.error){
        return res.json(validation.error.message)
    }
    next();
}
module.exports = {validateSignUp,valdateUpdateUser}