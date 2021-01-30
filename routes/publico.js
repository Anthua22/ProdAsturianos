const express = require('express');
const Producto = require(__dirname + './../models/producto');

let router = express.Router();


router.get('/', (req, res) => {
    Producto.find().then(resultado => {
        res.render('publico_index', { productos: resultado });

    }).catch(err => {
        res.render('publico_error', { error: err });
    })
});

router.get('/buscar', (req, res) => {
    let nombre = req.body.nombre;
    Producto.find({
        nombre: {
            $regex: '/' + nombre + '/i'
        }
    }).then(resultado => {
        res.render('publico_producto', { productos: resultado });
    }).catch(err => {
        res.render('publico_error', { error: err });
    })
});


router.get('/producto/:id', (req, res) => {
    Producto.findById(req.params['id']).then(resultado => {
        res.render('publico_producto', { producto: resultado });
    }).catch(err => {
        res.render('publico_error', { error: err });
    })

});

module.exports = router;

