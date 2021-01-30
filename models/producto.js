const mongoose = require('mongoose');

const UsuarioSchema = require(__dirname+'/comentario.js')


let ProductoSchema = new mongoose.Schema({
    nombre:{
        required:true,
        type:String,
        min:3,
        trim:true
    },
    precio:{
        type: Number,
        min: 1
    },
    
    descripcion:{
        required:true,
        type:String,
        trim:true
    },

    imagen:{
        type:String,
        trim:true
    },
    
    comentarios:[UsuarioSchema]
});

let Producto = mongoose.model('producto',ProductoSchema);



module.exports= Producto;