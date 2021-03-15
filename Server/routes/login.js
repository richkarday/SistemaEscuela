const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const app = express()

app.post('/login', (req, res) => {
    let body = req.body

    User.findOne({ email: body.email}, (err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false, 
                err
            });
        }

        if(!usrDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: '*Usuario y/o contraseña incorrectas'
                }
            });
        }

        if(!bcrypt.compareSync(body.password, usrDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Usuario y/o *contraseña incorrectas'
                }
            })
        }

        return res.status(200).json({
            ok: true,
            usuario: {
                usrDB,
                msg: 'Bienvenido'
            }
        });
    });
});

module.exports = app;