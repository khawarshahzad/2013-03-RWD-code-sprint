/*global Modernizr: false, exlsr: false */

$(document).ready(function() {
  var $out = $('#out'),
      logType = function (type) {
        $out.prepend('<li>' + type + '</li>');
      },
      $html = $('html'),
      $mobile = $('#mobile'),
      $deskop = $('#desktop');

  // Show appropriate messages and check the right box

  // Touch is supported
  if (Modernizr.touch) {
    $('.show-on-desktop').hide();
    $('.show-on-touch').show();
    $('#mobile').attr('checked', true);
  }
  // Touch not supported
  else {
    $('.show-on-touch').hide();
    $('.show-on-desktop').show();
    $('#desktop').attr('checked', true);
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

  // Tap Targets

  // Force desktop display at the start
  // $html
  //   .removeClass('touch')
  //   .addClass('no-touch');

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
