var resizeScreen = function() {
	$('#mainDiv').css({'margin-top' : ($(window).height() / 2) - $(window).height() / 2 * 0.2+'px'})
};

$(document).ready(resizeScreen);
$(window).resize(resizeScreen);