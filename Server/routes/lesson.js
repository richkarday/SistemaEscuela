const express = require('express');
const _ = require('underscore')
const Lesson = require('../models/lesson');
const app = express();

app.get('/lesson', (req, res) => {
    Lesson.find()
    .exec((err, lesson) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            lesson
        });
    });
});

app.post('/lesson', (req, res) => {
    let body = req.body
    
    let lesson = new Lesson({
        nombre: body.nombre
    });

    lesson.save((err, lessDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            lessDB
        });
    });
});

app.put('/lesson', (req, res) => {
    let id = req.body.id
    let body = _.pick(req.body, ['id', 'nombre'])

    Lesson.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, lessDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            lessDB
        });
    });
});

app.delete('/lesson', (req, res) => {
    let id = req.body.id

    Lesson.deleteOne({ _id: id }, (err, resp) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                resp: {
                    id,
                    msg: 'Materias no encontradas'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: {
                id,
                msg: 'Materias eliminadas'
            }
        });
    });
});


module.exports = app;
