/*global Modernizr: false, exlsr: false */

$(document).ready(function() {
  var $out = $('#out'),
      $html = $('html'),
      $mobile = $('#mobile'),
      $deskop = $('#desktop');

  // Show appropriate messages and check the right box

  // Playground demo only
  if (/Chrome\/\d+/.test(navigator.userAgent)) {
    $('html').addClass('chrome');
  }

  // Touch is supported
  if (Modernizr.touch) {
    $('#mobile').attr('checked', true);
  }
  // Touch not supported
  else {
    $('#desktop').attr('checked', true);
  }

  $('#in')
    .on('tap', function (evt) { // exlsr.activateEventName
      $out.text('You tapped!').addClass('alert-box success');
    })
    .on('longTap', function (evt) {
      $out.text('You tapped and held!').addClass('alert-box success');
    })
    .on('swipeLeft', function (evt) {
      $out.text('You swiped left!').addClass('alert-box success');
    })
    .on('swipeRight', function (evt) {
      $out.text('You swiped right!').addClass('alert-box success');
    });

  // Tap Targets

  $('.switch').on(exlsr.activateEventName, function (evt) {
    if ($mobile.is(':checked')) {
      $html
        .addClass('touch')
        .removeClass('no-touch');
    }
    else {
      $html
        .removeClass('touch')
        .addClass('no-touch');
    }
  });
});
