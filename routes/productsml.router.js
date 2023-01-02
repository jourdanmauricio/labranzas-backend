const express = require('express');
const passport = require('passport');

const ProductMlService = require('./../services/productMl.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  // updateProductSchema,
  createProductMlSchema,
  getProductMlSchema,
  updateProductSchema,
  // queryProductMlSchema,
} = require('./../schemas/productMl.schema');

const router = express.Router();
const service = new ProductMlService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(queryProductMlSchema, 'query'),
  async (req, res, next) => {
    try {
      const users = await service.find(req.query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(queryProductMlSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await service.findOne(id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductMlSchema, 'body'),
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

router.post(
  '/massive',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const results = await Promise.all(
        body.map(async (item) => {
          let newProduc = await service.create(item);
          return newProduc;
        })
      );

      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/massive',
  // passport.authenticate('jwt', { session: false }),
  // validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      let Promises = [];

      for (let i = 0; i < body.length; i++) {
        let newPromise = await service.update(body[i].id, body[i]);
        Promises.push(newPromise);
      }

      return Promise.all(Promises).then(function () {
        res.sendStatus(200);
      });
    } catch (error) {
      next(error);
    }

    // try {
    //   const body = req.body;
    //   const results = await Promise.all(
    //     body.map(async (item) => {
    //       let newProduc = await service.update(item);
    //       return newProduc;
    //     })
    //   );

    //   res.status(201).json(results);
    // } catch (error) {
    //   next(error);
    // }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductMlSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const productMl = await service.update(id, body);
      res.status(200).json(productMl);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductMlSchema, 'params'),
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
