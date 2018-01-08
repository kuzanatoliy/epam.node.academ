const textHeader = { 'Content-Type': 'text/plain' };

const jsonHeader = { 'Content-Type': 'application/json' };

const textRes = (res, text, code = 200) => {
  res.writeHead(code, textHeader);
  res.write(text);
  res.end();
};

const jsonRes = (res, json, code = 200) => {
  res.writeHead(code, jsonHeader);
  res.write(JSON.stringify(json));
  res.end();
};

const badRequestError = res => {
  jsonRes(res, { code: 400, message: 'Bad request' });
};

const notFoundError = res => {
  jsonRes(res, { code: 404, message: 'Page not found' }, 404);
};

const internalError = res => {
  jsonRes(res, { code: 500, message: 'Internal server error' }, 500);
};

module.exports = {
  jsonRes,
  textRes,
  badRequestError,
  notFoundError,
  internalError
};
