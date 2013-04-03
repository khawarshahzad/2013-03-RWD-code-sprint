/*global exlsr: false */
$(function(){
	$("#page, footer").find("a[href='#']").on(exlsr.activateEventName, function(e){
		e.preventDefault();
	});
	$("#demoBar").on(exlsr.activateEventName, function(e){
		e.preventDefault();
		$.getScript("../../js/app/demo-bar.js");
	});
});
