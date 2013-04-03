/*global exlsr: false */
$(function(){
	$("#page, footer").find("a[href='#']").on(exlsr.activateEventName, function(e){
		e.preventDefault();
	});
	$("#demoBar").on(exlsr.activateEventName, function(e){
		e.preventDefault();
		$.getScript("../../js/app/demo-bar.js");
	});

  // Map
  if ($('.map-canvas').length) {
    var latlng, myOptions, map, marker;
    console.log('1');
    latlng = new google.maps.LatLng(42.65163, -73.7595);
    myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeControl: false,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($('.map-canvas').get(0), myOptions);
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"Agency Building 1, Empire State Plaza, Albany, NY 12203"
    });
  }
});
