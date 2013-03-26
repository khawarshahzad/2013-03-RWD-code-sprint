$(function(){
  if ( parent.$("#devices").length <=0 ) {
    javascript:void(
      (function(){
        var d=document;
        d.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+
        d.title+
        '<\/title><link rel="stylesheet" href="css/app.css"><link rel="stylesheet" href="..\/..\/css/foundation.css"><link rel="stylesheet" href="css/app-icons.css"><script src="js/app.js"><\/script><\/head>' +
        '<body>' +
        '<header>' +
        //'<div class="close"><a href="#">%C3%97<\/a><\/div>' +
        '<div id="size"><\/div>' +
        '<div id="keyboard" class="keyboard"><a href="#">I<\/a><\/div>' +
        //'<div class="cssrefresh"><a href="#">I<\/a><\/div>' +
        '<div id="devices">' +
        '  <a href="#" class="tablet-landscape"><span>Tablet Landscape<\/span><\/a>' +
        '  <a href="#" class="tablet-portrait"><span>Tablet Portrait<\/span><\/a>' +
        '  <a href="#" class="smartphone-landscape"><span>iPhone Landscape<\/span><\/a>' +
        '  <a href="#" class="smartphone-portrait"><span>iPhone Portrait<\/span><\/a>' +
        '  <a href="#" id="desktop-view" class="auto active"><span>Desktop<\/span><\/a>' +
        '  <\/div><\/header><section><div id="wrapper"><iframe src="'+d.URL+'" onLoad="resbook.changeUrl(this.contentWindow.location,this.contentDocument.title);"><\/iframe><span class="keyboard-bg"><\/span><\/div><\/section><ol class="joyride-list" data-joyride>'+
        '  <li data-button="Next">'+
        '   <h4>Getting Started!<\/h4>'+
        '   <p>This tutorial will teach you how to use the "Resize Bar" available throughout the demo site.<\/p>'+
        '  <\/li>'+
        '  <li data-id="devices">'+
        '   <h4>Choose a Device<\/h4>'+
        '   <p>Click any of these buttons to see how this site would look on various devices.<\/p><p><strong>Go ahead, click one now!<\/strong><\/p>'+
        '  <\/li>'+
        '  <li data-button="Next">'+
        '   <h4>Notice a Difference?<\/h4>'+
        '   <p>You are now viewing the same page at a smaller size.<\/p>'+
        '  <\/li>'+
        '  <li data-id="keyboard" data-button="Next">'+
        '   <h4>Show a Keyboard<\/h4>'+
        '   <p>Clicking this button will show/hide a keyboard overlay.<\/p>'+
        '  <\/li>'+
        '  <li data-id="desktop-view" data-button="Close">'+
        '   <h4>Desktop View<\/h4>'+
        '   <p>Clicking "Desktop" will bring you back to full screen mode.<\/p>'+
        '   <p>Go ahead and explore the Responsive demos now!<\/p>'+
        '  <\/li>'+
        '  </ol>  <script src="..\/..\/js\/vendor\/jquery.js"><\/script>'+
        '<script src="..\/..\/js\/foundation\/foundation.js"><\/script>'+
        '<script src="..\/..\/js\/foundation\/foundation.joyride.js"><\/script>'+
        '<script src="..\/..\/js\/app\/demo-bar-post.js"><\/script>'+
        '<\/body><\/html>')
        })
    ()); 
  } 
});