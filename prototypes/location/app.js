/*global Modernizr:false */

// Google API key: AIzaSyCgz5MUhOPerkL5AJl7u7dJnRrmKelzZJA

$(document).ready(function(){
  var $img = $('#map');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Success:
      show_map,
      // Failure:
      showDefaultMap('Could not find your location.')
    );
  }
  else {
    showDefaultMap();
  }

  function show_map(position) {
    var latitude = position.coords.latitude,
        longitude = position.coords.longitude;

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeControl: false,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
    });

    $('.status').html('You are at ' + latitude + ', ' + longitude);

    // $img.attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C' + latitude + ',' + longitude + '&sensor=false');
  }

  function showDefaultMap(msg) {
    msg = msg || 'Your device does not support geolocation.';

    $('.status').html(msg);

    // $img.attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Ccolor:red%7Clabel:C%7C40.718217,-73.998284&sensor=false');
  }

});
