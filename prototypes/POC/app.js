$(document).ready(function(){

	var $body = $('body');

	// Standard Gov Banner display code
	$('#gov-link-3').on('click', function(e) {

		e.preventDefault();

		$body.addClass('active-gov-bar-search');

	});

	// Active Elements
	$("[data-active]").on('click', function(event){

		// Prevent Defaults
		event.preventDefault();

		// Active attribute class
		var $activeClass = $(this).attr('data-active'),
			$activeElm = $('.active'),
			selectedClass = "active";

		// Function is used to close a pre-existing active items.
		function removeOtherActive(active) {

			// Get the old active class to remove from the body tag
			var activeClass = active.attr('data-active');

			// Remove the old active class
			$body.removeClass(activeClass);

			// Remove the active class from the old active item
			active.removeClass('active');

		}

		// Function for special functionality determined by the data-active value
		function specialEvents(activeElm) {
			switch (activeElm) {
				
				case "active-site-search":
					
					$('#site-search-box').focus();

					break;

				case "active-site-menu":

					if ($body.hasClass('active-sub-menu')) {
						//$('body').removeClass('active-sub-menu');
					}

					break;
			}
		}

		// Check to see if there is already and active item
		if ($activeElm.length > 0) {

			// Check to make sure its not the same as the currently clicked item

			if ($activeElm.attr('data-active') != $(this).attr('data-active')) {

				removeOtherActive($activeElm);
			}

		}

		// Check to see if the item is active
		if ($body.hasClass($activeClass)) {

			// Remove active state class from header
			$body.removeClass($activeClass);

			// Remove active state class from the clicked element
			$activeClass.removeClass(selectedClass);

		} else {

			// Add active state class from header
			$body.addClass($activeClass);

			// Add active state class from clicked element
			$activeClass.addClass(selectedClass);

		}

		// Check to see if anything special has to happen based on data-active value
		specialEvents($activeClass);

	});

});
