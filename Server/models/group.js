const mongoose = require('mongoose');

let Schema = mongoose.Schema
const User = require('./users')
const Career = require('./carreer')

let groupSchema = new Schema({
    clave: {
        type: String,
        //required: [true, 'Ingrese una clave al grupo']
    },
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    carrera: {
        type: Schema.Types.ObjectId,
        ref: 'Career'
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }
});

module.exports = mongoose.model('Group', groupSchema);