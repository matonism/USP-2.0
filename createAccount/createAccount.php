<?php


include('../htdocs/hiddenScript.php');
include('../htdocs/encodePassword.php');
include('../utilities/php/databaseQueryHelper.php');
include('../utilities/php/User.php');

if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['firstname']) && isset($_POST['lastname'])) {
	createAccount_main($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname']);
}

function createAccount_main($username, $password, $firstname, $lastname){

	$newUser = createUserObject($username, $password, $firstname, $lastname);
	$conn = connectToDatabase();

	if(!userAlreadyExists($conn, $newUser)){
		insertUser($conn, $newUser);
	}else{
		echo "toastr.error('This user already exists.  Please select a new username')";
		exit;
	}

}

function userAlreadyExists($conn, $newUser){
	$query = prepareQuery($conn, "SELECT username, admin FROM User WHERE username=?");
	$query->bind_param("s", $newUser->username);

	if(attemptQuery($conn, $query)){
		$query->bind_result($existingUser, $admin);
		$query->fetch();
		if($existingUser == null){
			return false;
		}else{
			return true;
		}
	}
}

function createUserObject($username, $password, $firstname, $lastname){
	$encodedPassword = encodePassword($password);
	$token = getSecurityToken();
	$loginLocation = get_client_ip();
	$admin = 0;
	return new User($firstname, $lastname, $username, $encodedPassword, $admin, $loginLocation, $token);
}

function insertUser($conn, $newUser){
		//create user
		$insertQuery = prepareQuery($conn, "INSERT INTO User (firstName, lastName, username, password, admin, loginLocation, token) VALUES (?, ?, ?, ?, ?, ?, ?)");
		$insertQuery->bind_param("sssssss", $newUser->firstname, $newUser->lastname, $newUser->username, $newUser->password, $newUser->admin, $newUser->loginLocation, $newUser->token);
		if(attemptQuery($conn, $insertQuery)){
			echo "window.location.replace('../accountCreated')";
			$_SESSION["user"] = $usernameAttempt;
			$_SESSION["token"] = $secToken;
			exit;
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