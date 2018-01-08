const server = require('./server');
const maps = require('./db/actions/maps');
const Res = require('./lib/utils/respons');

server.use('/', (req, res) => {
  Res.textRes(res, 'Hello world');
});

server.get('/sudoku', async (req, res) => {
  try {
    Res.jsonRes(res, await maps.getAll());
  } catch (err) {
    error(err, res);
  }
});

server.get('/sudoku/:id', async (req, res, data) => {
  try {
    Res.jsonRes(res, await maps.getOne(data.url.id));
  } catch (err) {
    error(err, res);
  }
});

server.del('/sudoku/:id', async (req, res, data) => {
  try {
    Res.jsonRes(res, await maps.remove(data.url.id));
  } catch (err) {
    error(err, res);
  }
});

server.post('/sudoku', async (req, res, data) => {
  try {
    Res.jsonRes(res, await maps.create({ value: data.post.value }));
  } catch (err) {
    error(err, res);
  }
});

server.put('/sudoku/:id', async (req, res, data) => {
  try {
    Res.jsonRes(res, await maps.update({ value: data.post.value }, data.post.id));
  } catch (err) {
    error(err, res);
  }
});

const error = (err, res) => {
  if (err) {
    switch (err.code) {
      case 'DATA':
        Res.badRequestError(res);
        break;
      default:
        Res.internalError(res);
        break;
    }
  }
};

server.start(8888);
