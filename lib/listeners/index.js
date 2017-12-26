const winston = require('winston');

const listeners = {};

const add = (name, socket) => {
  listeners[name] = socket;
  allSend(`User ${ name } joined`);
  winston.info(`Add listener ${ name }`);
};

const remove = name => {
  listeners[name].destroy();
  delete listeners[name];
  allSend(`User ${ name } leave chat`);
  winston.info(`Remove listener $`);
};

const send = (name, message) => {
  allSend(`${ name }: ${ message }`);
  winston.info(`Listener ${ name } send message`);
};

const allSend = message => {
  for (let index in listeners) {
    listeners[index].write(message);
  }
};

module.exports = {
  add,
  remove,
  send
};
