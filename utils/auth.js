//Fragmento de código utilizado para la protección de rutas en otros archivos.

let autenticacion = (req, res, next) => {
    if (req.session && req.session.usuario)
        return next();
    else
        res.redirect('/auth/login');
};

module.exports = autenticacion;