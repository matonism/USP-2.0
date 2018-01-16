<html>

<head>

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<link rel="icon" 
      type="image/png" 
      href="/images/beachBall.png">
<title>Ultimate Summer Party</title>
<style>
body, html{
	height: 100%;
}
body{
	overflow: hidden;
}
.row{
	text-align: center;
}
.background-cover{
	background-image: url('images/sky.jpg');
	background-repeat: no-repeat;
	background-position: fixed;
	background-size: 100vw 100vh;

	height: 100vh;
	width: 100vw;
}
.title-bar{
	border-bottom: 2px solid rgba(83, 202, 196, 1);
    box-shadow: 0 4px 4px rgba(76, 175, 80, 0.2);
    background-color: rgba(7, 7, 7);
    background-color: black;
    height: 50px;
    vertical-align: middle;
    overflow: auto;
}
.title-level-text{
	height: 100%;
	color: white;
	font-size: 18px;
	line-height: 50px;
	font-weight: bold;
	text-align: left;
}
.top-level-text{
	font-weight: bold;
	font-size: 24px;
	color: white;
		text-shadow: 1px 1px 10px black;

}
.sub-level-text{
	font-weight: bold;
	font-size: 14px;
	color: gray;
	text-shadow: 1px 1px 10px black;
}
.under-construction-content{
	padding-top: 30vh;
}
.background-screen{
	height: 100vh;
	width: 100%;
	background-color: rgba(0,0,0,0.5);

}

.quick-link{
	position: relative;
	color: gray;
	height: 50px;
	vertical-align: middle;
	line-height: 50px;
	text-align: center;
	padding: 0;
	float: right;
	
}

.login-button{
	float: right;
	background-color: rgba(83, 202, 196, 1);
	height: 50px;
	color: white;
	font-size: 18px;
	font-weight: bold;
	line-height: 50px;
	width: 125px;
}
.quick-link-button{
	float: right;
	height: 50px;
	color: white;
	font-size: 18px;
	font-weight: bold;
	line-height: 50px;
	width: 125px;
}
.behind-color{
	background-color: gray;
	height: 100vh;
	width: 100vw;
}
</style>
</head>

<body>

<div class="behind-color">
	<div class="container-fluid">

		<div class="row">
			<div class="title-bar">
				<div class="col-xs-4 col-md-3">
					<div class="title-level-text">
						Ultimate Summer Party
					</div>
				</div>
				<div class="col-xs-8 col-md-9 quick-link-bar">
					<div class="row">

						<a href="login">
							<div class='login-button'>
								Login
							</div>
						</a>

						<a href="/login">
							<div class='quick-link-button'>
								Teams
							</div>
						</a>

						<a href="/login">
							<div class='quick-link-button'>
								Events
							</div>
						</a>

						<a href="/about">
							<div class='quick-link-button'>
								About
							</div>
						</a>

					</div>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="background-cover fill-remaining-space">
				<div class="background-screen fill-remaining-space">
					<div class='col-xs-12'>
						<div class='under-construction-content'>


							<div class="row">
								<div class="col-xs-8 col-xs-offset-2">
									<div class="top-level-text">
										Welcome to UltimateSummerParty.com
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-8 col-xs-offset-2">
									<div class="sub-level-text">
										The Ultimate Summer Party is an event for heroes by heroes. Cowards are not welcome. More info coming soon...
									</div>
								</div>
							</div>


						</div>
					</div>
				</div>
			</div>


		</div>


	</div>
</div>

<script>

var heftyHiker = (function(heftyHiker){

	heftyHiker.functions = {
		initialActions: initialActions,
		resizeActions: resizeActions,
		setRemainingHeight: setRemainingHeight
	}

	return heftyHiker

	function initialActions(){
		setRemainingHeight();
		initialResize();
		resizeActions();
	}

	function resizeActions(){
		$( window ).resize(function() {
			//setRemainingHeight();
			adjustBackgroundImage();
			console.log('Resized');
		});
	}

	function initialResize(){
		$(document).ready(function(){
			adjustBackgroundImage();
		});
	}


	function adjustBackgroundImage(){
		var h = window.innerHeight;
		var w = window.innerWidth;
		//var screenH = window.screen.availHeight
		//var screenW = window.screen.availWidth
		$('.fill-remaining-space').each(function(i, val){
			if(w < 900){
				if(val.style.width != 900){
					val.style.width = 900;
					val.style.height = '100vh';
				}
			}else if(w >= 900){
				setBaseBackgroundDimensions(val);
			}

			if(w >= 2 * h){ // show background color
				val.style.height = h + (w - (2*h));
			}

			val.style.backgroundSize = val.style.width + ' ' + val.style.height;

		});

		
	}

	function setBaseBackgroundDimensions(val){
			val.style.width = '100vw';
			val.style.height = '100vh';
	}

	function setRemainingHeight(){
		var h = window.innerHeight;
		$('.fill-remaining-space').each(function(i, val){
			val.style.height = h - 50;
			val.style.backgroundSize = "100vw " + val.style.height;
		});
	}
})(heftyHiker || []);

heftyHiker.functions.initialActions();


</script>

<script>
$(document).ready(function() {
        // Stop the regular post action
        //e.preventDefault();


  //       var action = "dataLoader/loadData.php";
  //       var method = "POST";
		// $.ajax({
  //           url: action, // point to server-side PHP script 
  //           dataType: 'json',  // what to expect back from the PHP script, if anything
  //           cache: false,
  //           contentType: false,
  //           processData: false,
  //           type: method,
  //           success: function(php_script_response){
  //           	//alert(php_script_response);
  //           	console.dir(php_script_response);
  //           	var path = "videos/";
  //           	var videoPath = php_script_response[0].fileName;

  //           	var video = document.getElementById('myvideo');
		// 		var mp4 = document.getElementById('videoSource');
		// 		mp4.type = "video/" + php_script_response[0].extension;
		// 		mp4.src = path + videoPath;
		// 		video.load();
				
		// 		var featuredTitle = document.getElementById('featured-video-title');
		// 		var featuredDescription = document.getElementById('featured-video-description');
		// 		featuredTitle.innerHTML = php_script_response[0].title;
		// 		featuredDescription.innerHTML = php_script_response[0].description;

  //           }
 	// 	});
		
        // Define the request that should happen instead
});
</script>



</body>

</html>