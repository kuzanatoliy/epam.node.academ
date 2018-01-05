const Sequelize = require('sequelize');
const configs = require('./configs.json');

let connection = null;

const createConnection = () => {
  const { database, username, password, dialect } = configs;
  connection = new Sequelize(database, username, password, { dialect });
};

const getConnection = () => {
  if (!connection) {
    createConnection();
  }
  return connection;
};

module.exports = {
  getConnection
};
