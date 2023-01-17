const express = require('express');
const passport = require('passport');
const { config } = require('../config/config');

const ProductWebService = require('./../services/productWeb.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductWebSchema,
  getProductWebSchema,
  updateProductWebSchema,
} = require('../schemas/productWeb.schema');
const { checkRoles } = require('../middlewares/auth.handler');
const { default: axios } = require('axios');

const router = express.Router();
const service = new ProductWebService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.findFeatures();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/revalidateWeb',
  passport.authenticate('jwt', { session: false }),
  checkRoles('superadmin'),
  async (req, res, next) => {
    try {
      const url = `${config.frontEnd}/api/revalidate`;

      await axios(url, {
        headers: {
          revalidate: config.revalidateToken,
        },
      });

      return res.status(200).json({ status: 'OK' });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductWebSchema, 'params'),
  validatorHandler(updateProductWebSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newCategory = await service.update(id, body);
      res.status(200).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductWebSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductWebSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const delProd = await service.delete(id);
      res.status(200).json(delProd);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
