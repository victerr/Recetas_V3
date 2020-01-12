//Servicios para la gestión de recetas.
const express = require('express');
let Receta = require(__dirname + '/../models/receta.js');
let router = express.Router();

router.get('/', (req, res) => {
    Receta.find().populate('elementos.ingrediente').then(resultado => {
        if (resultado.length !== 0) {
            res.status(200).send({ ok: true, resultado: resultado });
        }
        else {
            res.status(500).send({ ok: false, error: 'No se encontraron recetas' });
        }
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error obteniendo las recetas." })
    });
});

router.get('/:id', (req, res) => {
    Receta.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        }
        else {
            res.status(500).send({ ok: false, error: 'Receta no encontrada' });
        }
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error obteniendo la receta." + req.params['id'] })
    });
});

router.post('/', (req, res) => {
    let nuevaReceta = new Receta({
        titulo: req.body.titulo,
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        imagen: req.body.imagen
    });
    nuevaReceta.save().then(resultado => {
        if (resultado)
            res.status(200).send({ ok: true, resultado: resultado });
        else
            res.status(500).send({ ok: false, error: "Error insertando receta" });
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error insertando la receta." })
    });

});

router.put('/:id', (req, res) => {
    Receta.findByIdAndUpdate(req.params['id'],
        {
            $set: {
                titulo: req.body.titulo,
                comensales: req.body.comensales,
                preparacion: req.body.preparacion,
                coccion: req.body.coccion,
                imagen: req.body.imagen
            }
        }, { new: true }

    ).then(resultado => {
        if (resultado)
            res.status(200).send({ ok: true, resultado: resultado });
        else
            res.status(500).send({ ok: false, error: "No se ha encontrado la receta." });
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error obteniendo la receta." + req.params['id'] })
    });;
});

router.post('/elementos/:id', (req, res) => {
    Receta.findByIdAndUpdate(req.params['id'], {
        $push: {
            elementos: req.body.elementos
        }
    }, { new: true }

    ).then(resultado => {
        if (resultado)
            res.status(200).send({ ok: true, resultado: resultado });
        else
            res.status(500).send({ ok: false, error: "No se ha encontrado la receta." });
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error modificando elementos de la receta."})
    });;
});

router.delete('/:id', (req, res) => {
    Receta.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(500).send({ ok: false, error: "No se ha encontrado la receta." });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error eliminando receta" });
        });
});

router.delete('/elementos/:idReceta/:idElemento', (req, res) => {
    Receta.findByIdAndUpdate(req.params['idReceta'], {
        $pull: {
            elementos: { ingrediente: { id: req.params['idElemento'] } }
        }
    }, {
        new: true
    }).then(resultado => {
        if(resultado)
            res.status(200).send({ ok: true, resultado: resultado });
        else
            res.status(500).send({ ok: false, error: "No se ha encontrado la receta." });
    }).catch(error => {
        res.status(400)
        .send({ ok: false, error: 'Error modificando elementos de la receta'});
    });
});


module.exports = router;