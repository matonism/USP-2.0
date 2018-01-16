<?php

	include('../utilities/php/Team.php');
	include('../htdocs/hiddenScript.php');
	include('../utilities/php/databaseQueryHelper.php');
	include('../utilities/php/getTeamsDA.php');
	include('../teamDetail/checkTeamPermissionsLogic.php');

	if(isset($_POST["teamName"]) && isset($_POST["event"]) && isset($_SESSION["user"])){
		echo checkTeamPermissions_main($_POST["teamName"], $_POST["event"]);
		exit;
	}

	echo 0;


?>