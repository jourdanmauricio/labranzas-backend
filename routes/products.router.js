const express = require("express");

const ProductService = require("./../services/product.service");

const router = express.Router();
const service = new ProductService();

router.get("/", async (req, res, next) => {
  try {
    const tasks = await service.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});
