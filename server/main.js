// Aplicación Express
var express = require('express');
var app = express();
// Servidor HTTP
var server = require('http').Server(app);
// Servidor de WebSockets
var io = require('socket.io')(server);
// Mensajes del chat de prueba
var mensajes = [{
    author: "Carlos",
    text: "Hola! que tal?"
}, {
    author: "Pepe",
    text: "Muy bien! y tu??"
}, {
    author: "Paco",
    text: "Genial!"
}];

// Ruta de los ficheros públicos estáticos
app.use(express.static('public'));

// Servidor atento a nuevas conexiones de usuarios
io.on('connection', function(socket) {
    console.log('¡Alguien se ha conectado!');
    // Emisión de mensajes del chat
    socket.emit('messages', mensajes);

    // Servidor atento a nuevos mensajes de los usuarios
    socket.on('new-message', function(data) {
        // Añadir el nuevo mensaje al array 'mensajes'
        mensajes.push(data);
        // Emitir los mensajes a todos los usuarios conectados
        io.sockets.emit('messages', mensajes);
    });
});



// Servidor escuchando en el puerto 8080
server.listen(8080, function() {
    console.log('¡Chat en funcionamiento!');
});
