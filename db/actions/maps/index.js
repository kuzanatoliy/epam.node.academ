const { Maps, ATTRIBUTES, SHORT_ATTRIBUTES } = require('../../models/maps');

const errorCreator = (err, request) => {
  if (err) {
    err.code = 'DATA';
    err.request = request;
    err.model = 'Maps';
  }
  throw err;
};

const parseItem = item => ({ ...item.dataValues, value: item.value.split(',') });

const parseItems = items => items.map(item => parseItem(item));

const parseValue = values => values.join(',');

const getAll = () => Maps.findAll(SHORT_ATTRIBUTES)
  .then(maps => parseItems(maps))
  .catch(err => errorCreator(err, 'getAll'));

const getOne = id => Maps.findById(id, ATTRIBUTES)
  .then(map => parseItem(map))
  .catch(err => errorCreator(err, 'getOne'));

const update = (data, id) => Maps.update({ value: parseValue(data.value) }, { where: { id } })
  .catch(err => errorCreator(err, 'update'));

const create = data => Maps.create({ value: parseValue(data.value) })
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
