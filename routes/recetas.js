//Servicios para la gestión de recetas.

const express = require('express');
const multer = require('multer');
let Receta = require(__dirname + '/../models/receta.js');
let router = express.Router();

let autenticacion = require(__dirname + '/../utils/auth.js');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

let upload = multer({ storage: storage });

router.get('/', autenticacion, (req, res) => {
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


router.get('/recetas/nueva', autenticacion, (req, res) => {
    res.render('admin_recetas_form');
});


router.get('/recetas/editar/:id', autenticacion, (req, res) => {
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
router.post('/recetas', upload.single('imagen'), (req, res) => {
    let elemento1, elemento2, elemento3, elemento4 = null;

    if(req.body.ingrediente1 && req.body.cantidad1 && req.body.unidad1){
        elemento1 = {
            ingrediente: req.body.ingrediente1,
            cantidad: req.body.cantidad1,
            unidad: req.body.unidad1
        }
    };
    if(req.body.ingrediente2 && req.body.cantidad2 && req.body.unidad2){
        elemento2 = {
            ingrediente: req.body.ingrediente2,
            cantidad: req.body.cantidad2,
            unidad: req.body.unidad2
        }
    };
    if(req.body.ingrediente3 && req.body.cantidad3 && req.body.unidad3){
        elemento3 = {
            ingrediente: req.body.ingrediente3,
            cantidad: req.body.cantidad3,
            unidad: req.body.unidad3
        }
    };
    if(req.body.ingrediente4 && req.body.cantidad4 && req.body.unidad4){
        elemento4 = {
            ingrediente: req.body.ingrediente4,
            cantidad: req.body.cantidad4,
            unidad: req.body.unidad4
        }
    };

    let nuevaReceta = new Receta({
        titulo: req.body.titulo,
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        descripcion: req.body.descripcion,
        imagen: req.file.filename,
        elementos: [ elemento1, elemento2, elemento3, elemento4
        ]
    });

    nuevaReceta.save().then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl);
        else
            res.render('admin_error', {error: 'Error insertando la receta'});
    }).catch(error => {
        res.render('admin_error');
    });

});

router.put('/recetas/:id', upload.single('imagen'), (req, res) => {

    Receta.findByIdAndUpdate(req.params['id'], {
        $set: {
            titulo: req.body.titulo,
            comensales: req.body.comensales,
            preparacion: req.body.preparacion,
            coccion: req.body.coccion,
            descripcion: req.body.descripcion,
            elementos: [{
                ingrediente: req.body.ingrediente1,
                cantidad: req.body.cantidad1,
                unidad: req.body.unidad1
            },
            {
                ingrediente: req.body.ingrediente2,
                cantidad: req.body.cantidad2,
                unidad: req.body.unidad2
            },
            {
                ingrediente: req.body.ingrediente3,
                cantidad: req.body.cantidad3,
                unidad: req.body.unidad3
            },
            {
                ingrediente: req.body.ingrediente4,
                cantidad: req.body.cantidad4,
                unidad: req.body.unidad4
            }
         ]

        }
    }, { new: true }

    ).then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl);
         else
            res.status(500).send({ ok: false, error: "No se ha encontrado la receta." }); 
    }).catch(error => {
        res.render('admin_error');
    });
});


router.delete('/recetas/:id', (req, res) => {
    Receta.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.redirect(req.baseUrl);
            else
                res.render('admin_error', {error: 'Error liminando la receta'});
        }).catch(error => {
            res.render('admin_error');
        });
});


module.exports = router;