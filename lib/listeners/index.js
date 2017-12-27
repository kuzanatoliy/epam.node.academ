const winston = require('winston');

const listeners = new Map();

const add = (name, socket) => {
  listeners.set(name, socket);
  allSend(`User ${ name } joined`);
  winston.info(`Add listener ${ name }`);
};

const remove = name => {
  listeners.delete(name);
  allSend(`User ${ name } leave chat`);
  winston.info(`Remove listener ${ name }`);
};

const send = (name, message) => {
  allSend(`${ name }: ${ message }`);
  winston.info(`Listener ${ name } send message`);
};

const allSend = message => {
  listeners.forEach(item => item.write(message));
};

module.exports = {
  add,
  remove,
  send
};
