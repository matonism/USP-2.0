var sidePanel = (function(sidePanel){
	
	sidePanel.functions = {
		setUpSidePanel: setUpSidePanel

	}
		return sidePanel;


	function setUpSidePanel(){

		$(".side-panel-control-left").on("click", function(){slideAllLeftSidePanels()});
		$(".side-panel-control-right").on("click", function(){slideAllRightSidePanels()});
		$(".side-bar-nav-tab-left").on("click", function(){slideAllLeftSidePanels()});
		$(".side-bar-nav-tab-right").on("click", function(){slideAllRightSidePanels()});

	}

	function slideAllLeftSidePanels(){

		var leftSidePanels = [
		".side-bar-left-wide", 
		".side-bar-left-medium", 
		".side-bar-left-thin", 
		".side-bar-left-m-wide", 
		".side-bar-left-m-medium", 
		".side-bar-left-m-thin"
		];
		for(var i = 0; i < leftSidePanels.length; i++){
			if($(leftSidePanels[i]).length > 0){
				slideSideBar(leftSidePanels[i]);
			}
		}
	}

	function slideAllRightSidePanels(){

		var rightSidePanels = [
		".side-bar-right-wide", 
		".side-bar-right-medium", 
		".side-bar-right-thin", 
		".side-bar-right-m-wide", 
		".side-bar-right-m-medium", 
		".side-bar-right-m-thin"
		];
		for(var i = 0; i < rightSidePanels.length; i++){
			if($(rightSidePanels[i]).length > 0){
				slideSideBar(rightSidePanels[i]);
			}
		}
	}

	function slideSideBar(sideBarClass){
		if(sideBarClass.includes('left')){
			var navTabClass = '.side-bar-nav-tab-left';
			var sideBarOffset = parseFloat($(sideBarClass).css("left"));

			//if it should slide open
			if(sideBarOffset < 0){
				slideSideBarOpenFromLeft(sideBarClass, navTabClass);
			//if it should slide closed
			}else{
				slideSideBarClosedFromLeft(sideBarClass, navTabClass);
			}
		}else{
			var navTabClass = '.side-bar-nav-tab-right';
			var sideBarOffset = parseFloat($(sideBarClass).css("right"));

			//if it should slide open
			if(sideBarOffset < 0){
				slideSideBarOpenFromRight(sideBarClass, navTabClass);
			//if it should slide closed
			}else{
				slideSideBarClosedFromRight(sideBarClass, navTabClass);
			}
		}
	}

	function getIncrementOnInterval(sideBarClass){

		if(sideBarClass.includes('-m-')){
			return 40;
		}else{
			return 10;
		}

	}

	function getIntervalDuration(sideBarClass){

		if(sideBarClass.includes('-m-')){
			return 5;
		}else{
			return 10;
		}

	}

	function slideSideBarOpenFromLeft(sideBarClass, navTabClass){
		var incrementOnInterval = getIncrementOnInterval(sideBarClass);
		var intervalDuration = getIntervalDuration(sideBarClass);

		var interval = setInterval(function(){
			var currentSideBarOffset = parseFloat($(sideBarClass).css("left"));
			var navTabOffset = parseFloat($(navTabClass).css("left"));
			var absolutePositionedOffset = parseFloat($('.absolute-positioned-slide').css("left"));
			var mainContentLeftPadding = parseFloat($('.main-content').css("padding-left"));
			var mainContentRightMargin = parseFloat($('.main-content').css("margin-right"));
			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				$(sideBarClass).css("left", (currentSideBarOffset + incrementOnInterval).toString());
				$(navTabClass).css("left", (navTabOffset + incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("left", (absolutePositionedOffset + incrementOnInterval).toString());
				$('.main-content').css("padding-left", (mainContentLeftPadding + incrementOnInterval).toString());
				$('.main-content').css("margin-right", (mainContentRightMargin - incrementOnInterval).toString());
				clearInterval(interval);
			}else{

				$(sideBarClass).css("left", (currentSideBarOffset + incrementOnInterval).toString());
				$(navTabClass).css("left", (navTabOffset + incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("left", (absolutePositionedOffset + incrementOnInterval).toString());
				$('.main-content').css("padding-left", (mainContentLeftPadding + incrementOnInterval).toString());
				$('.main-content').css("margin-right", (mainContentRightMargin - incrementOnInterval).toString());
			}
		}, intervalDuration);
	}

	function slideSideBarClosedFromLeft(sideBarClass, navTabClass){
		var incrementOnInterval = getIncrementOnInterval(sideBarClass);
		var intervalDuration = getIntervalDuration(sideBarClass);

		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat($(sideBarClass).css("width"));
			var currentSideBarOffset = parseFloat($(sideBarClass).css("left"));
			var navTabOffset = parseFloat($(navTabClass).css("left"));
			var absolutePositionedOffset = parseFloat($('.absolute-positioned-slide').css("left"));
			var mainContentLeftPadding = parseFloat($('.main-content').css("padding-left"));
			var mainContentRightMargin = parseFloat($('.main-content').css("margin-right"));

			if(currentSideBarOffset <= -currentSideBarWidth + incrementOnInterval){
				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				$(sideBarClass).css("left", (currentSideBarOffset - incrementOnInterval).toString());
				$(navTabClass).css("left", (navTabOffset - incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("left", (absolutePositionedOffset - incrementOnInterval).toString());
				$('.main-content').css("padding-left", (mainContentLeftPadding - incrementOnInterval).toString());
				$('.main-content').css("margin-right", (mainContentRightMargin + incrementOnInterval).toString());
				clearInterval(interval);
			}else{

				$(sideBarClass).css("left", (currentSideBarOffset - incrementOnInterval).toString());
				$(navTabClass).css("left", (navTabOffset - incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("left", (absolutePositionedOffset - incrementOnInterval).toString());
				$('.main-content').css("padding-left", (mainContentLeftPadding - incrementOnInterval).toString());
				$('.main-content').css("margin-right", (mainContentRightMargin + incrementOnInterval).toString());
			}
		}, intervalDuration);
	}
	function slideSideBarOpenFromRight(sideBarClass, navTabClass){
		var incrementOnInterval = getIncrementOnInterval(sideBarClass);
		var intervalDuration = getIntervalDuration(sideBarClass);

		var interval = setInterval(function(){
			var currentSideBarOffset = parseFloat($(sideBarClass).css("right"));
			var navTabOffset = parseFloat($(navTabClass).css("right"));
			var absolutePositionedOffset = parseFloat($('.absolute-positioned-slide').css("right"));
			var mainContentRightPadding = parseFloat($('.main-content').css("padding-right"));
			var mainContentLeftMargin = parseFloat($('.main-content').css("margin-left"));

			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				$(sideBarClass).css("right", (currentSideBarOffset + incrementOnInterval).toString());
				$(navTabClass).css("right", (navTabOffset + incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("right", (absolutePositionedOffset + incrementOnInterval).toString());
				$('.main-content').css("padding-right", (mainContentRightPadding + incrementOnInterval).toString());
				$('.main-content').css("margin-left", (mainContentLeftMargin - incrementOnInterval).toString());
				clearInterval(interval);
			}else{

				$(sideBarClass).css("right", (currentSideBarOffset + incrementOnInterval).toString());
				$(navTabClass).css("right", (navTabOffset + incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("right", (absolutePositionedOffset + incrementOnInterval).toString());
				$('.main-content').css("padding-right", (mainContentRightPadding + incrementOnInterval).toString());
				$('.main-content').css("margin-left", (mainContentLeftMargin - incrementOnInterval).toString());
			}
		}, intervalDuration);
	}

	function slideSideBarClosedFromRight(sideBarClass, navTabClass){
		var incrementOnInterval = getIncrementOnInterval(sideBarClass);
		var intervalDuration = getIntervalDuration(sideBarClass);

		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat($(sideBarClass).css("width"));
			var currentSideBarOffset = parseFloat($(sideBarClass).css("right"));
			var navTabOffset = parseFloat($(navTabClass).css("right"));
			var absolutePositionedOffset = parseFloat($('.absolute-positioned-slide').css("right"));
			var mainContentRightPadding = parseFloat($('.main-content').css("padding-right"));
			var mainContentLeftMargin = parseFloat($('.main-content').css("margin-left"));
			if(currentSideBarOffset <= -currentSideBarWidth+incrementOnInterval){

				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				$(sideBarClass).css("right", (currentSideBarOffset - incrementOnInterval).toString());
				$(navTabClass).css("right", (navTabOffset - incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("right", (absolutePositionedOffset - incrementOnInterval).toString());
				$('.main-content').css("padding-right", (mainContentRightPadding - incrementOnInterval).toString());
				$('.main-content').css("margin-left", (mainContentLeftMargin + incrementOnInterval).toString());
				clearInterval(interval);

			}else{

				$(sideBarClass).css("right", (currentSideBarOffset - incrementOnInterval).toString());
				$(navTabClass).css("right", (navTabOffset - incrementOnInterval).toString());
				$('.absolute-positioned-slide').css("right", (absolutePositionedOffset - incrementOnInterval).toString());
				$('.main-content').css("padding-right", (mainContentRightPadding - incrementOnInterval).toString());
				$('.main-content').css("margin-left", (mainContentLeftMargin + incrementOnInterval).toString());
			}
		}, intervalDuration);
	}


})(sidePanel || []);