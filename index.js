//Archivo principal. Se inicia la conexión y se declaran y vinculan los enrutadores, base de datos, motor de plantillas, etc.

// Librerías externas
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');


// Enrutadores
//const ingredientes = require(__dirname + '/routes/ingredientes');
const recetas = require(__dirname + '/routes/recetas');
const publico = require(__dirname + '/routes/publico');
const auth = require(__dirname + '/routes/auth');

// Conexión con la BD
mongoose.connect('mongodb://localhost:27020/recetasV3',
    { useNewUrlParser: true });
let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));

app.use(session(
    {
        secret: '1234',
        resave: true,
        saveUninitialized: false,
        expires: new Date(Date.now() + (30 * 60 * 1000))
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Carga de middleware y enrutadores
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object'
        && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
//app.use('/ingredientes', ingredientes);
app.use('/admin', recetas);
app.use('/', publico);
app.use('/auth', auth);

// Puesta en marcha del servidor
app.listen(8080);