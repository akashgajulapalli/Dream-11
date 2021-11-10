// npm dependencies
const helmet            = require('helmet');
const compression       = require('compression');

//default export of modules
module.exports = (app) => {
    app.use(helmet());
    app.use(compression());
}