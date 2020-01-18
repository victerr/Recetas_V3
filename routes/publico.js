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
                receta.titulo == busqueda);

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
    Receta.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('publico_receta', { receta: resultado });
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