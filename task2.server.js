const net = require('net');

const listeners = require('./lib/listeners');

const server = net.createServer(socket => {
  let clientName;

  socket.on('error', err => {
    if (err) {
      listeners.remove(clientName);
    }
  }).once('data', data => {
    clientName = data.toString();
    listeners.add(clientName, socket);
    socket.on('data', data => {
      listeners.send(clientName, data);
    });
  }).on('end', () => {
    listeners.remove(clientName);
  });
}).on('error', err => {
  throw err;
}).on('close', () => {
  console.log('Close server');
});

server.listen({
  host: 'localhost',
  port: 3080,
  exlusive: true
}, () => {
  console.log('Open server on', server.address());
});
