const message = require('./lib/message-worker');
const configs = require('./configs/client');
const commands = require('./lib/commands');
const readline = require('readline-sync');
const net = require('net');

configs.username = `User${ new Date().getTime() }`;

const hostPattern = /^(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])){3}$/;
const portPattern = /^\d{1, 4}$/;

const socket = new net.Socket();
let connection = false;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', data => {
  data = data.substring(0, data.length - 2);
  if (!commands.make(data) && connection) {
    socket.write(data);
  }
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
  if (!connection) {
    configs.username = readline.question('Set your username: ');
    message.showSystemMessage('Username changed');
    process.stdin.resume();
  } else {
    message.showErrorMessage('Username changing is impossible');
  }
});

commands.add('-set port', 'Set port', () => {
  if (!connection) {
    const res = readline.question('Set port: ');
    if (portPattern.test(res)) {
      configs.port = res;
      message.showSystemMessage('Port changed');
    } else {
      message.showErrorMessage('New port is not valid');
    }
    process.stdin.resume();
  } else {
    message.showErrorMessage('Port changing is impossible');
  }
});

commands.add('-set host', 'Set host', () => {
  if (!connection) {
    const res = readline.question('Set host: ');
    if (hostPattern.test(res)) {
      configs.host = res;
      message.showSystemMessage('Host changed');
    } else {
      message.showErrorMessage('New host is not valid');
    }
    process.stdin.resume();
  } else {
    message.showErrorMessage('Username changing is impossible');
  }
});

commands.add('-connect', 'Connection with server', () => {
  if (!connection) {
    const { port, host } = configs;
    socket.connect(port, host);
  } else {
    message.showErrorMessage('Operation is impossible');
  }
});

commands.add('-exit', 'Close programm', () => {
  connection && socket.end();
  process.stdin.end();
});

socket.on('connect', () => {
  message.showSystemMessage('Connection established');
  connection = true;
  socket.write(configs.username);
}).on('data', data => {
  message.showMessage(data.toString());
}).on('end', () => {
  connection = false;
  message.showSystemMessage('Connection is broken');
}).on('error', err => {
  if (err) {
    switch (err.code) {
      case 'ECONNREFUSED':
        message.showErrorMessage('Server is not found');
        break;
      case 'ECONNRESET':
        message.showErrorMessage('Server is not answered');
        connection = false;
        break;
      default:
        console.log(err);
        throw err;
    }
  }
});

message.showInfoMessage('For connection to use -connect');
message.showInfoMessage('For getting more information to use use -help');
