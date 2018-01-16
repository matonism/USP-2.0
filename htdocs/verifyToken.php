<?php



if(tokensMatch()){
	$hasTokenAccess = true;
	//echo $pageContent;
}



function tokensMatch(){

	
	$conn = new mysqli($_SESSION["dbhost"], $_SESSION["dbuser"], $_SESSION["dbpass"], $_SESSION["dbname"]);

	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	if(!($query = $conn->prepare("SELECT token, admin FROM User WHERE username=?"))){
		echo "prepare failed";
		echo $conn->error;
	}

	$query->bind_param("s", $_SESSION["user"]);

	if (!$query->execute()) {
	    echo "Execute failed: (" . $conn->errno . ") " . $conn->error;
	}else{
		//query succeeded
		$query->bind_result($token, $admin);
		$query->fetch();

		if($admin == 1 && $token == $_SESSION["token"]){
			return true;
		}
	}

	return false;
}




?>