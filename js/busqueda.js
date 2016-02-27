var backendUrl = "http://54.201.234.52/";
var press = false;
var allData = [];

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
    $('.title').animate({'opacity' : '0'}, 800);
    $('.title-mini').animate({'opacity' : '1'}, 800);
    pressed = true;
    // fetch data from backend
    getBackendData();
  }
}

var openDialog = function(data) {
  $.ajax({url : backendUrl + 'pis/get/' + data,
    success: function(response) {
      var object = response[0];
      //set title
      $('#modalTitle').html(object.titol);

      //set description
      $('#modalDescription').html(object.descripcio);
      //set ofereixo
      var ofereixo = "";
      if (object.ofereixo != undefined) {
        for (var i = 0; i < object.ofereixo.length; i++) {
          ofereixo += '<li>' + object.ofereixo[i] + '</li>';
        }
      }
      $('#modalOfrezco').html(ofereixo);

      //set necessito
      var necessito = "";
      if (object.busco != undefined) {
          for (var i = 0; i < object.busco.length; i++) {
            necessito += '<li>' + object.busco[i] + '</li>';
          }
      }
      $('#modalBusco').html(necessito);

      //set images
      if (object.foto != undefined) {
        var images = "";
          for (var i = 0; i < object.foto.length; i++) {
            var id = "openImagePopUp('"+object.foto[i]+"');";
            images += '<div onClick="'+id+'" class="col-xs-12 col-sm-6 col-md-4 modalFoto" style="background-image: url(' + backendUrl + 'uploads/' + object.foto[i] + ')"></div>';
          }
        $('#modalImages').html(images);
      }

      // show dat face!
      $('#myModal').modal('show');
    }
  });
};
var showRequestedData = function(data) {
  var element;
  var id = "openDialog('" + data._id + "');";
  if (data.foto != undefined) {
    element = '<div onClick="'+id+'" class="col-xs-12 col-sm-6 col-md-4 anunci" style="background-image: url('+backendUrl + '/uploads/' + data.foto[0]+')"><h3>' + data.titol + '</h3><h5>' + data.ciutat + '</h5></div>';
  } else {
    element = '<div class="col-xs-12 col-sm-6 col-md-4 anunci"><img src="images/pis.jpg" ><h3>' + data.titol + '</h3><h5>' + data.ciutat + '</h5></div>';
  }
  return element;
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
      $('#anuncis-id').html(content);
    }
  });
};

var openImagePopUp = function(image) {
  $.magnificPopup.open({
  items: {
    src: backendUrl + 'uploads/' + image
  },
  type: 'image'
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
  $.ajax({url : backendUrl + 'pis/getList',
    success: function(response) {
      var content = "";
      for (var i = 0; i < response.length; i++) {
        allData.push(response[i].ciutat);
        allData.push(response[i].titol);
      }
      $("#busqueda-input").typeahead({ source:allData });
    }
  });
});
$(window).resize(resizeInput);
