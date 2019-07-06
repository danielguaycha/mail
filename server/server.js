const express = require('express');

const http = require('http');
const path = require('path');
const fileUpload = require('express-fileupload');//uploads Files
const parser = require('body-parser');
const sequelize = require('./connect');


const app = express();


const server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// middlewares
app.use(express.static(publicPath));
app.use(fileUpload());
app.use(require('./upload'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// Rutas

app.use('/api', require('./routes/emai'))

// Conexion
sequelize.authenticate().then( () => {
    server.listen(port, (err) => {
        if (err) throw new Error(err);
        console.log(`Servidor corriendo en puerto ${ port }`);       
        //let email = require('./controllers/sender');
        //email.senderMail("daniel@mail.com", "danielguaycha@gmail.com", "Subject", "Donde esta !!!");
    });
}).catch( err => {
    console.log(err);
    console.log(`Error al conectar con la base de datos`);
})



// IO = Comunicación del Backend
//module.exports.io = socketIO(server);
//require('./sockets/sockets')
//const socketIO = require('socket.io');