const mongoose = require('mongoose');

let UsuarioSchema = new mongoose.Schema({
    login: {
        required: true,
        type: String,
        trim: true,
        min: 5,
        unique: true
    },
    password: {
        required: true,
        type: String,
        min: 8,
        trim: true
    }
});

let Usuario = mongoose.model('usuario', UsuarioSchema);
module.exports = Usuario;
