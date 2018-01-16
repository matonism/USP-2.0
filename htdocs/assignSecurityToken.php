<?php
		//set security token based on username and time
		//set db field token
		//create php script to verify security token



	$secToken = getSecurityToken();
	$_SESSION["token"] = $secToken;
	setTokenInDB($secToken);


	function setTokenInDB($secToken){
		$conn = new mysqli($_SESSION["dbhost"], $_SESSION["dbuser"], $_SESSION["dbpass"], $_SESSION["dbname"]);

		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}

		if(!($query = $conn->prepare("UPDATE User SET token = ?, loginLocation = ? WHERE username = ?"))){
			echo "prepare failed";
			echo $conn->error;
		}
		$ipAddress = get_client_ip();
		$query->bind_param("sss", $secToken, $ipAddress, $_SESSION["user"]);

		if (!$query->execute()) {
		    echo "Execute failed: (" . $conn->errno . ") " . $conn->error;
		}

	}


	function getSecurityToken(){
		$token = "";
		$index = 0;
		while($index < 10){
			$token = $token . getRand();
			$index++;
		}
		return $token;
	}

	function getRand(){
		srand(make_seed());
		$isLetter = rand(0,1);
		$randVal = '0';
		if($isLetter == 1){
			return getRandLetter();

		}else{
			return getRandNumber();
		}
	}

	function getRandNumber(){
		srand(make_seed());
		$randval = rand(0,9);
		return $randval;
	}

	function getRandLetter(){
		srand(make_seed());
		$capital = rand(0,1);
		$randval = 0;
		if($capital == 1){
			$randval = rand(65, 90);
		}else{
			$randval = rand(97, 122);
		}

		return chr($randval);
	}

	function make_seed()
	{
	  list($usec, $sec) = explode(' ', microtime());
	  return $sec + $usec * 1000000;
	}

	function get_client_ip() {
	    $ipaddress = '';
	    if (isset($_SERVER['HTTP_CLIENT_IP']))
	        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
	    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
	        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
	    else if(isset($_SERVER['HTTP_X_FORWARDED']))
	        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
	    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
	        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
	    else if(isset($_SERVER['HTTP_FORWARDED']))
	        $ipaddress = $_SERVER['HTTP_FORWARDED'];
	    else if(isset($_SERVER['REMOTE_ADDR']))
	        $ipaddress = $_SERVER['REMOTE_ADDR'];
	    else
	        $ipaddress = 'UNKNOWN';
	    return $ipaddress;
	}

?>