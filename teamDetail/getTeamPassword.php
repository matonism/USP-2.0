<?php

	include('../utilities/php/Team.php');
	include('../htdocs/hiddenScript.php');
	include('../utilities/php/databaseQueryHelper.php');
	include('../utilities/php/getTeamsDA.php');
	include('../teamDetail/checkTeamPermissionsLogic.php');

	getTeamPassword_main();
	

	function getTeamPassword_main(){
		$conn = connectToDatabase();
		if(isset($_POST["teamName"]) && isset($_POST["event"]) && isset($_SESSION["user"])){

			$user = $_SESSION["user"];
			$teamName = $_POST["teamName"];
			$event = $_POST["event"];
	
			if(checkTeamPermissions($teamName, $event)){


				$query = prepareQuery($conn, "SELECT teamPassword FROM Team WHERE teamName = ? AND event = ?");
				$query->bind_param("ss", $teamName, $event);
				if (attemptQuery($conn, $query)){

					$query->bind_result($teamPassword);

					$query->fetch();
					if($teamPassword != null) {
						echo $teamPassword;
						exit;

					}
					finishQuery($query);

				}

			}else{
				echo "toastr.warning(\"You do not have permission to edit this team!\");";
				exit;
			}
		}else{
			echo "toastr.warning(\"You must specify a value for every field!\");";
			exit;
		}

	}

?>