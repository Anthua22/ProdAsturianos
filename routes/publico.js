const express = require('express');
const Producto = require(__dirname + './../models/producto');

let router = express.Router();


router.get('/', (req, res) => {
    Producto.find().then(resultado => {
        res.render('publico_index', { productos: resultado });

    }).catch(err => {
        res.render('publico_error');
    })
});

router.post('/buscar', (req, res) => {
    let nombre = req.body.nombre;
    let regex = new RegExp(nombre);
    Producto.find({
        nombre: regex
    }).then(resultado => {
        
        if(resultado.length>0){
            res.render('publico_index', { productos: resultado });
        }else{
            res.render('publico_index', { error: 'No se encontraron productos' });
        }
        
    }).catch(err => {
        res.render('publico_error');
    })
});

router.get('/producto/:id', (req, res) => {
    Producto.findById(req.params['id']).then(resultado => {
        res.render('publico_producto', { producto: resultado });
    }).catch(err => {
        res.render('publico_error');
    })

});

module.exports = router;

