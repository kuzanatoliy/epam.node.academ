const winston = require('winston');
const messager = require('../message-worker');

const listeners = new Map();

const add = (name, socket) => {
  listeners.set(name, socket);
  allSend(messager.createInfoMessage(`User ${ name } joined`));
  //winston.info(`Add listener ${ name }`);
};

const remove = name => {
  listeners.delete(name);
  allSend(messager.createInfoMessage(`User ${ name } leave chat`));
 // winston.info(`Remove listener ${ name }`);
};

const send = (name, message) => {
  allSend(messager.createUserMessage(name, message));
  //winston.info(`Listener ${ name } send message`);
};

const allSend = message => {
  listeners.forEach(item => item.write(message));
};

module.exports = {
  add,
  remove,
  send
};
