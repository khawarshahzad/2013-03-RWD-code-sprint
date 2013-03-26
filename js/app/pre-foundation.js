/*global Modernizr:false */

var its = (function _its () {
  var activateEventName = 'click';

  // Determine click type
  if (Modernizr.touch) {
    activateEventName = 'tap';
  }

  function init () {
    // Init code here...
  }

  return {
    init: init,
    activateEventName: activateEventName
  };
}());

$(document).ready(function(){its.init();});
