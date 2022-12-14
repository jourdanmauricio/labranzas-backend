const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
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

  async findAllCat() {
    const categories = await models.Category.findAll({
      attributes: ['id', 'name', 'full_name', 'description_web'],
    });
    return categories;
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
