
resizeFunctions.functions.initialActions();
checkForLogin();
setUpCreateAccontFormActions();

function setUpCreateAccontFormActions(){
	$(document).ready(function() {
		$('#createAccountForm').submit(function(e) {
	        // Stop the regular post action
	        e.preventDefault();

	        var $form = $(this);
	        var action = $form[0].action;
	        var method = $form[0].method;
	        var lastname = $('input[name="last-name"]').val();
	        var firstname = $('input[name="first-name"]').val();
	        var username = $('input[name="username"]').val();
	        var password = $('input[name="password"]').val();
	        var confirmPassword = $('input[name="confirm-password"]').val();

		 	var inputIdToValueMap = createInputFieldIdToValueMap(firstname, lastname, username, password, confirmPassword);
		 	helperFunctions.functions.removeInputFieldErrors(inputIdToValueMap);


			if(!helperFunctions.functions.invalidInputFields(inputIdToValueMap)){
		        	
		        if(password != confirmPassword){
		        	helperFunctions.functions.setFormErrorFormatting(document.getElementById("create-account-confirm-password"), "Passwords do not match");
		        }else{
		 			$.ajax({
			            url: action,
			            data: ({
			            	firstname: firstname,
			            	lastname: lastname,
			            	username: username,
			            	password: password,
			            }),                         
			            type: method,
			            success: function(php_script_response){
			            	if(ajaxCallHelper.functions.handleResponseScript(php_script_response) != null){
			            		console.log('error: ' + php_script_response);
			            	}
			            },
					    error: function (jqXHR, exception) {
					    	console.log(exception);
					    	return 0;
					    }
			        });
		 		}
	 		}

	    });
	});
}

function createInputFieldIdToValueMap(firstname, lastname, username, password, confirmPassword){
	var loginInputIdToValue = {};
	loginInputIdToValue["First Name"] = {"id":"create-account-first-name","value":firstname};
	loginInputIdToValue["Last Name"] = {"id":"create-account-last-name","value":lastname};
	loginInputIdToValue["Username"] = {"id":"create-account-username","value":username};
	loginInputIdToValue["Password"] = {"id":"create-account-password","value":password};
	loginInputIdToValue["Confirm Password"] = {"id":"create-account-confirm-password","value":confirmPassword};
	return loginInputIdToValue;
}