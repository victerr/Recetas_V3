//Servicios para gestionar la autenticación de los usuarios en la web.
const express = require('express');
let Usuario = require(__dirname + '/../models/usuario.js');
let router = express.Router();

var CryptoJS = require("crypto-js");

router.get('/login', (req, res) => {
    res.render('auth_login');
});


router.post('/login', (req, res) => {
    Usuario.find().then(usuarios => {
    
    let existeUsuario = usuarios.filter(usuario =>
        usuario.login == req.body.login && CryptoJS.AES.decrypt(usuario.password, 'secret key 123').toString(CryptoJS.enc.Utf8) == req.body.password
    );
        
    if (existeUsuario.length > 0) {
        req.session.usuario = existeUsuario[0].login;
        res.redirect('/admin/recetas');
    } else {
        res.render('auth_login',
            { error: "Usuario incorrecto" });
    }
});
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;