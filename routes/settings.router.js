const express = require('express');
const passport = require('passport');

const SettingService = require('../services/setting.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  // updateSettingSchema,
  createSettingSchema,
  getSettingSchema,
} = require('../schemas/setting.schema');

const router = express.Router();
const service = new SettingService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const settings = await service.findByUserId(user.sub);
      res.json(settings.setting);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createSettingSchema, 'body'),
  async (req, res, next) => {
    try {
      const settings = req.body;
      const setting = await service.createSettings(settings);
      res.status(200).json(setting);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSettingSchema, 'params'),
  validatorHandler(createSettingSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const setting = req.body;
      const settingUser = await service.updateSettings(id, setting);
      res.status(200).json(settingUser.setting);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
