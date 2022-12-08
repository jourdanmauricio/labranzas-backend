const port = process.env.PORT || 3000;

const express = require("express");
const routerApi = require("./routes");
const app = express();
app.use(express.json());

const ProductService = require("./services/product.service");
const service = new ProductService();

app.get("/", async (req, res) => {
  // res.send("Hola mi server en Express");
  try {
    const tasks = await service.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

// const getConnection = require("./libs/oracle");

// const connection = getConnection();

// routerApi(app);
app.listen(port, () => {
  console.log(`Listen at pot ${port}...`);
});
