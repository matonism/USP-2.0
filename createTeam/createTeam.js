resizeFunctions.functions.initialActions();
checkForLogin();
submitNewTeamForm();


function submitNewTeamForm(){
	$(document).ready(function() {
		$('#createTeamForm').submit(function(e) {
	        e.preventDefault();

	        var $form = $(this);
	        var action = $form[0].action;
	        var method = $form[0].method;
	 		var event = $('#team-event').find(":selected").text();
	 		var name = $('input[name="team-name"]').val();
	 		var teamPassword = $('input[name="team-password"]').val();
	 		var walkUpSong = $('input[name="walk-up-song"]').val();

			var inputFieldIdToValueMap = createInputFieldIdToValueMap(event, name, teamPassword);
	 		helperFunctions.functions.removeInputFieldErrors(inputFieldIdToValueMap);

	 		if(!helperFunctions.functions.invalidInputFields(inputFieldIdToValueMap)){
	 			$.ajax({
		            url: action, // point to server-side PHP script 
		            data: ({
		            	event: event,
		            	name: name,
		            	teamPassword: teamPassword,
		            	walkUpSong: walkUpSong
		            }),                         
		            type: method,
		            success: function(php_script_response){
		            	eval(php_script_response);
		            	
		            }
		        });
	 		}
	 		
	 	});
	});
}


function createInputFieldIdToValueMap(event, name, teamPassword){
	var loginInputIdToValue = {};
	loginInputIdToValue["Event"] = {"id":"team-event","value":event};
	loginInputIdToValue["Team Name"] = {"id":"team-name","value":name};
	loginInputIdToValue["Team Password"] = {"id":"team-password","value":teamPassword};
	return loginInputIdToValue;
}
