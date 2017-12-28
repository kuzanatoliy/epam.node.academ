const colors = require('colors/safe');

const USER = 'user';
const SYSTEM = 'system';
const ERROR = 'error';
const INFO = 'info';

const createUserMessage = (name, message) => {
  return JSON.stringify({ type: USER, message, name });
};

const createSystemMessage = message => {
  return JSON.stringify({ type: SYSTEM, message });
};

const createErrorMessage = message => {
  return JSON.stringify({ type: ERROR, message });
};

const createInfoMessage = message => {
  return JSON.stringify({ type: INFO, message });
};

const showMessage = str => {
  const {type, message, name} = JSON.parse(str);
  switch(type) {
    case USER:
      showUserMessage(name, message);
      break;
    case SYSTEM:
      showSystemMessage(message);
      break;
    case ERROR:
      showErrorMessage(message);
      break;
    case INFO:
      showInfoMessage(message);
      break;
  }
}

const showUserMessage = (name, message) => {
  console.log(colors.white(`${ name }: ${ message }`));
}

const showSystemMessage = message => {
  console.log(colors.gray(message));
}

const showErrorMessage = message => {
  console.log(colors.red(message));
}

const showInfoMessage = message => {
  console.log(colors.yellow(message));
}

module.exports = {
  createErrorMessage,
  createInfoMessage,
  createSystemMessage,
  createUserMessage,
  showMessage,
  showErrorMessage,
  showInfoMessage,
  showSystemMessage,
  showUserMessage
}