const Joi = require('@hapi/joi')
// Joi.objectId = require('joi-objectid')(Joi)
const signup = Joi.object({
    userName: Joi.string(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }).required(),
    password: Joi.string().required().min(6),
    isAdmin: Joi.boolean(),
    avatar:Joi.string()
})

const UpdateUser = Joi.object({
    userName: Joi.string(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
})

const Userpayment = Joi.object({

    
    
    FirstName: Joi.string().required(),
    LastName:Joi.string().required(),
    PhoneNumber : Joi.number().required(),
    cardNumber: Joi.number().required(),
    securityCode: Joi.number().required(),
})

const paymentValidation = (req, res, next) => {
    const validation = Userpayment.validate(req.body)
    if (validation.error) {
        return res.json(validation.error.message)
    }
    next();
}
const validateSignUp = (req, res, next) => {
    const validation = signup.validate(req.body)
    if (validation.error) {
        return res.json(validation.error.message)
    }
    next();
};

const valdateUpdateUser = (req, res, next) => {
    const validation = UpdateUser.validate(req.body)
    if (validation.error) {
        return res.json(validation.error.message)
    }
    next();
}
module.exports = { validateSignUp, valdateUpdateUser, paymentValidation }