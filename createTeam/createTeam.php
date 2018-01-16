<?php

include('../utilities/php/databaseQueryHelper.php');
include('../htdocs/hiddenScript.php');

attemptToCreateTeam();

function attemptToCreateTeam(){
	if (isset($_POST['event']) && isset($_POST['name']) && isset($_POST['teamPassword'])) {
		
		if(!isset($_SESSION['user']) || !isset($_SESSION['token'])){
			echo "toastr.error('You must log in to create a team')";
			exit;
		}

		$username = $_SESSION["user"];
		$event = $_POST['event'];
		$teamName = $_POST['name'];
		$teamPassword = $_POST['teamPassword'];
		$walkUpSong = '';
		if(isset($_POST['walkUpSong'])){
			$walkUpSong = $_POST['walkUpSong'];
		}
		
		$conn = connectToDatabase();
		$query = prepareQuery($conn, "SELECT event FROM Team WHERE event=? AND teamName=?");
		$query->bind_param("ss", $event, $teamName);

		if (attemptQuery($conn, $query)){
			$query->bind_result($eventReturned);
			$query->fetch();

			if($eventReturned == null){
				if(getExistingTeams($conn, $event, $username)){
					insertNewTeam($conn, $event, $teamName, $teamPassword, $username, $walkUpSong);
					exit;
				}
			}else{
				echo "toastr.error('A team with that name already exists')";
				exit;
			}
		}
	}
}


function getExistingTeams($conn, $event, $username){
	$query = prepareQuery($conn, "SELECT event, teamName FROM Team WHERE Event = ? AND (Member1 = ? OR Member2 = ? OR Member3 = ? OR Member4 = ?)");
	$query->bind_param("sssss", $event, $username, $username, $username, $username);

	if (attemptQuery($conn, $query)){
		$query->bind_result($eventReturned2, $teamNameReturend2);
		$query->fetch();

		if($eventReturned2 == null){
			return true;
		}else{
			echo "toastr.error('You cannot be on more than one team for a given event')";
			exit;
		}
	}
}


function insertNewTeam($conn, $event, $teamName, $teamPassword, $username, $walkUpSong){
	$query = prepareQuery($conn, "INSERT INTO Team (Event, teamName, teamPassword, Member1, walkUpSong) VALUES (?, ?, ?, ?, ?)");
	$query->bind_param("sssss", $event, $teamName, $teamPassword, $username, $walkUpSong);

	if (attemptQuery($conn, $query)){
		echo "toastr.success('Your team has been created!'); window.location.replace('../teams');";
	}
}
		

?>