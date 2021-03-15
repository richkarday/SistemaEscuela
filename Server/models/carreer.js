const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let careerSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese un nombre a la carrera']
    }
})

module.exports = mongoose.model('Career', careerSchema);
