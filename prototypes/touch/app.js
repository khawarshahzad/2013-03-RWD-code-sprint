$(document).ready(function() {
  var $out = $('#out'),
      logType = function (type) {
        $out.prepend('<li>' + type + '</li>');
      };

  // Touch is supported
  if (Modernizr.touch) {
    $('#notouch').hide();
    $('#hastouch').show();
  }

  $('#in')
    .on(exlsr.activateEventName, function (evt) {
      logType(evt.type);
    })
    .on('longTap', function (evt) {
      logType(evt.type);
    })
    .on('swipeLeft', function (evt) {
      logType(evt.type);
    })
    .on('swipeRight', function (evt) {
      logType(evt.type);
    });
});
