const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(query) {
    const options = {
      where: {},
      order: [['updated_at', 'DESC']],
    };
    const { limit, offset, q } = query;
    // const { limit, offset } = query;

    if (q) {
      options.where = {
        [Op.or]: [
          {
            id: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            full_name: {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      };
    }

    const count = await models.Category.count(options);

    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
    }

    const categories = await models.Category.findAll(options);
    const rta = {
      paging: {
        total: count,
        offset: offset,
        limit: limit,
      },
      results: categories,
    };

    return rta;
  }

  async findAllCats() {
    const categories = await models.Category.findAll({
      attributes: ['id', 'name', 'full_name', 'description_web'],
    });
    return categories;
  }

  async findWebCats() {
    const [results] = await sequelize.query(
      `SELECT cat.description_web "name", count(*) "cantidad"
      FROM CATEGORIES cat
      JOIN PRODUCTS prod ON prod.category_id = cat.id
      JOIN PRODUCTS_WEB pweb ON pweb.prod_id = prod.id
      WHERE pweb.status = 'active'
      GROUP BY cat.description_web`
    );
    return results;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async findOneWeb(description_web) {
    const [results] = await sequelize.query(
      `SELECT pweb.id "id", pweb.prod_id "prod_id", pweb.new_product "new_product", pweb.featured "featured",
      pweb.best_sellers "best_sellers", pweb.trend "trend", pweb.price "price",
      pweb.available_quantity "available_quantity", prod.title "title", REPLACE(prod.thumbnail, 'http://', 'https://') "thumbnail",
      prod.seller_custom_field "seller_custom_field", pweb.variations "variations"
      FROM PRODUCTS_WEB pweb
      JOIN PRODUCTS prod ON prod.id = pweb.prod_id
      JOIN CATEGORIES cat ON cat.id = prod.category_id
      WHERE pweb.status             = 'active'
      AND   cat.description_web     = '${description_web}'
      `
    );

    if (!results) {
      throw boom.notFound('Category not found');
    }
    return results;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
