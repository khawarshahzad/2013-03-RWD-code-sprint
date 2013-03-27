/*
 Additional Login needed for off canvas Menus
*/

$(document).ready(function(){

	// Add control div to the top of the global nav element
	$('<div id="menu-controls" class="menu-controls"><a href="#" id="menu-back" class="menu-back">Back</a></div>').prependTo('#global-nav');

	// Find the global Dom and look for all a that have a child ul
	var rootMenu = $('#global-nav').find('a[href="#"]');

	rootMenu.each(function() {

		// Save off the link item just in case
		var link = $(this),
			subMenu = link.next('ul');

		// Check to see if there is a ul next to the anchor
		if (subMenu.length) {

			// We have a sub menu item so create the click event
			link.on('click', function(event){

				// Prevent default link action
				event.preventDefault();

				// Add a class to the menu.
				subMenu.addClass("active-menu");

				if (!$('body').hasClass('active-sub-menu')) {
					$('body').addClass('active-sub-menu');
				}
			});
		}

	});

	// Bind for menu-back
	$('#menu-back').on('click', function(){

		// Check to see if there is an active menu class
		var numberOfSubs = $('.active-menu');

		if (numberOfSubs.length > 0) {

			// Find the last occuance of the active menu and hide it
			numberOfSubs.last().removeClass('active-menu');

			// See if there are other menus
			if ($('.active-menu').length === 0) {
				$('body').removeClass('active-sub-menu');
			}

		}


	});

	// console.log(rootMenu);

});
