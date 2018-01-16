<?php
		
		include('sessionHelper.php');
		startSession();

		$dbuser = "ultimdx4_mmato";
		$dbpass = "basketball12";

		$_SESSION["dbuser"] = $dbuser;
		$_SESSION["dbpass"] = $dbpass;
		$_SESSION["dbhost"] = "localhost";
		$_SESSION["dbname"] = "ultimdx4_ultimate-summer-party-db";


?>