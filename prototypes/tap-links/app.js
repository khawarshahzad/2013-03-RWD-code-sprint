/*global Modernizr: false, exlsr: false */

$(document).ready(function() {
  var $out = $('#out'),
      $html = $('html'),
      $mobile = $('#mobile'),
      $deskop = $('#desktop');

  // Show appropriate messages and check the right box

  // Touch is supported
  if (Modernizr.touch) {
    $('#mobile').attr('checked', true);
  }
  // Touch not supported
  else {
    $('#desktop').attr('checked', true);
  }

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
