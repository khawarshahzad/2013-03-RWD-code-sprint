/*global Modernizr:false */

// Google API key: AIzaSyCgz5MUhOPerkL5AJl7u7dJnRrmKelzZJA

$(document).ready(function(){

  function show_map(position) {
    var latlng, myOptions, map, marker;

    latlng = new google.maps.LatLng(42.65163, -73.7595);
    myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeControl: false,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"Agency Building 1, Empire State Plaza, Albany, NY 12203"
    });
  }

});
