var SSI = require('node-ssi');

var NodeSsiMiddleware = function NodeSsiMiddleware(options) {
  var opts = Object.assign({}, { encoding: 'utf-8' }, options);
  var ssi = new SSI(opts);

  return function (req, res, next) {
    var acceptHeader = req.headers['accept'];

    if (acceptHeader && acceptHeader.match("text/html")) {
      var sendFn = res.send;

      res.send = function (body) {
        var prm = new Promise(function (resolve, reject) {
          ssi.compile(body, function (err, content) {
            err && reject(body) || resolve(content);
          });
        });

        prm.then(sendFn.bind(res)).catch(sendFn.bind(res));
      };
    }

    next();
  };
};

module.exports = NodeSsiMiddleware;
