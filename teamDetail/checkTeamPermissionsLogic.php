<?php
	
	function checkTeamPermissions_main($teamName, $event){
		echo checkTeamPermissions($teamName, $event);
	}

	function checkTeamPermissions($teamName, $event){
		$conn = connectToDatabase();

		if(isset($teamName) && isset($event) && isset($_SESSION["user"])){
			$user = $_SESSION["user"];
			
			$query = prepareQuery($conn, "SELECT teamName, Event, Member1, Member2, Member3, Member4, walkUpSong FROM Team WHERE teamName = ? AND event = ?");
			$query->bind_param("ss", $teamName, $event);
			if (attemptQuery($conn, $query)){
				//query succeeded
				$query->bind_result($name, $event, $member1, $member2, $member3, $member4, $walkUpSong);

				$query->fetch();
				if($member1 == $user || $member2 == $user || $member3 == $user || $member4 == $user){
					finishQuery($query);
					return 1;
				}
		
				finishQuery($query);
			}
		}

		return 0;

	}

?>