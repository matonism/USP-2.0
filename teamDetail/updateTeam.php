<?php

	include('../utilities/php/Team.php');
	include('../htdocs/hiddenScript.php');
	include('../utilities/php/databaseQueryHelper.php');
	include('../utilities/php/getTeamsDA.php');
	include('../teamDetail/checkTeamPermissionsLogic.php');

	updateTeam_main();
	

	function updateTeam_main(){
		$conn = connectToDatabase();
		if(isset($_POST["teamName"]) && isset($_POST["previousTeamName"]) && isset($_POST["password"]) && isset($_SESSION["user"])){
			$user = $_SESSION["user"];
			$teamName = $_POST["teamName"];
			$previousTeamName = $_POST["previousTeamName"];
			$newPassword = $_POST["password"];
			$event = $_POST["event"];

			$walkUpSong = '';
			if(isset($_POST["walkUpSong"])){
				$walkUpSong = $_POST["walkUpSong"];
			}

			if(checkTeamPermissions($previousTeamName, $event)){


				if(!teamExists($conn, $event, $teamName) || $previousTeamName == $teamName){
					$query = prepareQuery($conn, "UPDATE Team SET teamName=?, walkUpSong=?, teamPassword=? WHERE teamName = ? AND event = ?");
					$query->bind_param("sssss", $teamName, $walkUpSong, $newPassword, $previousTeamName, $event);

					if (attemptQuery($conn, $query)){
						$urlParamTeamName = str_replace(" ", "+", $teamName);
						$urlParamEvent = str_replace(" ", "+", $event);

						echo "window.location.replace('http://ultimatesummerparty.com/teamDetail/?teamName=" . $urlParamTeamName . "&event=". $urlParamEvent ."')";
						exit;
					}
				}else{
					echo "toastr.warning(\"That team already exists. Please choose a different name\");";
					exit;
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