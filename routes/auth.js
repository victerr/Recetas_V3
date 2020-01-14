//Servicios para la autenticación
const express = require('express');
let Usuario = require(__dirname + '/../models/usuario.js');
let router = express.Router();


router.get('/login', (req, res) => {
    res.render('auth_login');
});


router.post('/login', (req, res) => {
    let usuarios = Usuario.find().then(usuarios => {
        usuarios = usuarios
    })
    let existeUsuario = usuarios.filter(usuario =>
        usuario.usuario == login && usuario.password == password);

    if (existeUsuario.length > 0) {
        req.session.usuario = existeUsuario[0].usuario;
        res.render(req.url);
    } else {
        res.render('auth_login',
            { error: "Usuario incorrecto" });
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})