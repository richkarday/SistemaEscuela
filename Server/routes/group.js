const express = require('express');
const _ = require('underscore')
const Group = require('../models/group');
const User = require('../models/users');
const Career = require('../models/carreer');
const Lesson = require('../models/lesson');
const app = express();

app.get('/group', (req, res) => {
    Group.find({}, (err, group) => {
        User.populate(group, {path: "member"}, (err, group) => {
            Career.populate(group, {path: "carrera"}, (err, group) => {
                Lesson.populate(group, {path: "lesson"}, (err, group) => {
                    if(err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    return res.status(200).json({
                        ok: true,
                        group
                    });
                })
            });
        });
    });
});


app.post('/group', (req, res) => {
    let body = req.body

    let group = new Group({
        clave: body.clave,
        member: body.member,
        carrera: body.carrera,
        lesson: body.lesson
    });

    group.save((err, groupDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            groupDB
        });
    });
});

app.put('/group', (req, res) => {
    let id = body.req.id;
    let body = _.pick(req.body, ['id', 'clave', 'member', 'carrera', 'lesson']);

    Group.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, groupDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            groupDB
        });
    }); 
});

app.delete('/group', (req, res) => {
    let id = req.body.id

    Group.deleteOne({ _id: id }, (err, resp) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(res.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Grupo no encontrado'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: {
                id,
                msg: 'Grupo eliminado correctamente'
            }
        });
    });
});

module.exports = app;