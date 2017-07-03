// Conexión del cliente con el servidor de WebSockets
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

// Servidor atento al evento 'messages' (los mensajes del chat)
// La variable 'data' contiene todos los mensajes que envía el servidor
socket.on('messages', function(data) {
    // Mostrar a través de HTML los mensajes del chat
    mostrarMensajes(data);
});

// Crea la estructura HTML de los mensajes a partir del array 'mensajes'
function mostrarMensajes(data) {
    var html = data.map(function(elem, index) {
        return "<div>" + "<strong>" + elem.author + "</strong>: " + "<em>" + elem.text + "</em>" + "</div>";
    }).join(" ");

    document.getElementById('mensajes').innerHTML = html;
}

// Recoge los valores obtenidos del formulario y los envía por el servidor de WebSockets para que lo escuche el servidor
function anadirMensaje(evento) {
    // Nuevo mensaje en formato JSON
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    // Enviar mensaje al servidor de WebSockets a través del evento 'new-message'
    socket.emit('new-message', mensaje);
    return false;
}
