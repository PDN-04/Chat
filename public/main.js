$(document).ready(function() {
    var socket = io.connect("http://localhost:8080", { "forceNew": true });

    socket.on("all-messages", function(data) {
        var html = data.map(function(elemento) {
            return "<div>" + "<strong>" + elemento.usuario + "</strong>: " + "<em>" + elemento.mensaje + "</em>" + "</div>";
        }).join(" ");
        $("#mensajes").html(html);
    });

    $("form").submit(function(evento) {
        evento.preventDefault();

        var data = {
            usuario: "",
            mensaje: $("#texto").val()
        };

        if (data.mensaje != "") {
            socket.emit("new-message", data);
        }
    });
});