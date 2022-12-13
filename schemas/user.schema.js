const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email().max(150);
const password = Joi.string().min(8).max(30);
const role = Joi.string().min(5);
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const q = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updatePassUserSchema = Joi.object({
  id: id.required(),
  // email: email.required(),
  // password: password.required(),
  newPassword: password.required(),
});

const queryUserSchema = Joi.object({
  limit,
  offset,
  q,
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  updatePassUserSchema,
  queryUserSchema,
};
