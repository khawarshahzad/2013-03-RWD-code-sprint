/*
*  How to load a feed via the Feeds API.
*/

google.load("feeds", "1");

// Our callback function, for when a feed is loaded.
function feedLoaded(result) {
  if (!result.error) {
    // Grab the container we will put the results into
	  var container = document.getElementById("GovWidget");
	  container.innerHTML = '';
	
	  // Loop through the feeds, putting the titles onto the page.
	  // Check out the result object for a list of properties returned in each entry.
	  // http://code.google.com/apis/ajaxfeeds/documentation/reference.html#JSON
	  var div = document.createElement("div");
	  var monthNames = [ "January", "February", "March", "April", "May", "June",
	                   "July", "August", "September", "October", "November", "December" ]; //Used to Display Months
	  for (var i = 0; i < result.feed.entries.length; i++) {
	    var entry = result.feed.entries[i]; 
	    //For all options available see: https://developers.google.com/feed/v1/devguide#resultJson
	    var p = document.createElement("p");
	    var a = document.createElement("a");
	    var strong = document.createElement("strong");
	    var br = document.createElement("br");
	    var title = '';
	    var dte = new Date(entry.publishedDate);
	
	    strong.innerHTML = monthNames[dte.getMonth()]  + " " + dte.getDate() + ", " + dte.getFullYear();//Format Publish Date
	  
	    title = _StringShort(entry.title,50); //Set length where string gets cut off
	  
	    a.setAttribute('href', entry.link);
	    a.setAttribute('title', title);
	     
	    a.innerHTML = title;
	      
	    p.appendChild(strong);
	    p.appendChild(br);
	    p.appendChild(a);
	      
	    div.appendChild(p);
	      
	  }
	  container.appendChild(div);
  }
}

function _StringShort(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
		return str;
	else
		return String(str).substring(0,n) + '...';
}

function OnLoad() {
  // Create a feed instance that will grab Digg's feed.
  var feed = new google.feeds.Feed("http://www.governor.ny.gov/gov.xml");//Governors Feed

  //Set the number of Entries to Return
  feed.setNumEntries(3);
  
  // Calling load sends the request off.  It requires a callback function.
  feed.load(feedLoaded);
  
  //Function return's a JSON response by Default
}