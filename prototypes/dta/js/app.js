$(function(){
	$("#page, footer").find("a[href='#']").on(exlsr.activateEventName, function(e){
		e.preventDefault();
	});
	$("#demoBar").on("click", function(e){
		e.preventDefault();
		$("body").load("../../js/app/demo-bar.js");
	});
})