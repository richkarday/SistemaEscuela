const mongoose = require('mongoose');

let Schema = mongoose.Schema

let lessonSchema = new Schema({
    nombre: {
        type: Array,
        required: [true, 'Agregue un nombre a la materia']
    }
})

module.exports = mongoose.model('Lesson', lessonSchema);