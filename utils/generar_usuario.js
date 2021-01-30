const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const Prodcuts = require(__dirname + '/../models/producto');
const bcrypt = require('./bcrypt');

mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3', { useNewUrlParser: true,
useUnifiedTopology:true });

let pass1 = '';
let pass2 = '';


async function generarUsuarios() {
    pass1 = await bcrypt.encriptar('1234')
    pass2 = await bcrypt.encriptar('5678');

    let usu1 = new Usuario({
        login: 'dani',
        password: pass1
    });
    usu1.save().then(x => {
        console.log(x);
    }).catch(y => {
        console.log(y)
    });

    let usu2 = new Usuario({
        login: 'nando',
        password: pass2
    });
    
    usu2.save().then(x=>{
        console.log(x);
        
    }).catch(err=>{
        console.log(err);
    });
}
//Prodcuts.collection.drop();
//Usuario.find().then(x=>console.log(x))
Prodcuts.find().then(x=>console.log(x))

let newProduct = new Prodcuts({  //Creamos el nuevo objeto con los valores correspondientes                                               
    nombre: 'fg',
    precio: parseInt('34'),
    descripcion: 'req.body.descripcion',
    imagen: 'req.file.filename'
});
/*newProduct.save().then(x=>{
    console.log(x)
}).catch(err => console.log(err))
//generarUsuarios();*/



