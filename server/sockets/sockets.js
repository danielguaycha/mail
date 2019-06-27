const { io } = require('./../server')
io.on('connection', (client) => {
    
    //console.log(`Usuario conectado`);

    client.on('disconnect', () => {
        console.log(`Usuario desconectado`);  
    })

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);
        client.broadcast.emit('enviarMensaje', data);
        /*if(message.usuario){
            callback({
                mensaje: 'Ok'
            })
        }else{
            callback({
                mensaje: 'Mal'
            })
        }*/
    })


    // Emitir al cliente
    client.emit('enviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido a esta app'
    })
})