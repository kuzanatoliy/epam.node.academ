const net = require('net');
const winston = require('winston');

const clients = {};

const server = net.createServer((socket) => {
  let clientName;

  socket.on('error', err => {
    clients[clientName].destroy();
    delete clients[clientName];
    winston.info(`${ clientName } closed`);
  }).once('data', data => {
    clientName = data.toString();
    clients[clientName] = socket;
    socket.on('data', data => {
      winston.info(`${ clientName } send message`);
      const message = data.toString();
      for(let index in clients) {
        clients[index].write(`${ clientName }: ${ data }`);
      }
    })
  }).on('end', () => {
    console.log('end');
  });
}).on('error', (err) => {
  throw err;
}).on('close', (data) => {
  winston.info('Close server');
})

server.listen({
  host: 'localhost',
  port: 3080,
  exlusive: true
}, () => {
  winston.info('Open server on', server.address());
});
