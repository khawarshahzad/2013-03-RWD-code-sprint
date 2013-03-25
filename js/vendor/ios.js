/**
 * iOS Fixes
 * Contains fixes for various iOS bugs
 */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
 https://github.com/scottjehl/iOS-Orientationchange-Fix
*/
(function(w){

  // This fix addresses an iOS bug, so return early if the UA claims it's something else.
  var ua = navigator.userAgent;
  if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
    return;
  }

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
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
      if( enabled ){
        disableZoom();
      }
        }
    else if( !enabled ){
      restoreZoom();
        }
    }

  w.addEventListener( "orientation

    change", restoreZoom, false );
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
function cancelZoom()
{
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
        viewport.content = content + (event.type == 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
    }

    // We could use DOMFocusIn here, but it's deprecated.
    this.addEventListener('focus', changeViewport, true);
    this.addEventListener('blur', changeViewport, false);
}

// jQuery-plugin
(function($)
{
    $.fn.cancelZoom = function()
    {
        return this.each(cancelZoom);
    };

    // Usage:
    $('input:text,select,textarea').cancelZoom();
})(jQuery);
