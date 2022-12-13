const express = require("express");
const passport = require("passport");

const ProductService = require("./../services/product.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  updateProductSchema,
  createProductSchema,
  getProductSchema,
  queryProductSchema,
} = require("./../schemas/product.schema");
const { checkRoles } = require("../middlewares/auth.handler");

const router = express.Router();
const service = new ProductService();

router.get(
  "/",
  validatorHandler(queryProductSchema, "query"),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/getSkus",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "superadmin"),
  async (req, res, next) => {
    try {
      const skus = await service.findSkus();
      res.status(200).json(skus);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduc = await service.create(body);
      res.status(201).json(newProduc);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
