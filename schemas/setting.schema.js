const Joi = require('joi');

const setting = Joi.object();

const createSettingSchema = Joi.object({
  setting,
});

const updateSettingSchema = Joi.object({
  setting,
});

module.exports = {
  createSettingSchema,
  updateSettingSchema,
};
