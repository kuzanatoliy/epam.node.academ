const server = require('./server');
const maps = require('./db/models/maps');

server.use('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello world');
  res.end();
});

server.use('/sudoku', async (req, res) => {
  try {
    jsonRes(res, await maps.getAll());
  } catch (err) {
    error(res, err);
  }
});

server.get('/sudoku/:id', async (req, res, data) => {
  try {
    jsonRes(res, await maps.getOne(data.url.id));
  } catch (err) {
    error(res, err);
  }
});

server.del('/sudoku/:id', async (req, res, data) => {
  try {
    jsonRes(res, await maps.remove(data.url.id));
  } catch (err) {
    error(res, err);
  }
});

server.put('/sudoku/:id', async (req, res, data) => {
  try {
    jsonRes(res, await maps.create({ value: data.post.value }, data.post.id));
  } catch (err) {
    error(res, err);
  }
});

server.post('/sudoku/:id', async (req, res, data) => {
  try {
    jsonRes(res, await maps.update({ value: data.post.value }, data.url.id));
  } catch (err) {
    error(res, err);
  }
});

const jsonRes = (res, json) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(json));
  res.end();
};

const error = (err, res) => {
  if (err) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Error');
    res.end();
  }
};

server.start(8888);
