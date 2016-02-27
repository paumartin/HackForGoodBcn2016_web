$('.dropdown-menu a').on('click', function(){    
    $('.dropdown-toggle').html($(this).html() + ' <span class="caret"></span>');    
});

$(document).ready(function(){
    $(".form-control").tooltip(); 
});

function addAnunci(){
	var titol = $("#titulo").val();
	var nom = $("#nombre").val();
	var cognoms = $("#apellidos").val();
	var descripcio = $("#descripcion").val();
	var ciutat = $("#ciudad").val();
	var direccio = $("#direccion").val();
	var telefon = $("#numero").val();
	var edatMin = $("#edatMin").val();
	var edatMax = $("#edatMax").val();
	/*var imatge = document.getElementById('imatge-in').files;*/

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://54.201.234.52/pis/save");
	xmlhttp.onreadystatechange = handleReadyStateChange;
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify({nom : nom, cognoms : cognoms,
	 titol : titol, descripcio : descripcio, ciutat : ciutat, direccio : direccio,
	 telefon : telefon, edatMin: edatMin, edatMax : edatMax}));

	function handleReadyStateChange() {
		var res = xmlhttp;
      if (res.readyState == 4) {
        if (res.status == 200) {
          	var id = JSON.parse(res.response)[0];

          	/*var formData = new FormData();
          	formData.append("foto", imatge);

        	var uploadImage = new XMLHttpRequest();
			uploadImage.open("POST", "http://54.201.234.52/plat/uploadImage/" + id);
			uploadImage.onreadystatechange = uploadImageResponse;
			uploadImage.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			uploadImage.send(formData);

			function uploadImageResponse() {
				console.log(uploadImage);
			}*/
        }
      }
    }
}

$(".formulari").submit(addAnunci);