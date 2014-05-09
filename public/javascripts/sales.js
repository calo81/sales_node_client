var socket = io.connect();

$(document).ready(function () {
    socket.on('sale_broadcast', function (result) {
		$("li ul#ul_"+result.person).remove();
		$("li").append("<ul id=\"ul_"+result.person+"\">"+result.person+" "+result.amount+"</ul>")
    });
	
    socket.on('all_sales', function (results) {
		keys = Object.keys(results);
		keys.forEach(function(key){
		  $("li").append("<ul id=\"ul_"+results[key].person+"\">"+results[key].person+" "+results[key].amount+"</ul>")
		})
    });
});