var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mensajes = [];

app.use(express.static('public'));

io.on("connection", function(socket) {
    console.log("El usuario " + socket.id + " se ha conectado.");

    socket.emit("all-messages", mensajes);

    socket.on("new-message", function(data) {
        data.usuario = socket.id;
        mensajes.push(data);
        io.sockets.emit("all-messages", mensajes);
    });

    socket.on("disconnect", function(event) {
        console.log("El usuario " + socket.id + " se ha desconectado.");
    });

});

http.listen(8080, function() {
    console.log("¡Chat en funcionamiento!");
});