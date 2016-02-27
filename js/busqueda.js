var backendUrl = "http://54.201.234.52/";
var press = false;

var resizeInput = function(){
     $('.busqueda').css({'margin-top': $('.bg').height() / 2 + 'px'});
};
var getLeftMargin = function() {
  var busquedaWidth = $('.busqueda').width();
  return busquedaWidth - busquedaWidth / 4;
};
var moveSearchBox = function() {
  if ($('#busqueda-input').val() != '') {
  	$('.busqueda').animate({'margin-top':25+'px'},800);
  	$('.busqueda').find("input").animate({'height': 40 + 'px','font-size': '100%'},800);
    $('.busqueda').find('i').removeClass("fa-2x");
    $('.busqueda-avanzada').animate({'padding-top' : 10 + 'px'}, 800);
    $('.busqueda-avanzada').find('span').animate({'font-size' : '16' + 'px'}, 800);
    $('.busqueda-avanzada').find('span').animate({'margin-left' : getLeftMargin() + 'px'}, 800);
  	$('.search-button').animate({'padding': 4 + 'px'},800);
  	$('.bg').animate({'height': '110' + 'px'},800);
    $('.anuncis').animate({'opacity':'1'},800);
    $('.anuncis').animate({'margin-top':'5rem'},800);
    pressed = true;
    // fetch data from backend
    getBackendData();
  }
}

var showRequestedData = function(data) {
  return '<div class="col-xs-12 col-sm-6 col-md-4 anunci"><img src="images/pis.jpg" ><h3>' + data.titol + '</h3><h5>' + data.ciutat + '</h5></div>';
};

var getBackendData = function() {
  $.ajax({url : backendUrl + 'pis/getList',
    success: function(response) {
      var content = "";
      for (var i = 0; i < response.length; i++) {
        var item = response[i];
        if (item.ciutat.toUpperCase().indexOf($('#busqueda-input').val().toUpperCase()) > -1 || item.titol.indexOf($('#busqueda-input').val()) > -1 ) {
          content += showRequestedData(item);
        }
      }
      // $('#anuncis-id').html(content);
    }
  });
};

$(".search-button").click(moveSearchBox);

$(document).keypress(function(e) {
    if(e.which == 13) {
        if ($('#busqueda-input').is(':focus')) {
          moveSearchBox();
        }
    }
});
$(document).ready(function() {
  resizeInput();
});
$(window).resize(resizeInput);
