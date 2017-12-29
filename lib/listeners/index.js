const messager = require('../message-worker');
const logger = require('../logger');

const listeners = new Map();

const add = (name, socket) => {
  if(listeners.has(name)) {
    socket.end(messager.createSystemMessage('User name already exist'));
    return false;
  }
  else {
    listeners.set(name, socket);
    allSend(messager.createInfoMessage(`User ${ name } joined`));
    logger.infoConnect(`Add listener ${ name }`);
    return true;
  }
};

const remove = name => {
  listeners.delete(name);
  allSend(messager.createInfoMessage(`User ${ name } leave chat`));
  logger.infoDisconnect(`Remove listener ${ name }`);
};

const send = (name, message) => {
  allSend(messager.createUserMessage(name, message));
  logger.infoSend(`Listener ${ name } send message`);
};

const allSend = message => {
  listeners.forEach(item => item.write(message));
};

const count = () => listeners.size;

const clear = (message) => {
  listeners.forEach(item => item.end());
  listeners.clear();
}

const getUserList = () => {
  const res = [];
  listeners.forEach((item, key) => res.push(key));
  return res;
}

module.exports = {
  add,
  remove,
  send,
  count,
  clear,
  getUserList
};
