var socket = io.connect();

$(document).ready(function () {
    socket.on('sale_broadcast', function (result) {
		$("li ul#ul_"+result.person).remove();
		$("li").append("<ul id=\"ul_"+result.person+"\">"+result.person+" "+result.amount+"</ul>")
    });
});