const express = require('express');
const jwt = require('jsonwebtoken');

let Receta = require(__dirname + '/../models/receta.js');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('publico_index');/* .catch(error => {
        res.render('publico_error');
    }); */
});

router.post('/buscar', (req, res) => {
    let busqueda = req.body.titulo;
    Receta.find().then(resultado => {
        if (resultado) {
            let rectetasFiltradas = resultado.filter(receta =>
                receta.titulo.toLowerCase().includes(busqueda) && busqueda.length>0);

            if (rectetasFiltradas.length > 0) {
                res.render('publico_index',
                    { recetas: rectetasFiltradas });
            } else {
                res.render('publico_index',
                    { error: "No se encontraron recetas" });
            }
        }
    }).catch(error => {
        res.render('publico_error');
    });
});

router.get('/receta/:id', (req, res) => {
    Receta.findById(req.params['id']).then(receta => {
        if (receta) {
            res.render('publico_receta', { receta: receta });
        }
        else {
            res.render('buscar',
                { error: "Receta no encontrada" });
        }
    }).catch(error => {
        res.render('publico_error');
    });
});

module.exports = router;