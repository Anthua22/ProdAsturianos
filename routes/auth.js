const express = require('express');
const Usuario = require(__dirname + './../models/usuario');
const bcrypt = require(__dirname + './../utils/bcrypt');

let router = express.Router();

router.get('/login', (req, res) => {

    res.render('auth_login');
});

router.post('/login', (req, res) => {
    Usuario.find({
        login: req.body.login //comprobamos que existe el ususario con el login que se le pasa
    }).then(x => {
        if (x.length) {
            bcrypt.desincriptar(req.body.password, x[0].password).then(bool => { //comprobamos la contraseña si es correcta
                if (bool) {
                    req.session.usuario = x[0]; //si es correcta redirigimos a /admin y sino renderizamos la vista de login mostrando un error
                    res.redirect('/admin/productos');
                } else {
                    res.render('auth_login', { error: "Contraseña incorrecta" });
                }
            }).catch(err => {
                res.render('auth_login', { error: err });
            })
        }else{
            res.render('auth_login', { error: "Usuario no encontrado" });
        }


    }).catch(err => {
        res.render('publico_error');
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;