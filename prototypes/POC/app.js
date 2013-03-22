// Active Governor Banner
$('#gov-pull-down').on('click', function() {

	// Check to see if the governor banner is show or not
	if ($('html').hasClass('active-gov-bar')) {

		$('html').removeClass('active-gov-bar');

	} else {

		$('html').addClass('active-gov-bar');
	}

});

// Standard Gov Banner display code
$('#gov-link-3').on('click', function() {

	$('html').addClass('active-gov-bar-search');

});