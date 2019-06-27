var socket = io();
// Escuchar por defecto al server 
socket.on('connect', () => {
    console.log(`Conectado al servidor`);
})
socket.on('disconnect', () => {
    console.log(`Perdimos conexión con el servidor`);
})                

// Emitir mensaje al server

socket.emit('enviarMensaje', {
    usuario: 'Daniel',
    mensaje: 'Hola mundo'
}, (rsp) => {
    console.log(`Respuesta del server`, rsp);
});

// Escuchar info

socket.on('enviarMensaje', (message) => {
    console.log(`Servidor: `, message);
})