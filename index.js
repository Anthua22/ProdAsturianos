const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');
const session = require('express-session');
const middleware =  require(__dirname+'/utils/auth');

//Enrutadores
const productos = require(__dirname + '/routes/productos'); 
const publico = require(__dirname + '/routes/publico');
const auth = require(__dirname + '/routes/auth');

// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


let app = express();


// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');


// Carga de middleware y enrutadores
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));

//Method Override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object'
        && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
     
        return method;
    }
 
}));


//Configuración de sesiones
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

//Enrutadores
app.use('/', publico);
app.use('/admin', middleware,productos);
app.use('/auth', auth)

// Puesta en marcha del servidor
app.listen(8080);
