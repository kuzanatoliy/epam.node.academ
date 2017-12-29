const commands = new Map();

const add = (command, description, action) => commands.set(command, {description, action});

const remove = command => commands.delete(command);

const show = () => commands.forEach((item, key) => console.log(`${ key } : ${ item.description }`));

const make = command => {
  const res = commands.get(command);
  if (res) {
    res.action();
    return true;
  }
  return false;
};

module.exports = {
  add,
  remove,
  show,
  make
};
