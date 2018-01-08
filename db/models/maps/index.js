const Sequelize = require('sequelize');
const provider = require('../../connection');
const connection = provider.getConnection();

const params = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['^(\\d,)*\\d$']
    }
  },
  type: {
    type: Sequelize.INTEGER,
    defalutValue: 2,
    allowNull: false,
    validate: {
      isIn: [2, 3]
    }
  }
};

const SHORT_ATTRIBUTES = { attributes: ['id', 'value', 'type'] };

const ATTRIBUTES = { attributes: [
  'id',
  'value',
  'type',
  [Sequelize.fn('POW', connection.col('type'), 2), 'poligonCount'],
  [Sequelize.fn('POW', connection.col('type'), 4), 'count']]
};

const Maps = connection.define('maps', params);

module.exports = {
  Maps,
  SHORT_ATTRIBUTES,
  ATTRIBUTES
};
