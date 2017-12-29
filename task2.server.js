const net = require('net');
const configs = require('./configs/server');
const listeners = require('./lib/listeners');
const commands = require('./lib/commands');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', data => {
  data = data.substring(0, data.length -2);
  commands.make(data);
});

commands.add('-help', 'Show help for program', () => {
  commands.show();
});

commands.add('-configs', 'Show configs', () => {
  for (let key in configs) {
    console.log(`${ key }: ${ configs[key] }`);
  }
});

commands.add('-users count', 'Show user count', () => {
  console.log(`Connected users: ${ listeners.count() }`);
});

commands.add('-show users', 'Show user list', () => {
  console.log('Connected users:');
  listeners.getUserList().forEach(item => console.log(item));
});

commands.add('-exit', 'Close programm', () => {
  process.stdin.end();
  listeners.clear();
  server.close();
});

const server = net.createServer(socket => {
  let clientName;

  socket.on('error', err => {
    if (err) {
      listeners.remove(clientName);
    }
  }).once('data', data => {
    clientName = data.toString();
    if ( listeners.add(clientName, socket)) {
      socket.on('data', data => {
        listeners.send(clientName, data.toString());
      }).on('end', () => {
        listeners.remove(clientName);
      });
    }
  });
}).on('error', err => {
  throw err;
}).on('close', () => {
  console.log('Close server');
});

server.listen({ ...configs, exlusive: true }, () => {
  console.log('Open server on', server.address());
});
