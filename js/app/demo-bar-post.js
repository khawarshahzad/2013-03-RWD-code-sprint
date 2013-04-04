var hasClicked = false;

// $(document).foundation('joyride', {
//  tipAnimation: 'fade',
//  postRideCallback     : function (){hasClicked=true;console.log('done');},
//   template : { // HTML segments for tip layout
//     link    : '<a href='#close' class='joyride-close-tip'>A</a>',
//     timer   : '<div class='joyride-timer-indicator-wrap'><span class='joyride-timer-indicator'></span></div>',
//     tip     : '<div class='joyride-tip-guide'><span class='joyride-nub'></span></div>',
//     wrapper : '<div class='joyride-content-wrapper'></div>',
//     button  : '<a href='#' class='button success joyride-next-tip'></a>'
//   }
// });

$(document).foundation('joyride', 'start');

$('#devices a').on('click', function(){ // when they click on a device link we want to trigger the second tip.
  if (!hasClicked) {
    $(document).foundation("joyride", "hide");
	$(document).foundation("joyride", "show"); // click the hidden button to advance
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
