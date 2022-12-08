const sequelize = require("../libs/sequelize");

class ProductService {
  constructor() {}

  async find() {
    const query = "select * from tasks";
    const [data] = await sequelize.query(query);
    return data;
  }
}
module.exports = ProductService;
