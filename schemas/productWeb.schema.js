const Joi = require('joi');

const id = Joi.number();
const prod_id = Joi.number().integer();
const seller_custom_field = Joi.string();
const price = Joi.number().min(10);
const available_quantity = Joi.number().integer();
const sold_quantity = Joi.number().integer();
const status = Joi.string();
const listing_type_id = Joi.string();
const permalink = Joi.string().allow(null, '');
const new_product = Joi.boolean().allow(null, '');
const featured = Joi.boolean().allow(null, '');
const best_sellers = Joi.boolean().allow(null, '');
const trend = Joi.boolean().allow(null, '');
const related_products = Joi.array();
const start_time = Joi.date();
const variations = Joi.array();

const createProductWebSchema = Joi.object({
  // id: id,
  prod_id: prod_id.required(),
  seller_custom_field: seller_custom_field.required(),
  price: price.required(),
  available_quantity: available_quantity.required(),
  sold_quantity: sold_quantity.required(),
  status: status.required(),
  listing_type_id: listing_type_id.required(),
  permalink: permalink,
  new_product: new_product.required(),
  featured: featured.required(),
  best_sellers: best_sellers.required(),
  trend: trend.required(),
  related_products,
  start_time: start_time,
  variations,
});

const updateProductWebSchema = Joi.object({
  // id: id.required(),
  prod_id,
  seller_custom_field,
  price,
  available_quantity,
  sold_quantity,
  status,
  listing_type_id,
  permalink,
  new_product,
  featured,
  best_sellers,
  trend,
  related_products,
  start_time,
  variations,
});
const getProductWebSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductWebSchema,
  updateProductWebSchema,
  getProductWebSchema,
  // queryProductSchema,
};
