const express = require("express");

// const authRouter = require("./auth.router");
// const usersRouter = require("./users.router");
// const customersRouter = require("./customers.router");
// const customersHistoryRouter = require("./customersHistory.router");
// const lessonsRouter = require("./lessons.router");
// const subscriberRouter = require("./subscribers.router");
// const commentRouter = require("./comments.router");
// const settingRouter = require("./settings.router");
const productRouter = require("./products.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  // router.use("/auth", authRouter);
  // router.use("/users", usersRouter);
  // router.use("/customers", customersRouter);
  // router.use("/customers-history", customersHistoryRouter);
  // router.use("/lessons", lessonsRouter);
  // router.use("/subscribers", subscriberRouter);
  // router.use("/comments", commentRouter);
  // router.use("/settings", settingRouter);
  router.use("/products", productRouter);
}

module.exports = routerApi;
