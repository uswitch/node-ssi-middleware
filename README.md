# Node SSI Middleware

SSI for Express node.js applications.

## Usage
```javascript
import Express from 'express';
const NodeSsiMiddleware = require('node-ssi-middleware');
const ssiOptions = {
  includes: {
    '/includes': 'https://www.uswitch.com',
    '/custom':   'https://www.custom.com'
  }
};

Express.use(NodeSsiMiddleware(ssiOptions))
       .listen(3000);
```

## Notes
- Not used in production, recommended for development and test environments only.

## Dependencies
- [node SSI](https://github.com/uswitch/node-ssi)
