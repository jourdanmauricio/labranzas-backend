const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class ProductsWebService {
  constructor() {}

  async findOne(id) {
    const product = await models.ProductWeb.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(data) {
    console.log('Service Create', data);
    const newProduct = await models.ProductWeb.create(data);
    return newProduct;
  }

  async update(id, changes) {
    const productWeb = await this.findOne(id);
    const rta = await productWeb.update(changes);
    return rta;
  }

  async delete(id) {
    const productWeb = await this.findOne(id);
    await productWeb.destroy();
    return { id };
  }

  async find() {
    const options = {
      attributes: [
        'new_product',
        'featured',
        'best_sellers',
        'trend',
        // 'product.title',
      ],
      include: ['product'],
      where: { new_product: true },
    };

    const productsWeb = await models.ProductWeb.findAll(options);
    return productsWeb;
  }

  async findFeatures() {
    const [results] = await sequelize.query(
      `SELECT pweb.id "id", pweb.prod_id "prod_id", pweb.new_product "new_product", pweb.featured "featured",
      pweb.best_sellers "best_sellers", pweb.trend "trend", pweb.price "price",
      pweb.available_quantity "available_quantity", prod.title "title", REPLACE(prod.thumbnail, 'http://', 'https://') "thumbnail",
      prod.seller_custom_field "seller_custom_field", pweb.variations "variations"
      FROM PRODUCTS_WEB pweb
      JOIN PRODUCTS prod ON prod.id = pweb.prod_id
      WHERE pweb.status       = 'active'
      AND   (pweb.new_product = 1
      OR    pweb.featured     = 1
      OR    pweb.best_sellers = 1
      OR    pweb.trend        = 1)
      `
    );

    return results;
  }
}
module.exports = ProductsWebService;
