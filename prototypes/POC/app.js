// Active Governor Banner
$('#gov-pull-down').on('click', function(e) {

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

	if ($('html').hasClass('active-site-search')) {

		$('html').removeClass('active-site-search');
		$(this).removeClass('close-button');

	} else {

		$('html').addClass('active-site-search');
		$(this).addClass('close-button');
		
	}

});

// Activate the menu on mobile (Toggle Version)
$('#mobile-site-menu').on('click', function(e) {

	e.preventDefault();

	if ($('html').hasClass('active-site-menu')) {

		$('html').removeClass('active-site-menu');
		$(this).removeClass('close-button');

	} else {

		$('html').addClass('active-site-menu');
		$(this).addClass('close-button');
		
	}

});