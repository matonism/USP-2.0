// resizeFunctions.functions.initialActions();
countdownTimer.functions.startCountdownTimer();
var init = function(){
	
	var isMobile = helperFunctions.functions.viewIsMobile();

	var showVideo = function(){
		setTimeout(function(){
		var interval = setInterval(function(){
			var opacity = $(".video").css("opacity");
			var opacityFloat = parseFloat(opacity);
			opacity = opacityFloat + .1;
			$(".video").css("opacity", opacity + '');
			if(opacity >= 1){
				clearInterval(interval);
			}
		}, 50);

		var interval2 = setInterval(function(){
			var opacity = $(".title-bar-over-image").css("opacity");
			var opacityFloat = parseFloat(opacity);
			opacity = opacityFloat + .1;
			$(".title-bar-over-image").css("opacity", opacity + '');
			if(opacity >= 1){
				clearInterval(interval2);
			}
		}, 50);

		},300);
	}
	
	var frostImages = function(showVideo){
		var interval = setInterval(function(){
			var opacity = $(".frosted-cover").css("opacity");
			var opacityFloat = parseFloat(opacity);
			opacity = opacityFloat + .055;
			$(".frosted-cover").css("opacity", opacity + '');
			if(opacity >= .66){
				clearInterval(interval);
				showVideo();
			}
		}, 25)
	}

	if(isMobile){
		$(".video").css("opacity", '1');
		$(".frosted-cover").css("opacity", '.66');
	}else{
		rollerScroll(frostImages, showVideo);

		var rollers = $(".roller-strip");
		setRollerHeight(rollers);
		setVideoPlacement();
		verticallyCenterIntroText();
		showAllRollersInSuccession(rollers, 0);
		
		$( window ).resize(function() {
			var rollers = $(".roller-strip");
			setRollerHeight(rollers);
			setVideoPlacement();
			verticallyCenterIntroText();
			clearRollerMargin();
		});
	}

	function clearRollerMargin(){
		$(".roller-strip.roll-right").css('margin-left', '0px');
		$(".roller-strip.roll-left").css('margin-left', '-100px');

	}

	function setRollerHeight(rollers){
		var windowHeight = window.outerHeight;
		var bgImg = [];
		var rollerIndex = 0;

		for(var i = 0; i < rollers.length; i++){
			var targetRollerHeight = (windowHeight + 20) / rollers.length;

			var url = $(rollers[i]).css('background-image');
			url = url.replace('url(', '');
			url = url.replace(/\)/g, '');
			url = url.replace(/\'/g, '');
			url = url.replace(/\"/g, '');

		    var image = new Image();
		    image.src = url;

		    var width = image.width;
		    var height = image.height;
			$(rollers[i]).css("background-size", (targetRollerHeight * (width / height)) + "px " + targetRollerHeight + "px");
			$(rollers[i]).css("height", targetRollerHeight);

		}

	}

	function setVideoPlacement(){
		var contentHeight = $(".video").css("height");
		var maincontentheight = $(".main-about-content").css("height");

		var marginTopHeight = $(".fill-remaining-space").css("margin-top");
		var windowHeight = window.innerHeight;

		contentHeight = parseInt(contentHeight.replace('px'));
		marginTopHeight = parseInt(marginTopHeight.replace('px'));

		var distanceFromTop = (windowHeight/2) - (contentHeight/1.75) - (marginTopHeight*3/4);
		$(".main-about-content").css("top", distanceFromTop);

	}


	function verticallyCenterIntroText(){
		var contentHeight = $(".intro-text-container").css("height");
		var containerHeight = $(".frosted-cover-black").css("height");


		contentHeight = parseInt(contentHeight.replace('px'));
		containerHeight = parseInt(containerHeight.replace('px'));

		var distanceFromTop = (containerHeight/2) - (contentHeight/2);
		$(".intro-text-container").css("padding-top", distanceFromTop);

	}

	function showAllRollersInSuccession(rollers, index){
		if(index < rollers.length){
			showRoller(rollers[index]);
			setTimeout(function(){
				showAllRollersInSuccession(rollers, index + 1);
			},500);
		}
	}

	function showRoller(roller){
		var interval = setInterval(function(){
			var opacity = $(roller).css("opacity");
			var opacityFloat = parseFloat(opacity);
			opacity = opacityFloat + .1;
			$(roller).css("opacity", opacity + '');
			if(opacity >= 1){
				clearInterval(interval);
			}
		}, 50);
	}

	function rollerScroll(frostImages, showVideo){

			var leftRollerFinished = false;
			var rightRollerFinished = false;
			var windowWidth = $( window ).width();

			var interval = setInterval(function(){
				var rollers = $(".roller-strip.roll-right");

				var leftMargin = rollers.css('margin-left');
				var leftMarginInt = parseInt(leftMargin.substring(0, leftMargin.indexOf('px')));
				leftMarginInt = (leftMarginInt + 4);
				leftMargin = leftMarginInt + 'px';
				rollers.css('margin-left', leftMargin);
				if(leftMarginInt >= -windowWidth*3/4){
					clearInterval(interval);
					rightRollerFinished = true;
					if(leftRollerFinished && rightRollerFinished){
						frostImages(showVideo);
					}
				}
			}, 50);
		
			var interval2 = setInterval(function(){
				var rollers = $(".roller-strip.roll-left");

				var leftMargin = rollers.css('margin-left');
				var leftMarginInt = parseInt(leftMargin.substring(0, leftMargin.indexOf('px')));
				leftMarginInt = (leftMarginInt - 4);
				leftMargin = leftMarginInt + 'px';
				rollers.css('margin-left', leftMargin);
				if(leftMarginInt <= -(windowWidth/4)){
					clearInterval(interval2);
					leftRollerFinished = true;
					if(leftRollerFinished && rightRollerFinished){
						frostImages(showVideo);
					}
				}
			}, 50);
		}

	// }
}
document.addEventListener("DOMContentLoaded", init);