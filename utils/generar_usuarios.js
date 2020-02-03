//Código para añadir manualmente usuarios a la base de datos.

const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://localhost:27017/recetasV3');

const AES = require("crypto-js/aes");

Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'nacho',
    password: AES.encrypt('12345678', 'secret key 123')
});

usu1.save();

let usu2 = new Usuario({
    login: 'arturo',
    password: AES.encrypt('12345678', 'secret key 123')
});

usu2.save();

let usu3 = new Usuario({
    login: 'victor',
    password: AES.encrypt('12345678', 'secret key 123')
});

usu3.save();