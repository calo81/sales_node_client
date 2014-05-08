var socket = io.connect();

$(document).ready(function () {
    socket.on('sale', function (result) {
		alert('yay')
    });
});