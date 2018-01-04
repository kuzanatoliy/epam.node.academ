const Sequelize = require('sequelize');

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

const attributes = ['id', 'value', 'type'];

const parseItem = item => ({ id: item.id, map: item.value.split(','), type: item.type });

const parseItems = items => items.map(item => parseItem(item));

const create = configs => {
  const sequelize = new Sequelize(configs.database, configs.username, configs.password, { dialect: 'mysql' }); 
  const Maps = sequelize.define('maps', params);

  const getAll = () => Maps.findAll({ attributes }).then(maps => parseItems(maps));

  const getOne = id => Maps.findById(id, { attributes }).then(map => parseItem(map));

  const update = (data, id) => Maps.update({ value: data.value.join(',') }, { where: { id } });

  const create = (data, id) => Maps.create({ value: data.value.join(',') }, { where: { id } });

  const remove = id => Maps.destroy({ id });

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  };
}

module.exports = {
  create
};