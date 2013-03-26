/*
 Additional Login needed for off canvas Menus
*/

// Add control div to the top of the global nav element
$('<div id="menu-contorls" class="menu-contorls"><a href="#" id="menu-back" class="menu-back">Back</a></div>').prependTo('#global-nav')

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
			subMenu.addClass("active-sub-menu");
		});
	}

})

console.log(rootMenu);