/*global Modernizr: false */
var isIE = (/MSIE/.test(navigator.userAgent)),
    demoBar = function(){
        var d = document;
        d.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+
        d.title+
        '<\/title><link rel="stylesheet" href="http://nys-its.github.com/RWD-Demo/css/excelsior.css"><link rel="stylesheet" href="http://nys-its.github.com/RWD-Demo/css/styles.css"><\/head>' +
        '<body id="resize-bar-body">' +
        '<header>' +
        //'<div class="close"><a href="#">X<\/a><\/div>' +
        '<div id="size"><\/div>' +
        //'<div id="keyboard" class="keyboard"><a href="#">I<\/a><\/div>' +
        //'<div class="cssrefresh"><a href="#">I<\/a><\/div>' +
        '<div id="devices">' +
        '  <a href="#" class="tablet-landscape"><span>Tablet Landscape<\/span><\/a>' +
        '  <a href="#" class="tablet-portrait" id="tablet-landscape-joyride"><span>Tablet Portrait<\/span><\/a>' +
        '  <a href="#" class="smartphone-landscape"><span>iPhone Landscape<\/span><\/a>' +
        '  <a href="#" class="smartphone-portrait"><span>iPhone Portrait<\/span><\/a>' +
        '  <a href="#" id="desktop-view" class="auto active"><span>Desktop<\/span><\/a>' +
        '  <\/div><\/header><section><div id="wrapper"><iframe src="'+d.URL+'" onLoad="resbook.changeUrl(this.contentWindow.location,this.contentDocument.title);"><\/iframe><span class="keyboard-bg"><\/span><\/div><\/section><ol class="joyride-list" data-joyride>'+
        '  <li data-button="Next">'+
        '   <h4>Getting Started!<\/h4>'+
        '   <p>This tutorial will teach you how to use the "Resize Bar" available throughout the demo site.<\/p>'+
        '  <\/li>'+
        '  <li data-id="tablet-landscape-joyride">'+
        '   <h4>Choose a Device<\/h4>'+
        '   <p>Click any of these buttons to see how this site would look on various devices.<\/p><p><strong>Go ahead, click one now!<\/strong><\/p>'+
        '  <\/li>'+
        '  <li data-button="Yes!">'+
        '   <h4>Notice a Difference?<\/h4>'+
        '   <p>You are now viewing the same page at a smaller size.<\/p>'+
        '  <\/li>'+
        // '  <li data-id="keyboard" data-button="Next">'+
        // '   <h4>Show a Keyboard<\/h4>'+
        // '   <p>Clicking this button will show/hide a keyboard overlay.<\/p>'+
        // '  <\/li>'+
        '  <li data-id="desktop-view" data-button="Close">'+
        '   <h4>Desktop View<\/h4>'+
        '   <p>Clicking "Desktop" will bring you back to full screen mode.<\/p>'+
        '   <p>Go ahead and explore the Responsive demos now!<\/p>'+
        '  <\/li>'+
        '  </ol>  ' +
        '<script src="http://nys-its.github.com/RWD-Demo/js/vendor/jquery.js">' + '</sc' + 'ript>'+
        '<script src="http://nys-its.github.com/RWD-Demo/js/foundation/foundation.js">' + '</sc' + 'ript>'+
        '<script src="http://nys-its.github.com/RWD-Demo/js/foundation/foundation.joyride.js">' + '</sc' + 'ript>'+
        '<script src="http://nys-its.github.com/RWD-Demo/js/app/demo-bar-post.js">' + '</sc' + 'ript>'+
        '<\/body><\/html>');
    };

