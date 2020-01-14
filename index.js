//Archivo principal. Se inicia la conexión y se declaran y vinculan los enrutadores.

// Librerías externas
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Enrutadores
//const ingredientes = require(__dirname + '/routes/ingredientes');
const recetas = require(__dirname + '/routes/recetas');


// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/recetas',
    { useNewUrlParser: true });
let app = express();


// Carga de middleware y enrutadores
app.use(bodyParser.json());
//app.use('/ingredientes', ingredientes);
app.use('/recetas', recetas);


// Puesta en marcha del servidor
app.listen(8080);