const Joi = require('joi');

const id = Joi.string().min(3).max(20);
const name = Joi.string().min(3).max(100);
const full_name = Joi.string();
const path_from_root = Joi.array();
const picture = Joi.string().allow(null, '').uri();
const settings = Joi.array();
const attributes = Joi.array();
const attributes_details = Joi.array();
const description_web = Joi.string().allow(null, '');
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const q = Joi.string();

const getCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  id: id.required(),
  name: name.required(),
  full_name: full_name,
  path_from_root: path_from_root,
  picture: picture,
  settings: settings,
  attributes: attributes,
  attributes_details: attributes_details,
  description_web,
});

const updateCategorySchema = Joi.object({
  description_web,
});

const queryUserSchema = Joi.object({
  limit,
  offset,
  q,
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  queryUserSchema,
};
