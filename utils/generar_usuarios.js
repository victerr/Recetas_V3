const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://localhost:27017/recetasV3');

Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'nacho',
    password: '1234'
});

usu1.save();

let usu2 = new Usuario({
    login: 'arturo',
    password: '5678'
});

usu2.save();

let usu3 = new Usuario({
    login: 'victor',
    password: 'victor'
});

usu3.save();