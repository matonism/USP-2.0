
resizeFunctions.functions.initialActions();
checkForLogin();
displayPageInformation();
setupModalFunctionality();


var team = '';

function displayPageInformation(){
	checkTeamPermissions();
}

function checkTeamPermissions(){
	$(document).ready(function(){
		var event = getURLParameterByName('event');
		var teamName = getURLParameterByName('teamName');


	  	$.ajax({
		    type: "POST",
		    url: "checkTeamPermissions.php",
		    data: ({
            	event: event,
            	teamName: teamName
            }),
		    success: function(php_script_response){
		    	if(ajaxCallHelper.functions.handleResponseScript(php_script_response) != null){
		    		if(php_script_response != 0){
		    			//set up edit information options
		    			populateTeamInformation(true);
		    		}else{
		    			populateTeamInformation(false);
		    		}
		    	}
		    },
		    error: function (jqXHR, exception) {
		    	console.log(exception);
		    	return 0;
		    }
	  	})
	});
}


function populateTeamInformation(userCanEdit){
	$(document).ready(function(){
		var event = getURLParameterByName('event');
		var teamName = getURLParameterByName('teamName');


	  	$.ajax({
		    type: "POST",
		    url: "populateTeamInformation.php",
		    data: ({
            	event: event,
            	teamName: teamName
            }),
		    success: function(php_script_response){
		    	if(ajaxCallHelper.functions.handleResponseScript(php_script_response) != null){
		        	if(php_script_response == ''){

		        	} else{
		        		var teamInfo = jQuery.parseJSON(php_script_response);
		        		team = teamInfo;
		        		//console.log(teamInfo)

		        		if(userCanEdit){
		        			showPageInMemberDisplayMode();
		        		}else{
			        		showPageInBasicDisplayMode();
		        		}
		        	}
		        }
		    },
		    error: function (jqXHR, exception) {
				console.log(exception);	
		    	return 0;
		    }
	  	})
	});
}

function setTeamInformationOnPage(teamInfo, includePassword){
	document.getElementById("team-name-title").innerHTML = teamInfo['teamName'];
	document.getElementById("event-name").innerHTML = teamInfo['event'];
	document.getElementById("member-names").innerHTML = teamInfo['member1Display'] + '<br/>' + teamInfo['member2Display'] + '<br/>' + teamInfo['member3Display'] + '<br/>' + teamInfo['member4Display'];
	document.getElementById("walk-up-song-name").innerHTML = "<span id=\"walk-up-song-change\">" + teamInfo['walkUpSong'] + "</span>";
	document.getElementById("team-name").innerHTML = "<span id=\"team-name-change\">" + teamInfo['teamName'] + "</span>";
	if(includePassword){
		document.getElementById("password-display").innerHTML = "<label>Password</label><span class=\"team-feature-value\"><span class=\"white-text\"> | </span> <span id=\"password-change\">****</span></span>";
	}
}

function setUpChangeActions(){
	setUpEditActions();
	setUpSaveActions();
	setUpCancelActions();
}

function setUpEditActions(){
	$(document).ready(function() {

		$('#team-actions-edit').click( function() {
			var event = getURLParameterByName('event');
			var teamName = getURLParameterByName('teamName');
 			$.ajax({
	            url: "getTeamPassword.php", // point to server-side PHP script 
	            data: ({
	            	teamName: teamName,
	            	event: event
	            }),                         
	            type: "POST",
	            success: function(php_script_response){
		    		if(ajaxCallHelper.functions.handleResponseScript(php_script_response) != null){			            		
	            		team["securityAnswer"] = php_script_response;
						showPageInEditMode();
	            	}
	            }
	        });

		});
	});

}

function setUpSaveActions(){
	$(document).ready(function() {

		$('#team-actions-save').click( function() {
			var teamName = $('input[name="team-name-input"]').val();
				var password = $('input[name="password-input"]').val();
				var walkUpSong = $('input[name="walk-up-song-input"]').val();
				var event = team["event"];
	
			var inputFieldIdToValueMap = createInputFieldIdToValueMap(teamName, password);
			helperFunctions.functions.removeInputFieldErrors(inputFieldIdToValueMap);

	 		if(!helperFunctions.functions.invalidInputFields(inputFieldIdToValueMap)){
	 			var previousTeamName = team["teamName"];
	 			$.ajax({
		            url: "updateTeam.php", // point to server-side PHP script 
		            data: ({
		            	teamName: teamName,
		            	password: password,
		            	walkUpSong: walkUpSong,
		            	event: event,
		            	previousTeamName: previousTeamName
		            }),                         
		            type: "POST",
		            success: function(php_script_response){
			    		if(ajaxCallHelper.functions.handleResponseScript(php_script_response) == null){			            		
							showPageInMemberDisplayMode();
							team["securityAnswer"] = "";
						}
		            }
		        });
	 		}

		});
	});

}

function setUpCancelActions(){
	$(document).ready(function() {
		$('#team-actions-cancel').click( function() {
			showPageInMemberDisplayMode();
		});
	});

}

function showPageInMemberDisplayMode(){
	setTeamInformationOnPage(team, true);
	showEditButton();
	showJoinLeaveButtons();
	setUpChangeActions();
}

function showPageInBasicDisplayMode(){
	setTeamInformationOnPage(team, false);
	showJoinLeaveButtons();
}

function showPageInEditMode(){
	showSaveCancelButtons();
	hideJoinLeaveButtons();
	showInputBoxes();
	setUpChangeActions();
}

function setupModalFunctionality(){
	setupAttemptJoinTeamFromModal();
	setupAttemptJoinTeamFromModalFORM();
	setupAttemptLeaveTeamFromModal();
}

