<?php


function encodePassword($password) {

	$encodedPassword = '';


    for( $i = 0; $i<strlen($password); $i++ ) {
        $individualCharacter = substr($password, $i, 1);
        $ascii = ord($individualCharacter);
        $ascii = $ascii + 2;
        if($ascii >= 127){
        	$ascii = $ascii - 127;
        }
        $encodedPassword = $encodedPassword . chr($ascii);
    }
    return $encodedPassword;
}


?>