const express = require('express');
const _ = require('underscore')
const Career = require('../models/carreer');
const app = express()

app.get('/career', (req,res) => {
    Career.find()
    .exec((err, carrera) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            carrera
        });
    });
}); 

app.post('/career', (req, res) => {
    let body = req.body;
    let career = new Career({
        nombre: body.nombre
    });

    career.save((err, carrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            carrDB
        });
    });
});

app.put('/carerr', (req, res) => {
    let id = req.body.id
    let body = _.pick(req.body, ['id', 'nombre']);
    
    Career.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, carrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            carrDB
        });
    });
});

app.delete('/carerr', (req, res) => {
    let id = req.body.id

    Career.deleteOne({ _id: id }, (err, resp) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Carrera no encontrada'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: {
                id,
                msg: 'Carrera eliminada'
            }
        });
    }); 
});


module.exports = app;