function setupAttemptJoinTeamFromModal(){
	$(document).ready(function(){
		$('.join-team-modal-button').click(function() { 
			var teamPassword = $('input[name="team-security-answer"]').val();
			var inputFieldIdToValueMap = createInputFieldIdToValueMapJoinModal(teamPassword);
			helperFunctions.functions.removeInputFieldErrors(inputFieldIdToValueMap);

			if(!helperFunctions.functions.invalidInputFields(inputFieldIdToValueMap)){
				$.ajax({
					type: "POST",
					url: "../utilities/php/joinTeam.php",
				    dataType: 'text',  
				    data: ({
				    	teamPassword: teamPassword,
				    	teamToJoin: team['teamName'],
				    	eventToJoin: team['event'],

				    }),             
				    success: function(php_script_response){
				    	if(ajaxCallHelper.functions.handleResponseScript(php_script_response) == null){			            		
			    			if(php_script_response.includes('success')){
			    				location.reload();
			    			}
			    		}
				    }
				})
			}
		});
	});
}


function setupAttemptJoinTeamFromModalFORM(){
	$(document).ready(function(){
		$('#joinTeamForm').submit(function(e) {
			e.preventDefault();
			var teamPassword = $('input[name="team-security-answer"]').val();
			var inputFieldIdToValueMap = createInputFieldIdToValueMapJoinModal(teamPassword);
			helperFunctions.functions.removeInputFieldErrors(inputFieldIdToValueMap);

			if(!helperFunctions.functions.invalidInputFields(inputFieldIdToValueMap)){
				$.ajax({
					type: "POST",
					url: "../utilities/php/joinTeam.php",
				    dataType: 'text',  
				    data: ({
				    	teamPassword: teamPassword,
				    	teamToJoin: team['teamName'],
				    	eventToJoin: team['event'],

				    }),             
				    success: function(php_script_response){						    	
				    	if(ajaxCallHelper.functions.handleResponseScript(php_script_response) == null){			            		
				    		if(php_script_response.includes('success')){
				    			location.reload();
				    		}
			    		}
				    }
				})
			}
		});
	});
}
function setupAttemptLeaveTeamFromModal(){
	$(document).ready(function(){
		$('.leave-team-modal-button').click(function() { 
			$.ajax({
				type: "POST",
				url: "../utilities/php/leaveTeam.php",
			    dataType: 'text',  
			    data: ({
				    teamToLeave: team['teamName'],
				    eventToLeave: team['event'],

			    }),             
			    success: function(php_script_response){
			    	if(ajaxCallHelper.functions.handleResponseScript(php_script_response) == null){			            		
			    		location.reload();
		    		}
			    }
			})
		});
	});
}



function getURLParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function showInputBoxes(){
	document.getElementById("password-change").innerHTML = "<input type=\"text\" id=\"password-input\" name=\"password-input\"  value=\"" + team["securityAnswer"] + "\" class=\"update-team-field-input form-control\">";
	document.getElementById("team-name-change").innerHTML = "<input type=\"text\" id=\"team-name-input\" name=\"team-name-input\"  value=\"" + team["teamName"] + "\" class=\"update-team-field-input form-control\">";
	document.getElementById("walk-up-song-change").innerHTML = "<input type=\"text\" id=\"walk-up-song-input\" name=\"walk-up-song-input\" value=\"" + team["walkUpSong"] + "\" class=\"update-team-field-input form-control\">";
}

function showJoinLeaveButtons(){
	if(team['joinable'] == true){
		showJoinButton();
	}else if(team['leavable'] == true){
		showLeaveButton();
	}
}

function showEditButton(){
	document.getElementById("edit-team-actions").innerHTML = EDIT_BUTTON_MARKUP;
}

function showSaveCancelButtons(){
	document.getElementById("edit-team-actions").innerHTML = SAVE_CANCEL_BUTTONS_MARKUP;
}

function showJoinButton(){
	document.getElementById("join-leave-team-actions").innerHTML = JOIN_BUTTON_MARKUP;
}

function showLeaveButton(){
	document.getElementById("join-leave-team-actions").innerHTML = LEAVE_BUTTON_MARKUP
}

function hideJoinLeaveButtons(){
	document.getElementById("join-leave-team-actions").innerHTML  = "";
}

function createInputFieldIdToValueMap(teamName, password){
	var loginInputIdToValue = {};
	loginInputIdToValue["Team Name"] = {"id":"team-name-input","value":teamName};
	loginInputIdToValue["Team Password"] = {"id":"password-input","value":password};
	return loginInputIdToValue;
}

function createInputFieldIdToValueMapJoinModal(teamPassword){
	var loginInputIdToValue = {};
	loginInputIdToValue["Team Password"] = {"id":"team-security-answer","value":teamPassword};
	return loginInputIdToValue;
}

var EDIT_BUTTON_MARKUP = "<div class=\"edit-team-button\" style=\"margin-right: 5px;\"id=\"team-actions-edit\">Edit Team</div>";
var SAVE_CANCEL_BUTTONS_MARKUP = "<button class=\"btn btn-primary active team-actions-save\" style=\"margin-right: 5px;\" id=\"team-actions-save\">save</button><button class=\"btn btn-secondary active team-actions-cancel\" id=\"team-actions-cancel\">cancel</button>";
var JOIN_BUTTON_MARKUP = "<button class=\"btn btn-primary active\" style=\"margin-right: 5px;\" id=\"team-actions-join\" data-toggle=\"modal\" data-target=\"#joinModal\">Join Team</button>";
var LEAVE_BUTTON_MARKUP =  "<button class=\"btn btn-danger active\" id=\"team-actions-leave\" data-toggle=\"modal\" data-target=\"#leaveModal\">Leave Team</button>";
