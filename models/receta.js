//Declararión y exportación del esquema de mongoose de Receta.
const mongoose = require('mongoose');

let recetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        trim: true,
        required: true,
        minlength: 5
    },
    comensales: {
        type: Number,
        required: true,
        min: 1
    },
    preparacion: {
        type: Number,
        required: true,
        min: 1
    },
    coccion: {
        type: Number,
        required: true,
        min: 0
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    elementos: [{
        ingrediente: {
            type: String,
            required: true,
            min: 3
        },
        cantidad: {
            type: Number,
            min: 1,
            required: true
        },
        unidad: {
            type: String,
            required: true,
            minlength: 5
        }
    }]
});

let Receta = mongoose.model('receta', recetaSchema);

module.exports = Receta;