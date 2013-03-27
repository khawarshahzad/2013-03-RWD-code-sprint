$(document).foundation("joyride", {
	tipAnimation: "fade"
});
$(document).foundation("joyride", "start");
$("#devices a").on("click", function(){ // when they click on a device link we want to trigger the second tip.
    $(".joyride-tip-guide .joyride-next-tip")[2].click();
});
$(".joyride-tip-guide").find(".joyride-next-tip")[1].remove(); // removes next button on the devices tip, we want them to click a button, NOT click next or else the rest of the stuff won't look right
