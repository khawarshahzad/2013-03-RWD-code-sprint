
	var hasClicked = false;

	$(document).foundation('joyride', 'start');
$(function(){
	$('#devices a').on('click', function(){ // when they click on a device link we want to trigger the second tip.
	  if (!hasClicked) {
	    $('.joyride-tip-guide .joyride-next-tip').eq(1).click(); // click the hidden button to advance
	    hasClicked=true;
	  }
	});

	$('body').on('click', '.joyride-close-tip', function(){ hasClicked = true; });

	// To do: get second element the proper jQuery way
	$('.joyride-tip-guide').find('.joyride-next-tip').eq(1).hide(); // removes next button on the devices tip, we want them to click a button, NOT click next or else the rest of the stuff won't look right
	$('body').keyup(function(e){
	    if(e.which === 27){
	        $(document).foundation('joyride', 'off');
	            hasClicked=true;
	    }
	});
});
