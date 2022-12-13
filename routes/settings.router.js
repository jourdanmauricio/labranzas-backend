const express = require('express');
const passport = require('passport');

const SettingService = require('../services/setting.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createSettingSchema,
  updateSettingSchema,
} = require('../schemas/setting.schema');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new SettingService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const settings = await service.find();
      res.json(settings.setting);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('superadmin'),
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
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('superadmin'),
  validatorHandler(updateSettingSchema, 'body'),
  async (req, res, next) => {
    try {
      const setting = req.body;
      const settingUser = await service.updateSettings(setting);
      res.status(200).json(settingUser.setting);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
