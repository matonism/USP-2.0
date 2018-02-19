var viewDetector = (function(viewDetector){
	


	function viewIsMobile(){
	    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	}

	function viewIsDesktop(){
	    return !(typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	}

	function navigateToAppropriateView(){
		if(viewIsMobile() && !location.host.includes('m.ultimatesummerparty')){
			var fullURL = location.href;
			fullURL = fullURL.replace('ultimatesummerparty', 'm.ultimatesummerparty');
   			location.replace(fullURL);
   		}else if(viewIsDesktop() && location.host.includes('m.ultimatesummerparty')){
			var fullURL = location.href;
			fullURL = fullURL.replace('m.ultimatesummerparty', 'ultimatesummerparty');
   			location.replace(fullURL);   		
   		}
	}

	navigateToAppropriateView();

})(viewDetector || []);