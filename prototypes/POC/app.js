// Active Governor Banner
$('#gov-pull-down').on('click', function() {

	e.preventDefault();

	// Check to see if the governor banner is show or not
	if ($('html').hasClass('active-gov-bar')) {

		$('html').removeClass('active-gov-bar');

	} else {

		$('html').addClass('active-gov-bar');
	}

});

// Standard Gov Banner display code
$('#gov-link-3').on('click', function(e) {

	e.preventDefault();

	$('html').addClass('active-gov-bar-search');

});

// Activate the search bar on mobile
$('#mobile-site-search').on('click', function(e) {

	e.preventDefault();

	if ($('html').hasClass('active-mobile-site-search')) {

		$('html').removeClass('active-mobile-site-search')

	} else {

		$('html').addClass('active-mobile-site-search')
		
	}

});