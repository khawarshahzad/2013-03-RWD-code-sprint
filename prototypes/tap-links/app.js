/*global Modernizr: false, exlsr: false */

$(document).ready(function() {
  var $out = $('#out'),
      $html = $('html'),
      $mobile = $('#mobile'),
      $deskop = $('#desktop');

  // Show appropriate messages and check the right box

  // Touch is supported
  if ($html.is('.touch')) { // Modernizr.touch
    $('#mobile').attr('checked', true);
    console.log('[init] touch enabled, checking mobile box');
  }
  // Touch not supported
  else {
    $('#desktop').attr('checked', true);
    console.log('[init] no touch, checking desktop box');
  }

  $('.toggle-section').on(exlsr.activateEventName, function (evt) {
    console.log('[A] ' + exlsr.activateEventName + ' event fired');
    if ($(evt.target).closest('.mobile-label').length) {
      console.log('[B] mobile radio checked');
      $html
        .addClass('touch')
        .removeClass('no-touch');
    }
    else {
      console.log('[B] desktop radio checked');
      $html
        .removeClass('touch')
        .addClass('no-touch');
    }
  });
});
