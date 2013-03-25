// Standard Gov Banner display code
$('#gov-link-3').on('click', function(e) {

	e.preventDefault();

	$('html').addClass('active-gov-bar-search');

});

// Active Elements
$('a[data-active]').on('click', function(){
	
	// Active attribute class 
	var activeClass = $(this).attr('data-active');
	var selectedClass = "active";

	// Check to see if the item is active
	if ($('html').hasClass(activeClass)) {

		// Remove active state class from header
		$('html').removeClass(activeClass);

		// Remove active state class from the clicked element
		$(this).removeClass(selectedClass);

	} else {

		// Add active state class from header
		$('html').addClass(activeClass);

		// Add active state class from clicked element
		$(this).addClass(selectedClass);

	}


});

