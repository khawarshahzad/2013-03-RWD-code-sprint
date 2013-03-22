// Active Governor Banner
document.getElementById('gov-pull-down').onclick = function() {

	// Check to see if the governor banner is show or not
	if ($('html').hasClass('active-gov-bar')) {

		$('html').removeClass('active-gov-bar');

	} else {

		$('html').addClass('active-gov-bar');
	}

}