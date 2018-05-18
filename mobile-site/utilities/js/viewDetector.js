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
			if(fullURL.includes('/about/#usp-tank-link')){
			    fullURL = fullURL.replace('/about/#usp-tank-link', '/tshirtInfo').replace('ultimatesummerparty', 'm.ultimatesummerparty');
			    if(fullURL.charAt(fullURL.length-1) == '/'){
			        fullURL = fullURL.substring(0, fullURL.length - 1);
			    }
			    location.href = fullURL;
			}else{
	    		fullURL = fullURL.replace('ultimatesummerparty', 'm.ultimatesummerparty');
      			location.replace(fullURL);
			}
   		}else if(viewIsDesktop() && location.host.includes('m.ultimatesummerparty')){
			var fullURL = location.href;
			if(fullURL.includes('/tshirtInfo')){
			    fullURL = fullURL.replace('/tshirtInfo', '/about#usp-tank-link').replace('m.ultimatesummerparty', 'ultimatesummerparty');
			    if(fullURL.charAt(fullURL.length-1) == '/'){
			        fullURL = fullURL.substring(0, fullURL.length - 1);
			    }
			    location.href = fullURL;
			}else{
			    fullURL = fullURL.replace('m.ultimatesummerparty', 'ultimatesummerparty');
    		    location.replace(fullURL);   
			}
   		}
	}

	navigateToAppropriateView();

})(viewDetector || []);