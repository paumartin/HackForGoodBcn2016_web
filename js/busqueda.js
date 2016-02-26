var resizeInput = function(){ 
     $('.busqueda').css({'margin-top': $(window).height()/2 + 'px'});
};

createAnuncis = function(){
	$('.anuncis').animate({'opacity':'1'},800);
}

var moveSearchBox = function(){
	$('.busqueda').animate({'margin-top':25+'px'},800);
	$('.busqueda').find("input").animate({'height': 40 + 'px','font-size': '100%'},800);
	$('.search-button').animate({'padding': 4 + 'px'},800);
	$('.bg').animate({'height': '100' + 'px'},800);
	createAnuncis();
}


$(document).ready(resizeInput);
$(window).resize(resizeInput);


$(".search-button").click(moveSearchBox);