const mongoose = require('mongoose');

let ComentarioSchema = new mongoose.Schema({
    nombre:{
        required:true,
        type:String,
        trim:true
    },
    comentario:{
        required:true,
        type:String,
        trim:true,
        min:5
    }
});

module.exports= ComentarioSchema;