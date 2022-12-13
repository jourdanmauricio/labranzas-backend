const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler');
// const passport = require('passport');

const UserMlService = require('../services/userMl.service');
const service = new UserMlService();

const {
  getUserMlSchema,
  createUserMlSchema,
  updateUserMlSchema,
} = require('./../schemas/userMl.schema');

// const jwt = require('jsonwebtoken');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(getUserMlSchema, 'params'),
  async (req, res, next) => {
    try {
      // const { id } = req.params;
      const user = req.user;
      const userMl = await service.findByUserId(user.sub);
      res.json(userMl);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserMlSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const mlUser = req.body;
      mlUser.user_id = user.sub;
      const rta = await service.create(mlUser);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateUserMlSchema, 'body'),
  validatorHandler(getUserMlSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const mlUser = req.body;
      const rta = await service.update(id, mlUser);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserMlSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ message: 'User ML deleted' });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
