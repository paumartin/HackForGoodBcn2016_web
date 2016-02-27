$('.dropdown-menu a').on('click', function(){    
    $('.dropdown-toggle').html($(this).html() + ' <span class="caret"></span>');    
});

$(document).ready(function(){
    $(".form-control").tooltip(); 
});