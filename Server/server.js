require('./config/config');
require('./trigger/chageStream');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
},
    (err, resp) => {
        if(err) throw err;
        console.log('Base de datos conectada')
    }
)


app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: ', process.env.PORT);
})