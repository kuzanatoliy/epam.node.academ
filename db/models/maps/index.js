const Sequelize = require('sequelize');
const provider = require('../../connection');
const connection = provider.getConnection();

const params = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  value: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.INTEGER
  }
};

const Maps = connection.define('maps', params);

const attributes = ['id', 'value', 'type'];

const parseItem = item => ({ id: item.id, map: item.value.split(','), type: item.type });

const parseItems = items => items.map(item => parseItem(item));

const getAll = () => Maps.findAll({ attributes }).then(maps => parseItems(maps));

const getOne = id => Maps.findById(id, { attributes }).then(map => parseItem(map));

const update = (data, id) => Maps.update({ value: data.value.join(',') }, { where: { id } });

const create = (data, id) => Maps.create({ value: data.value.join(',') }, { where: { id } });

const remove = id => Maps.destroy({ id });

module.exports = {
  getAll,
  getOne,
  update,
  create,
  remove
};
