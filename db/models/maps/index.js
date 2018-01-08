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

const Maps = connection.define('maps', params);

module.exports = Maps;