$(function(){
  if ( parent.$("#devices").length <=0 && !Modernizr.touch && !isIE) {
    demoBar();

    window.resbook = {};

    (function (rb) {
        var d = document,
            w = window,
            url = d.URL,
            title = d.title,
            wrapper = null,
            devices = null,
            close = null,
            //keyboard = null,
            body = null,
            size = null,
            auto = true,
            isResized = false,
            isAnimated = false,
            sizes = {
              smartphonePortrait: [320, 480],
              smartphoneLandscape: [480, 320],
              tabletPortrait: [768, 1024],
              tabletLandscape: [1024, 768],
              auto: 'auto'
            },
            resize = function (w, h, f) {
              w = w || wrapper.clientWidth;
              //h = h || wrapper.clientHeight;
              f = f || "Desktop";
              size.innerHTML = f; //w + 'x' + h
            },
            setPosition = function (wh, t, cl, myTxt) {
              var width = (wh === 'auto') ? w.innerWidth : wh[0],
                  height = (wh === 'auto') ? w.innerHeight : wh[1],
                  style = 'width:' + width + 'px;';
              if (typeof (width) === 'undefined' || typeof (height) === 'undefined') { return false; }
              style += (wh === 'auto') ? 'margin-top:0;' : '';
              wrapper.setAttribute('style', style);
              wrapper.setAttribute('data-device', cl);
              body.setAttribute('style', 'min-width:' + width + 'px;');
              resize(width, height, myTxt);
              if (wh === 'auto' && !t) {
                isResized = false;
                setTimeout(function () {
                  wrapper.setAttribute('style', '');
                  body.setAttribute('style', '');
                  isAnimated = false;
                }, 260);
              }
              else {
                isAnimated = false;
              }
            },
            readyElement = function (id, callback) {
              var interval = setInterval(function () {
                if (d.getElementById(id)) {
                  callback(d.getElementById(id));
                  clearInterval(interval);
                }
              }, 60);
            };

        rb.changeUrl = function (u, t) {
          d.title = t;
          if (history.pushState) {
            try {
              history.pushState({}, "New Page", u);
            } catch (e) {}
          }
        };

        readyElement('wrapper', function () {
            wrapper = d.getElementById('wrapper');
            devices = d.getElementById('devices');
            size = d.getElementById('size');
            close = d.querySelector('.close a');
            //keyboard = d.querySelector('.keyboard a');
            body = d.querySelector('body');
            if (window.chrome || (window.getComputedStyle && !window.globalStorage && !window.opera)) {}
            [].forEach.call(document.querySelectorAll('#devices a'), function (el) {
              el.addEventListener('click', function (e) {
                [].forEach.call(document.querySelectorAll('#devices a'), function (el) {
                  el.classList.remove('active');
                });
                e.preventDefault();
                e.stopPropagation();
                var self = this;
                if ((self.classList.contains('auto') && isResized === false) || isAnimated === true) {
                  return false;
                }
                isAnimated = true;
                if (isResized === false) {
                  isResized = true;
                  setPosition(sizes.auto, true, 'auto', 'auto');
                }
                setTimeout(function () {
                  self.classList.add('active');
                  if (self.classList.contains('smartphone-portrait')) {
                    setPosition(sizes.smartphonePortrait, false, 'smartphonePortrait', "Phone Portrait");
                  }
                  else if (self.classList.contains('smartphone-landscape')) {
                    setPosition(sizes.smartphoneLandscape, false, 'smartphoneLandscape', "Phone Landscape");
                  }
                  else if (self.classList.contains('tablet-portrait')) {
                    setPosition(sizes.tabletPortrait, false, 'tabletPortrait', "Tablet Portrait");
                  }
                  else if (self.classList.contains('tablet-landscape')) {
                    setPosition(sizes.tabletLandscape, false, 'tabletLandscape', "Tablet Landscape");
                  }
                  else if (self.classList.contains('auto')) {
                    setPosition(sizes.auto, false, 'auto', "Desktop");
                  }
                }, 10);
              });
            });
            // keyboard.addEventListener('click', function (e) {
            //   e.preventDefault();
            //   e.stopPropagation();
            //   keyboard.classList.toggle('active');
            //   wrapper.classList.toggle('keyboard')
            // }, false);
            w.addEventListener('resize', function () {
              resize();
            }, false);
            w.addEventListener('keyup', function (e) {
              var key = e.keyCode ? e.keyCode : e.charCode,
                  keys = {
                    49: 'tabletPortrait',
                    50: 'tabletLandscape',
                    51: 'smartphonePortrait',
                    52: 'smartphoneLandscape',
                    53: 'auto'
                  };
              if (typeof (keys[key]) === 'undefined') { return false; }
              setPosition(sizes[keys[key]], false, keys[key], "auto");
            }, false);
            resize();
            size.style.minWidth = 0;
        });
    })(window.resbook);
  }
  else if (isIE || (/Android/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) ) {
    $("body").prepend('<div class="row hide-for-oldie"><div class="large-8 small-centered columns"><div class="alert-box radius" data-alert><h4>Non-Optimal Browser Detected</h4><p>To get the best demo experience, it\'s recommended that you use <a href="https://www.google.com/chrome/">Google Chrome</a><br>If you cannot upgrade your browser, you can resize your browser to experience it.</div></div></div>');
  }
});
