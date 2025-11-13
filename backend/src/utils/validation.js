const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    }),
    name: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Name must be at least 2 characters',
        'any.required': 'Name is required'
    }),
    skills: Joi.array().items(Joi.string()).default([])
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const projectSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().allow('').optional()
});

module.exports = { registerSchema, loginSchema, projectSchema };