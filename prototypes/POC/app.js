// Standard Gov Banner display code
$('#gov-link-3').on('click', function(e) {

	e.preventDefault();

	$('body').addClass('active-gov-bar-search');

});

// Active Elements
$('a[data-active]').on('click', function(event){

	// Prevent Defaults
	event.preventDefault();

	function removeOtherActive(active) {

		// Get the old active class to remove from the body tag
		var activeClass = active.attr('data-active');

		// Remove the old active class
		$('body').removeClass(activeClass);

		// Remove the active class from the old active item
		active.removeClass('active');

	}

	// Active attribute class 
	var activeClass = $(this).attr('data-active'),
		selectedClass = "active";

	console.log($(this));
	console.log($('.active'));

	// Check to see if the item is active
	if ($('body').hasClass(activeClass)) {

		// Remove active state class from header
		$('body').removeClass(activeClass);

		// Remove active state class from the clicked element
		$(this).removeClass(selectedClass);

	} else {

		// Add active state class from header
		$('body').addClass(activeClass);

		// Add active state class from clicked element
		$(this).addClass(selectedClass);

	}

});

