var socket = io.connect();
var sales = [];

function decorateNew(element) {
	$.playSound('/media/sounds-977-this-guitar');
    element.css("font-size","80px");
	element.css("background","green");	
	setTimeout(function(){ 
		element.css('font-size','20px'); 
		element.css("background","#ffffff");
	},2000)
}

function sortAll(){
	sales.sort(function(a, b) {
	    a = a[1];
	    b = b[1];

	    return a > b ? -1 : (a < b ? 1 : 0);
	});	
}

function indexOf(person){
	var index = 0; 
	sales.some(function(sale) {
	    if(sale[0] == person){
	    	return true;
	    }
		index++;
	});	
	return index+1;
}


(function($){

  $.extend({
    playSound: function(){
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
    }
  });

})(jQuery);

$(document).ready(function () {
    socket.on('sale_broadcast', function (result) {	
		if($("table tr#li_"+result.person).size() == 0){
		  sales.push([result.person,result.amount, result.quantity]);
		  $("table").append("<tr id=\"li_"+result.person+"\"></tr>")	
		}else{
		  sales[indexOf(result.person)] = [result.person,result.amount, result.quantity];	
		}
		sortAll();
		$("table tr#li_"+result.person).html("<td>"+result.person+"</td><td>"+result.quantity+"</td><td>£"+result.amount+"</td>");
	    decorateNew($("table tr#li_"+result.person));
		var position = indexOf(result.person);	
		var li = $("table tr#li_"+result.person);
		var insertInto = li.siblings(":eq("+(position)+")");
		if(insertInto.size() > 0){
		  $("table tr#li_"+result.person).remove();
		  li.insertBefore(insertInto);	
	    }
    });
	
    socket.on('all_sales', function (results) {
		sales=[];
		keys = Object.keys(results);
		keys.forEach(function(key){
		  sales.push([key, results[key]["amount"], results[key]["quantity"]]);
		})
		sortAll();
		sales.forEach(function(sale){
		  $("table").append("<tr id=\"li_"+sale[0]+"\"><td>"+sale[0]+"</td><td>"+sale[2]+"</td><td>£"+sale[1]+"</td></tr>")	
		});
    });
});