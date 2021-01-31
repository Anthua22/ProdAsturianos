const express = require('express');

const Producto = require(__dirname + '/../models/producto.js');
const upload = require(__dirname + './../utils/uploadImagen');


let router = express.Router();


router.get('/', (req, res) => {
    Producto.find().then(resultado => {
        res.render('admin_productos', { productos: resultado })

    }).catch(err => {
        console.log(err)
        res.render('admin_error', { error: 'Error en la aplicación' })
    });
});

router.get('/nuevo', (req, res) => {
    res.render('admin_productos_form');
});

router.get('/editar/:id', (req, res) => {
    Producto.findById(req.params['id']).then(resultado => {
        res.render('admin_productos_form', { producto: resultado });
    }).catch(err => {
        res.render('admin_error', { error: 'Error en la aplicación' });
    })

})

router.get('/comentarios/:id', (req, res) => {

    Producto.findById(req.params['id'])
        .then(resultado => {
            if (resultado) {//Comprobamos si el id existe, sino existe nos devuelve null la promesa
                res.render('admin_productos_comentario', { producto: resultado });
            } else {
                res.status(400).send({
                    ok: false, error: "Producto no encontrado"
                });
            }

        }).catch(err => {
            res.status(500).send({
                ok: false, error: err
            });
        });
});


router.post('/', upload.single('imagen'), (req, res) => {

    let newProduct = new Producto({  //Creamos el nuevo objeto con los valores correspondientes                                               
        nombre: req.body.nombre,
        precio: parseInt(req.body.precio),
        descripcion: req.body.descripcion,
        imagen: req.file.filename
    });

    newProduct.save().then(x => {//Insertamos el producto
        res.redirect(req.baseUrl);
    }).catch(err => {
        console.log(err);
        res.render('admin_error', { error: err });
    });


});


router.put('/:id', upload.single('imagen'), (req, res) => {
    //Comprobamos que tienen valor todos los campos indispensable para que así ningún campo luego se ponga a null 
    //y no se pierda la información que había antes
    if (req.file) {

        Producto.findByIdAndUpdate(req.params['id'], {
            $set: {
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                imagen: req.file.filename
            }
        }, {
            new: true
        }).then(x => {

            res.redirect(req.baseUrl);


        }).catch(err => {

            res.render('admin_error', { error: 'Error en la aplicación' });

        })
    }
    else {
        Producto.findByIdAndUpdate(req.params['id'], {
            $set: {
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion
            }
        }, {
            new: true
        }).then(x => {
            if (x) {
                res.redirect(req.baseUrl);
            } else {
                res.render('admin_error', { error: 'Error modificando el producto' });
            }

        }).catch(err => {

            res.render('admin_error', { error: 'Error modificando el producto' });

        })
    }

});

router.post('/comentarios/:idProducto', (req, res) => {
    let newComentario = {
        nombre: req.session.usuario.login,
        comentario: req.body.comentario
    }
    Producto.findByIdAndUpdate(req.params['idProducto'], {//Buscamos el producto y insertamos en el array comentario el nuevo comentario
        $push: {
            comentarios: newComentario
        }
    }, {
        new: true
    }).then(x => {
        if (x) {//Comprobamos si existía el id sino existía devolvería null
            res.redirect(req.baseUrl+'/comentarios/'+req.params['idProducto']);
        } else {
            res.render('admin_error', { error: 'No existe el producto' })
        }
    }).catch(err => {
        res.render('admin_error', { error: 'Error en la aplicación' })

    })
})

router.delete('/:id', (req, res) => {
    Producto.findByIdAndRemove(req.params['id']).then(result => {
        console.log(result)
        if (result) {
            res.redirect(req.baseUrl);
        }

    }).catch(err => {
        res.render('admin_error', { error: 'Error en la aplicación' })
    })
});


router.delete('/comentarios/:idProducto/:idComentario', (req, res) => {
    Producto.findByIdAndUpdate(req.params['idProducto'], {
        $pull: {
            comentarios: { _id: req.params['idComentario'] }
        }
    },
        {
            new: true
        }).then(x => {
            if (x) {//Comprobamos si existía el comentario sino existía devolvería null
                res.redirect('/admin/comentarios/'+req.params['idProducto']);
            } else {
                res.render('admin_error',{error:'No existe el comentario'})
            }

        }).catch(err => {
            res.render('admin_error',{error:'Error en la aplicación'});
        })
});



module.exports = router;