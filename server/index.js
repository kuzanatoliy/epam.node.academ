const http = require('http');
const url = require('url');
const UrlPattern = require('url-pattern');
const querystring = require('querystring');
const Res = require('../lib/utils/respons');

const routers = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: []
};

const getRouter = (method, data) => {
  let key = method;
  if (key === 'POST') {
    const { id, value } = data.post;
    if (id && !value) {
      key = 'DELETE';
    } else if (id && value) {
      key = 'PUT';
    }
  }
  return routers[key];
};

const defaultAction = (req, res) => {
  Res.notFoundError(res);
};

const routing = (req, res) => {
  let data = {};
  let postData = '';

  const pathname = url.parse(req.url).pathname;

  req.setEncoding('utf8');

  req.on('data', data => {
    postData += data;
  });

  req.on('end', () => {
    const router = getRouter(req.method, data);
    postData && (data.post = querystring.parse(postData));
    let i = 0;
    let action;
    for (; i < router.length; i++) {
      const urlData = router[i].pattern.match(pathname);
      if (urlData) {
        action = router[i].action;
        data.url = urlData;
        break;
      }
    }
    (action || defaultAction)(req, res, data);
  });
};

const start = port => {
  http.createServer(routing).listen(port || 8888, () => console.log(`Server was started on port - ${ port }`));
};

const use = (url, action) => {
  get(url, action);
  post(url, action);
  del(url, action);
  put(url, action);
};

const get = (url, action) => {
  routers.GET.push({ pattern: new UrlPattern(url), action });
};

const post = (url, action) => {
  routers.POST.push({ pattern: new UrlPattern(url), action });
};

const del = (url, action) => {
  routers.DELETE.push({ pattern: new UrlPattern(url), action });
};

const put = (url, action) => {
  routers.PUT.push({ pattern: new UrlPattern(url), action });
};

module.exports = {
  start,
  use,
  get,
  post,
  del,
  put
};
