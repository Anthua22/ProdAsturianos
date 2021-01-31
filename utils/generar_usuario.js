const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const bcrypt = require('./bcrypt');

mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Usuario.collection.drop();

let pass1 = '';
let pass2 = '';


async function generarUsuarios() {
    try {
        pass1 = await bcrypt.encriptar('1234')
        pass2 = await bcrypt.encriptar('5678');

        let usu1 = new Usuario({
            login: 'may',
            password: pass1
        });
        let usuario1 = await usu1.save();
        console.log(usuario1);


        let usu2 = new Usuario({
            login: 'nacho',
            password: pass2
        });

        let usuario2 = await usu2.save();
        console.log(usuario2);


    } catch (err) {
        console.error(err)
    }


}


generarUsuarios();



