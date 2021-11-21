const Joi = require("joi");

const signInSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": `username is required`,
  }),
  password: Joi.string().required().messages({
    "any.required": `password is required`,
  }),
});

const signUpSchema = Joi.object({
  username: Joi.string().min(4).max(8).alphanum().required().messages({
    "string.alphanum": `username must be alphanumeric`,
    "string.min": `username must be 4-8 characters`,
    "string.max": `username must be 4-8 characters`,
    "any.required": `username is required`,
  }),
  password: Joi.string()
    .min(8)
    .max(12)
    .pattern(/[a-z]/, "lowercase")
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[0-9]/, "digit")
    .required()
    .messages({
      "string.min": `username must be 8-12 characters`,
      "string.max": `username must be 8-12 characters`,
      "string.pattern.lowercase": `password must contain a lowercase character`,
      "string.pattern.uppercase": `password must contain a uppercase character`,
      "string.pattern.digit": `password must contain a digit`,
      "any.required": `password is required`,
    }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
    "any.only": `confirm password must match password`,
    "any.required": `confirmPassword is required`,
  }),
});

const employeeSchema = Joi.object({
  employeeID: Joi.number().min(1000).max(9999).required().messages({
    "number.min": `employee id must be 4 digit number`,
    "string.max": `employee id must be 4 digit number`,
    "any.required": `employee id is required`,
  }),
  name: Joi.string().required().messages({
    "any.required": `name is required`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `email must be valid email`,
    "any.required": `email is required`,
  }),
  age: Joi.number().required().messages({
    "any.required": `age is required`,
  }),
  address: Joi.string().required().messages({
    "any.required": `address is required`,
  }),
  mobile: Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/, "mobile")
    .required()
    .messages({
      "string.pattern.name": `mobile must be valid mobile number`,
      "any.required": `mobile is required`,
    }),
});

module.exports = {
  signInSchema,
  signUpSchema,
  employeeSchema,
};
