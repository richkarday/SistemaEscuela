const express = require('express');
const app = express();

app.use(require('./user'));
app.use(require('./career'));
app.use(require('./group'));
app.use(require('./lesson'));
app.use(require('./login'));

module.exports = app;

