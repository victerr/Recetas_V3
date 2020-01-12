//Declararión y exportación del esquema de mongoose de Ingrediente.
const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;