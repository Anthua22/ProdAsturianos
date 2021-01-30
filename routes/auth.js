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
        bcrypt.desincriptar(req.body.password, x[0].password).then(bool => { //comprobamos la contraseña si es correcta
            if (bool) {
                req.session.usuario = x; //si es correcta redirigimos a /admin y sino renderizamos la vista de login mostrando un error
                res.redirect('/admin');
            }else{
                res.render('auth_login', { error: "Contraseña incorrecta" });
            }
        }).catch(err=>{
            res.render('auth_login', { error: err });
        })

    }).catch(err => {
        res.render('auth_login', { error: err });
    })
})



router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;