const Maps = require('../../models/maps');

const attributes = ['id', 'value', 'type'];

const errorCreator = (err, request) => {
  if (err) {
    err.code = 'DATA';
    err.request = request;
    err.model = 'Maps';
  }
  throw err;
};

const parseItem = item => ({ id: item.id, map: item.value.split(','), type: item.type });

const parseItems = items => items.map(item => parseItem(item));

const parseValue = values => values.join(',');

const getAll = () => Maps.findAll({ attributes })
  .then(maps => parseItems(maps))
  .catch(err => errorCreator(err, 'getAll'));

const getOne = id => Maps.findById(id, { attributes })
  .then(map => parseItem(map))
  .catch(err => errorCreator(err, 'getOne'));

const update = (data, id) => Maps.update({ value: parseValue(data.value) }, { where: { id } })
  .catch(err => errorCreator(err, 'update'));

const create = (data, id) => Maps.create({ value: parseValue(data.value), id: data.id })
  .catch(err => errorCreator(err, 'create'));

const remove = id => Maps.destroy({ id })
  .catch(err => errorCreator(err, 'remove'));

module.exports = {
  getAll,
  getOne,
  update,
  create,
  remove
};
