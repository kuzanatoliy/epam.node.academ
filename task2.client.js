const net = require('net');

const client = net.createConnection({ port: 3080 }, () => {
  client.write(`Client ${ new Date().getTime() }`);
}).on('data', data => {
  console.log(data.toString());
}).on('error', err => {
  console.log('Server was closed! Check ENTER.');
  client.destroy();
  process.stdin.end();
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', data => {
  client.write(data);
});