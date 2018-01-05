const http = require('http');
const url = require('url');
const UrlPattern = require('url-pattern');
const querystring = require('querystring');

const routers = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: []
};

const defaultAction = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('Error: 404 - Page not found!');
  res.end();
};

const routing = (req, res) => {
  let data = {};
  let postData = '';

  const router = routers[req.method];
  const pathname = url.parse(req.url).pathname;

  req.setEncoding('utf8');

  req.on('data', data => {
    postData += data;
  });

  req.on('end', () => {
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
