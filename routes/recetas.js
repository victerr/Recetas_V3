//Servicios para la gestión de recetas.
const express = require('express');
let Receta = require(__dirname + '/../models/receta.js');
let router = express.Router();

router.get('/', (req, res) => {
    Receta.find().then(resultado => {
        if (resultado.length !== 0) {
            res.render('admin_recetas',
                { recetas: resultado });
        }
         else {
            res.render('admin_recetas',
            { error: "No hay recetas en la base de datos." });
        } 
    }).catch(error => {
        res.render('admin_error');
    });
});


/* router.get('/:id', (req, res) => {
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
}); */

router.get('/nueva', (req, res) => {
    res.render('admin_recetas_form')/* .catch(error => {
        res.render('admin_error'); 
    });*/
});


router.get('/editar/:id', (req, res) => {
    Receta.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('admin_recetas_form', { receta: resultado });
        }
        else {
            res.render('admin_error', { error: "Receta no encontrada" });
        }
    }).catch(error => {
        res.render('admin_error');
    });
})

/**
 * Falta multer para las imágenes
 */
router.post('/', (req, res) => {
    let nuevaReceta = new Receta({
        titulo: req.body.titulo,
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        elementos: {
            ingrediente: req.body.ingrediente,
            cantidad: req.body.cantidad,
            unidad: req.body.unidad
        }
    });
    nuevaReceta.save().then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl);
        /* else
            res.status(500).send({ ok: false, error: "Error insertando receta" }); */
    }).catch(error => {
        res.render('admin_error');
    });

});

/**
 * Falta multer para las imágenes
 */
router.put('/:id', (req, res) => {
    /* let recetaActualizada;
    if (req.body.imagen !== null) {
        nuevaReceta = {
            titulo: req.body.titulo,
            comensales: req.body.comensales,
            preparacion: req.body.preparacion,
            coccion: req.body.coccion,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        }
    }
    else {
        nuevaReceta = {
            titulo: req.body.titulo,
            comensales: req.body.comensales,
            preparacion: req.body.preparacion,
            coccion: req.body.coccion,
            descripcion: req.body.descripcion
        }
    } */
    Receta.findByIdAndUpdate(req.params['id'],
        {
            $cond: {
                if: req.body.imagen,
                $set: {
                    titulo: req.body.titulo,
                    comensales: req.body.comensales,
                    preparacion: req.body.preparacion,
                    coccion: req.body.coccion,
                    descripcion: req.body.descripcion,
                    imagen: req.body.imagen
                }, $set: {
                    titulo: req.body.titulo,
                    comensales: req.body.comensales,
                    preparacion: req.body.preparacion,
                    coccion: req.body.coccion,
                    descripcion: req.body.descripcion
                }
            }

        }, { new: true }

    ).then(resultado => {
        if (resultado)
            res.redirect(req.url);
        /* else
            res.status(500).send({ ok: false, error: "No se ha encontrado la receta." }); */
    }).catch(error => {
        res.render('admin_error');
    });
});

/* router.post('/elementos/:id', (req, res) => {
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
        res.status(400).send({ ok: false, error: "Error modificando elementos de la receta." })
    });;
}); */

router.delete('/:id', (req, res) => {
    Receta.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.redirect(req.url);
            /* else
                res.status(500).send({ ok: false, error: "No se ha encontrado la receta." }); */
        }).catch(error => {
            res.render('admin_error');
        });
});

/* router.delete('/elementos/:idReceta/:idElemento', (req, res) => {
    Receta.findByIdAndUpdate(req.params['idReceta'], {
        $pull: {
            elementos: { ingrediente: { id: req.params['idElemento'] } }
        }
    }, {
        new: true
    }).then(resultado => {
        if (resultado)
            res.status(200).send({ ok: true, resultado: resultado });
        else
            res.status(500).send({ ok: false, error: "No se ha encontrado la receta." });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: 'Error modificando elementos de la receta' });
    });
}); */


module.exports = router;