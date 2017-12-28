const message = require('./lib/message-worker');
const configs = require('./configs/client');
const commands = require('./lib/commands');
const readline = require('readline-sync');
const net = require('net');

configs.username = `User${ new Date().getTime() }`;

const hostPattern = /^(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])){3}$/;
const portPattern = /^\d{1, 4}$/;

const socket = new net.Socket();

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
    message.showInfoMessage(`${ key }: ${ configs[key] }`);
  }
});

commands.add('-set username', 'Set username', () => {
  configs.username = readline.question('Set your username: ');
  message.showSystemMessage('Username changed');
  process.stdin.resume();
});

commands.add('-set port', 'Set port', () => {
  const res = readline.question('Set port: ');
  if(portPattern.test(res)) {
    configs.port = res;
    message.showSystemMessage('Port changed');
  }
  else {
    message.showErrorMessage('New port is not valid');
  }
  process.stdin.resume();
});

commands.add('-set host', 'Set host', () => {
  const res = readline.question('Set host: ');
  if(hostPattern.test(res)) {
    configs.host = res
    message.showSystemMessage('Host changed');
  }
  else {
    message.showErrorMessage('New host is not valid');
  }
  process.stdin.resume();
});

commands.add('-connect', 'Connection with server', () => {
  const { port, host } = configs;
  socket.connect(port, host);
});

socket.on('connect', () => {
  message.showSystemMessage('Connection established');
}).on('data', data => {
  console.log(data);
}).on('end', () => {
  message.showSystemMessage('Connection is broken');
}).on('error', err => {
  if(err) {
    switch(err.code) {
      case 'ECONNREFUSED':
        message.showErrorMessage('Server is not found');
        break;
      default:
        throw err;
    }
  }
});

message.showInfoMessage('For connection to use -connect');
message.showInfoMessage('For getting more information to use use -help');

/*const net = require('net');

const client = net.createConnection({ port: 3080 }, () => {
  client.write(`Client ${ new Date().getTime() }`);
  console.log('Server connected');
}).on('data', data => {
  console.log(data.toString());
}).on('error', err => {
  if (err) {
    end();
  }
}).on('end', () => end);

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', data => {
  client.write(data);
});

const end = () => {
  console.log('Server was closed! Check ENTER.');
  client.destroy();
  process.stdin.end();
  process.stdin.end();
};
*/