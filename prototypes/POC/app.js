// Standard Gov Banner display code
$('#gov-link-3').on('click', function(e) {

	e.preventDefault();

	$('html').addClass('active-gov-bar-search');

});

// Active Elements
$('a[data-active]').on('click', function(event){

	// Prevent Defaults
	event.preventDefault();

	function removeOtherActive(active) {

		// Get the old active class to remove from the html tag
		var activeClass = active.attr('data-active');

		// Remove the old active class
		$('html').removeClass(activeClass);

		// Remove the active class from the old active item
		active.removeClass('active');

	}

	// Active attribute class 
	var activeClass = $(this).attr('data-active'),
		selectedClass = "active";

	// Check to see if there is another active item by looking for the active class
	if ($('.active').length) {
		
		//alert("there is something else open");
		removeOtherActive($('.active'));

	}


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

