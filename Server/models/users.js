const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    matricula: {
        type: Number,
        required: [true, 'Pon la matrícula'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'Pon el nombre del usuario']
    },
    email: {
        type: String,
        required: [true, 'Pon el correo del usuario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Pon una contraseña']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    }
});

// userSchema.plugin(uniqueValidator, {
//     message: '{PATH} need to be unique and different'
// });

module.exports = mongoose.model('User', userSchema);
