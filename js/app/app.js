/*global Modernizr:false */

var exlsr = (function _exlsr () {
  var activateEventName = 'click',
      ua = navigator.userAgent,
      iOS= false;

  // Determine click type
  if (Modernizr.touch) {
    activateEventName = 'tap';
  }

  // Detect iOS
  if( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ){
    iOS = true;
  }

  function init () {
    // Init code here...
  }

  return {
    init: init,
    activateEventName: activateEventName,
    iOS: iOS
  };
}());

$(document).ready(function(){exlsr.init();});

if (Modernizr.touch) {
  // Zepto.js Touch Events
  // (c) 2010-2012 Thomas Fuchs
  // Zepto.js may be freely distributed under the MIT license.
  // Modified to work with jQuery 1.9.1 by NYS-ITS
  ;(function(){
    var touch = {},
        touchTimeout, tapTimeout, swipeTimeout,
        longTapDelay = 750, longTapTimeout;

    function parentIfText(node) {
      return 'tagName' in node ? node : node.parentNode;
    }

    function swipeDirection(x1, x2, y1, y2) {
      var xDelta = Math.abs(x1 - x2),
          yDelta = Math.abs(y1 - y2);
      return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
    }

    function longTap() {
      longTapTimeout = null;
      if (touch.last) {
        touch.el.trigger('longTap');
        touch = {};
      }
    }

    function cancelLongTap() {
      if (longTapTimeout) {
        clearTimeout(longTapTimeout);
      }
      longTapTimeout = null;
    }

    function cancelAll() {
      if (touchTimeout) { clearTimeout(touchTimeout); }
      if (tapTimeout) { clearTimeout(tapTimeout); }
      if (swipeTimeout) { clearTimeout(swipeTimeout); }
      if (longTapTimeout) { clearTimeout(longTapTimeout); }
      touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
      touch = {};
    }

    $(document).ready(function(){
      var now, delta;

      $(document.body)
        .bind('touchstart', function(e){
          now = Date.now();
          if (!e.touches && e.originalEvent && e.originalEvent.touches) {
            e.touches = e.originalEvent.touches; // jQuery compatibility
          }
          delta = now - (touch.last || now);
          touch.el = $(parentIfText(e.touches[0].target));
          if (touchTimeout) {
            clearTimeout(touchTimeout);
          }
          touch.x1 = e.touches[0].pageX;
          touch.y1 = e.touches[0].pageY;
          if (delta > 0 && delta <= 250) {
            touch.isDoubleTap = true;
          }
          touch.last = now;
          longTapTimeout = setTimeout(longTap, longTapDelay);
        })
        .bind('touchmove', function(e){
          cancelLongTap();
          if (!e.touches && e.originalEvent && e.originalEvent.touches) {
            e.touches = e.originalEvent.touches; // jQuery compatibility
          }
          touch.x2 = e.touches[0].pageX;
          touch.y2 = e.touches[0].pageY;
          if (Math.abs(touch.x1 - touch.x2) > 10) {
            e.preventDefault();
          }
        })
        .bind('touchend', function(e){
           cancelLongTap();

          // swipe
          if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
              (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {

            swipeTimeout = setTimeout(function() {
              touch.el.trigger('swipe');
              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
              touch = {};
            }, 0);
          }
          // normal tap
          else if ('last' in touch) {

            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap');
              event.cancelTouch = cancelAll;
              touch.el.trigger(event);

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                touch.el.trigger('doubleTap');
                touch = {};
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null;
                  touch.el.trigger('singleTap');
                  touch = {};
                }, 250);
              }

            }, 0);
          }
        })
        .bind('touchcancel', cancelAll);

      $(window).bind('scroll', cancelAll);
    });

    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(m){
      $.fn[m] = function(callback){ return this.bind(m, callback); };
    });
  })();
} // end if(Modernizr.touch)

/**
 * iOS Fixes
 * Contains fixes for various iOS bugs
 */
if (exlsr.iOS) {
  /*! A fix for the iOS orientationchange zoom bug.
   Script by @scottjehl, rebound by @wilto.
   MIT / GPLv2 License.
   https://github.com/scottjehl/iOS-Orientationchange-Fix
  */
  (function(w){

    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
      meta.setAttribute( "content", enabledZoom );
      enabled = true;
    }

    function disableZoom(){
      meta.setAttribute( "content", disabledZoom );
      enabled = false;
    }

    function checkTilt( e ){
      aig = e.accelerationIncludingGravity;
      x = Math.abs( aig.x );
      y = Math.abs( aig.y );
      z = Math.abs( aig.z );

      // If portrait orientation and in one of the danger zones
      if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ) {
        if( enabled ) {
          disableZoom();
        }
      }
      else if( !enabled ){
        restoreZoom();
      }
    }

    w.addEventListener( "orientation change", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );

  })( this );


  /**
   * iOS zooms on form element focus. This script prevents that behavior.
   */
  // https://gist.github.com/zachleat/2008932
  // * <meta name="viewport" content="width=device-width,initial-scale=1">
  //      If you dynamically add a maximum-scale where no default exists,
  //      the value persists on the page even after removed from viewport.content.
  //      So if no maximum-scale is set, adds maximum-scale=10 on blur.
  //      If maximum-scale is set, reuses that original value.
  // * <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=2.0,maximum-scale=1.0">
  //      second maximum-scale declaration will take precedence.
  // * Will respect original maximum-scale, if set.
  // * Works with int or float scale values.


  // jQuery-plugin
  (function($)
  {
    $.fn.cancelZoom = function()
    {
      return this.each(function() {
        var d = document,
            viewport,
            content,
            maxScale = ',maximum-scale=',
            maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;

        // this should be a focusable DOM Element
        if(!this.addEventListener || !d.querySelector) {
          return;
        }

        viewport = d.querySelector('meta[name="viewport"]');
        content = viewport.content;

        function changeViewport(event)
        {
          // http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
          viewport.content = content + (event.type === 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
        }

        // We could use DOMFocusIn here, but it's deprecated.
        this.addEventListener('focus', changeViewport, true);
        this.addEventListener('blur', changeViewport, false);
      });
    };
  })(jQuery);

  $(document).ready(function(){
    $('input:text,select,textarea').cancelZoom();
  });
} // end if(iOS)
