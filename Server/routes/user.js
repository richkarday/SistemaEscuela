const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/users');
const app = express();

app.get('/usuario', (req, res) => {
    User.find()
    .exec((err, usuario) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            count: usuario.length,
            usuario
        });
    });
}); 

app.post('/usuario', (req, res) => {
    let body = req.body;

    let user = new User({
        matricula: body.matricula,
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false, 
                err
            });
        }

        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.put('/usuario', (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['id', 'nombre', 'email', 'password', 'role']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.delete('/usuario', (req, res) => {
    let id = req.body.id

    User.deleteOne({ _id: id}, (err, resp) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }   
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Usuario no encontrado'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: {
                id,
                msg: 'Usuario eliminado correctamente'
            }
        })
    })
})



module.exports = app;
