const server = require('./server');
const maps = require('./db/models/maps');

server.use('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello world');
  res.end();
});

server.use('/sudoku', (req, res) => {
  maps.getAll().then(json => {
    jsonRes(res, json);
  }).catch(err => error(err, res));
});

server.get('/sudoku/:id', (req, res, data) => {
  maps.getOne(data.url.id).then(json => {
    jsonRes(res, json);
  }).catch(err => error(err, res));
});

server.del('/sudoku/:id', (req, res, data) => {
  maps.remove(data.post.id).then(json => {
    jsonRes(res, json);
  }).catch(err => error(err, res));
});

server.put('/sudoku/:id', (req, res, data) => {
  maps.create({ value: data.post.value }, data.post.id).then(json => {
    jsonRes(res, json);
  }).catch(err => error(err, res));
});

server.post('/sudoku/:id', (req, res, data) => {
  maps.update({ value: data.post.value }, data.url.id).then(json => {
    jsonRes(res, json);
  }).catch(err => error(err, res));
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
