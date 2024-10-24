const Joi = require("joi");

const signUpUserValidatorSchema = Joi.object({
    email: Joi.string().min(5).max(50).email(),
    firstName: Joi.string().min(3).max(20).alphanum(),
    lastName: Joi.string().min(3).max(20).alphanum(),
    phone: Joi.string(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const signInUserValidationSchema = Joi.object({
    email: Joi.string().min(5).max(50).email(),
    password: Joi.string()
})

module.exports = { signUpUserValidatorSchema, signInUserValidationSchema }