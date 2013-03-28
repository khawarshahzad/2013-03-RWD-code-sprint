var sticky_page_scroll = function() {

	var sticky_element_id = "site-bar",
	pageContainer = "page",
	addedStickys = {
		"global_nav": {
			"top": 48
		}
	},

	min_y_distance = 0, 
	initial_y_pos;

	var initialize = function() {
		if(!document.getElementById(sticky_element_id)){
			setTimeout(function(){sticky_page_scroll.initialize();},5);
		}
		else{
			
			// Save the initial vertical position of the element so we can find our threshold again later on...
			initial_y_pos=find_pos(document.getElementById(sticky_element_id))[1];

			// Attach event handlers to watch changes in page scroll or dimensions...
			if (window.addEventListener) {

				// For modern versions of IE and for FF, etc.
				window.addEventListener("scroll",scroll);
				window.addEventListener("resize",scroll);

			} else {

				// For older versions of IE that support this method rather than addEventListener...
				window.attachEvent("onscroll",scroll);
				window.attachEvent("onresize",scroll);

			}

			// Go ahead and do the scroll check once right now before anything else happens (in case we've refreshed the page and are already scrolled down the page, for example)
			scroll();
		}
		//congratualtions, you are now initialized!
	}

	var find_pos = function(element){
		var curleft = curtop = 0;
		if(element.offsetParent){
			do{
				curleft += element.offsetLeft;
				curtop += element.offsetTop;
			}while(element = element.offsetParent);
		}
		return [curleft,curtop];
	}

	var posTop = function(){
		return typeof window.pageYOffset != 'undefined' ?  window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
	}

	var scroll = function(){
		var y = posTop(); //number of px we have so far scrolled down the page
		if(y>initial_y_pos-min_y_distance-1){
			
			// if we have scrolled more than our initial position, less the padding, less 1, then we switch up to fixed positioning and set our "top" value to the amount of padding we wanted...
			document.getElementById(sticky_element_id).style.position="fixed";
			document.getElementById(sticky_element_id).style.top=min_y_distance + "px";
			document.getElementById(sticky_element_id).style.zIndex=3000;

		}
		else{
			//otherwise, we assign absolute positioning and clear out the "top" value (setting it to zero, for my needs)...
			document.getElementById(sticky_element_id).style.position="absolute";
			document.getElementById(sticky_element_id).style.top="0px";
			document.getElementById(sticky_element_id).style.zIndex="";
		}
	}

	return {
		//make the initialize and scroll functions public so that we can use them...
		initialize:initialize,
		scroll:scroll,
		posTop: posTop
	};

}();