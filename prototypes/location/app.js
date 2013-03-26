/*global Modernizr:false */

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
    $('#status').html('You are at ' + latitude + ', ' + longitude);
    $img.attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C' + latitude + ',' + longitude + '&sensor=false');
  }

  function showDefaultMap(msg) {
    msg = msg || 'Your device does not support geolocation.';
    $('#status').html(msg);
    $img.attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Ccolor:red%7Clabel:C%7C40.718217,-73.998284&sensor=false');
  }

});
