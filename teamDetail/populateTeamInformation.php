<?php

	include('../utilities/php/Team.php');
	include('../htdocs/hiddenScript.php');
	include('../utilities/php/databaseQueryHelper.php');
	include('../utilities/php/getTeamsDA.php');


	main();
	

	function main(){
		$conn = connectToDatabase();
		
		if(isset($_POST["teamName"]) && isset($_POST["event"])){
			$teamName  = str_replace("+", " ", $_POST["teamName"]);
			$event  = str_replace("+", " ", $_POST["event"]);
			// $teamName = $_POST["teamName"];
			// $event = $_POST["event"];
			$user = '';
			if(isset($_SESSION["user"])){ $user = $_SESSION["user"]; }

			$userArray = queryAllUsers($conn);
			$numberOfMembersArray = queryNumberOfMembersForEvents($conn);
			$restrictedEventArray = queryRestrictedEventsForUser($conn, $user);

			

			$query = prepareQuery($conn, "SELECT teamName, Event, Member1, Member2, Member3, Member4, walkUpSong FROM Team WHERE teamName = ? AND event = ?");
			$query->bind_param("ss", $teamName, $event);

			if (attemptQuery($conn, $query)){
				//query succeeded
				$query->bind_result($name, $event, $member1, $member2, $member3, $member4, $walkUpSong);
				
				$eventArray = array();

				$query->fetch();
				if($name != null){
					$team = new Team($name, $event, null, $member1, $member2, $member3, $member4, $walkUpSong);
					setMemberDisplayNames($userArray, $team);
					setIsJoinable($user, $numberOfMembersArray, $team, $event, $restrictedEventArray);
					setIsLeavable($user, $numberOfMembersArray, $team, $event, $restrictedEventArray);
					echo json_encode($team);
					finishQuery($query);
					exit;

				}
				finishQuery($query);
				
			}

		}

		showErrorPage();
	}
