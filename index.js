const SSI = require('node-ssi');

const NodeSsiMiddleware = (options) => {
  const opts = Object.assign({}, { encoding: 'utf-8' }, options);
  const ssi = new SSI(opts);

  return (req, res, next) => {
    const acceptHeader = req.headers['accept'];

    if(acceptHeader && acceptHeader.match("text/html")) {
      const sendFn = res.send;

      res.send = (body) => {
        const prm = new Promise((resolve, reject) => {
          ssi.compile(body, (err, content) => {
            err && reject(body) || resolve(content);
          });
        });

        prm.then(sendFn.bind(res))
           .catch(sendFn.bind(res));
      };
    }

    next();
  };
};

module.exports = NodeSsiMiddleware;
