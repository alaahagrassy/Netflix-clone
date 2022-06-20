const Joi = require('@hapi/joi')
// Joi.objectId = require('joi-objectid')(Joi)
const pattern = "^01[0-2]\d{1,8}$"

const signup = Joi.object({
    userName: Joi.string(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }).required(),
    password: Joi.string().required().min(6),
    isAdmin: Joi.boolean(),
})

const UpdateUser = Joi.object({
    userName: Joi.string(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
    password: Joi.string().min(6),
})

const Userpayment = Joi.object({

    
    
    FirstName: Joi.string().required(),
    LastName:Joi.string().required(),
    PhoneNumber : Joi.number().regex(pattern).require(),
    cardNumber: Joi.number().required(),
    expirationDate: Joi.date().required(),
    securityCode: Joi.number().min(3).max(4).required(),
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