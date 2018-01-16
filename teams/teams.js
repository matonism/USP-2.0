
resizeFunctions.functions.initialActions();
checkForLogin();



var events = '';
var teamToJoin = '';
var eventToJoin = '';

displayTable();
joinTeams();
clickToDisplayTable();
setupAttemptJoinTeamFromModal();
setupAttemptJoinTeamFromModalFORM();
setupAttemptLeaveTeamFromModal();
setupCancelJoinTeam();

function setupAttemptJoinTeamFromModal(){
	$(document).ready(function(){
		$('.join-team-modal-button').click(function() { 
			var teamPassword = $('input[name="team-security-answer"]').val();
			resetFormStyles();
			if(teamPassword == ''){
				toastr.error('You must enter a team password first');
				setFormErrorFormatting(document.getElementById("team-security-answer"));
			}else{
				$.ajax({
					type: "POST",
					url: "../utilities/php/joinTeam.php",
				    dataType: 'text',  // what to expect back from the PHP script, if anything
				    data: ({
				    	teamPassword: teamPassword,
				    	teamToJoin: teamToJoin,
				    	eventToJoin: eventToJoin,

				    }),             
				    success: function(php_script_response){
				    	console.log(php_script_response);
				    	eval(php_script_response);
						if(php_script_response.includes('success')){
					    	location.reload();
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
			resetFormStyles();
			if(teamPassword == ''){
				toastr.error('You must enter a team password first');
				setFormErrorFormatting(document.getElementById("team-security-answer"));
			}else{
				$.ajax({
					type: "POST",
					url: "../utilities/php/joinTeam.php",
		    dataType: 'text',  // what to expect back from the PHP script, if anything
		    data: ({
		    	teamPassword: teamPassword,
		    	teamToJoin: teamToJoin,
		    	eventToJoin: eventToJoin,

		    }),             
		    success: function(php_script_response){
		    	console.log(php_script_response);
		    	eval(php_script_response);
		    	if(php_script_response.includes('success')){
			    	location.reload();
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
			    dataType: 'text',  // what to expect back from the PHP script, if anything
			    data: ({
			    	teamToLeave: teamToJoin,
			    	eventToLeave: eventToJoin

			    }),             
			    success: function(php_script_response){
			    	console.log(php_script_response);
			    	eval(php_script_response);
			    	location.reload();
			    }
			})
		});
	});
}
function setupCancelJoinTeam(){
	$(document).ready(function(){
		$('.close-modal-button').click(function() { 
			clearJoinTeamVariables();
		});
	});
}

function clearJoinTeamVariables(){
	teamToJoin = '';
	eventToJoin = '';
}


function toggleJoinLeaveTeamButton(){
	if(document.getElementById("join-team-button").style.display == "inline"){
		document.getElementById("join-team-button").style.display = "none";
		document.getElementById("cancel-join-team-button").style.display = "inline";
		clickToDisplayTable();
	}else {
		document.getElementById("cancel-join-team-button").style.display = "none";
		document.getElementById("join-team-button").style.display = "inline";
	}
}

function getSelectedJoinDetails(){
	$(document).ready(function() {

		$('.join').click( function() {

			for(j in events){
				for(i in events[j]){
					var eventIdString = events[j][i].teamName.replace(/\s+/g, '+') + '&' + events[j][i].event.replace(/\s+/g, '+');
					var id = $(this).attr('id');
					if (id == eventIdString) {
						$("#join-team-modal-label").html('Join ' + events[j][i].teamName);
						eventToJoin = events[j][i].event;
						teamToJoin = events[j][i].teamName;
					}		
				}
			}

		});
	});

}

function setupNavigateToSelectedTeamDetails(){
	$(document).ready(function() {

		$('.team-link').click( function() {

			for(j in events){
				for(i in events[j]){
					var eventIdString = events[j][i].teamName.replace(/\s+/g, '+') + '&' + events[j][i].event.replace(/\s+/g, '+');
					var id = $(this).attr('id');
					if (id == eventIdString) {
						window.location.replace('http://ultimatesummerparty.com/teamDetail/?teamName=' + events[j][i].teamName.replace(/\s+/g, '+') + '&event=' + events[j][i].event.replace(/\s+/g, '+'));

					}		
				}
			}

		});
	});

}

function getSelectedLeaveDetails(){
	$(document).ready(function() {

		$('.leave').click( function() {

			for(j in events){
				for(i in events[j]){
					var eventIdString = events[j][i].teamName.replace(/\s+/g, '+') + '&' + events[j][i].event.replace(/\s+/g, '+');
					var id = $(this).attr('id');
					if (id == eventIdString) {
						$("#leave-team-modal-label").html('Leave ' + events[j][i].teamName);
						eventToJoin = events[j][i].event;
						teamToJoin = events[j][i].teamName;
					}		
				}
			}

		});
	});

}
function displayTable(){
	$(document).ready(function() {

		var action = "../utilities/php/getTeams.php";
		var method = "POST";
		$.ajax({
            url: action, // point to server-side PHP script 
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            type: method,
            success: function(php_script_response){
            	//alert(php_script_response);
            	console.dir(php_script_response);
            	if(php_script_response.includes('toastr')){
            		eval(php_script_response);
            	}else if(php_script_response == ''){

            	} else{
            		events = jQuery.parseJSON(php_script_response);
            		var table = '';

            		for(j in events){
            			
            			table+="<div class=\"table-title\">" + j + '</div>';
            			table += "<table class=\"table table-hover table-condensed table-striped\"><thead><tr><th>Team Name</th><th>Members</th><th>Walkup Song</th></tr></thead><tbody>";
            			
            			for(var i = 0; i < events[j].length; i++){

            				table += '<tr><td><div class="team-link" id="' + events[j][i].teamName.replace(/\s+/g, '+') + '&' + events[j][i].event.replace(/\s+/g, '+') + '">' + events[j][i].teamName + '</div></td>' + '<td> ';
            				if(events[j][i].member1 != ''){
            					table += events[j][i].member1Display;
            				}
            				if(events[j][i].member2 != ''){
            					table += '<br/>' + events[j][i].member2Display;
            				}
            				if(events[j][i].member3 != ''){
            					table += '<br/>' + events[j][i].member3Display; 
            				}
            				if(events[j][i].member4 != ''){
            					table += '<br/>' + events[j][i].member4Display; 
            				}
            				table += '</td>';
            				table += '<td>' + events[j][i].walkUpSong + '</td></tr>';
            			}
            			table+='</tbody></table><br/><br/>';
            		}
            		$("#tableContainer").html(table);

            		console.log(table);
            		toggleJoinLeaveTeamButton();
            		setupNavigateToSelectedTeamDetails();

            	}


            },
            error: function (jqXHR, exception) {
            	var msg = '';
            	if (jqXHR.status === 0) {
            		msg = 'Not connect.\n Verify Network.';
            	} else if (jqXHR.status == 404) {
            		msg = 'Requested page not found. [404]';
            	} else if (jqXHR.status == 500) {
            		msg = 'Internal Server Error [500].';
            	} else if (exception === 'parsererror') {
            		msg = 'Requested JSON parse failed.';
            	} else if (exception === 'timeout') {
            		msg = 'Time out error.';
            	} else if (exception === 'abort') {
            		msg = 'Ajax request aborted.';
            	} else {
            		msg = 'Uncaught Error.\n' + jqXHR.responseText;
            	}
            	console.log(msg);
            },

        });
	});
}

function clickToDisplayTable(){
	$('.cancel-join-team-button').click(function() { 
		displayTable();
	});
}

function joinTeams(){
	$(document).ready(function(){
		$('.join-team-button').click(function() { 
			var action = "../utilities/php/getJoinableTeams.php";
			var method = "POST";
			$.ajax({
	        url: action, // point to server-side PHP script 
	        dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false,
	        processData: false,
	        type: method,
	        success: function(php_script_response){
	        	//alert(php_script_response);
	        	console.dir(php_script_response);
	        	if(php_script_response.includes('toastr')){
	        		eval(php_script_response);
	        	}else if(php_script_response == ''){

	        	} else{
	        		var events = jQuery.parseJSON(php_script_response);

		        	// var events = php_script_response;
		        	var table = '';

		        	for(j in events){
		        		
		        		table+="<div class=\"table-title\">" + j + '</div>';
		        		table += "<table class=\"table table-hover table-condensed table-striped\"><thead><tr><th>Join</th><th>Team Name</th><th>Members</th><th>Walkup Song</th></tr></thead><tbody>";
		        		
		        		for(var i = 0; i < events[j].length; i++){

		        			table += '<tr><td>';
		        			if(events[j][i].joinable){
		        				table += '<button class=\"join btn btn-primary active\" id=\"'+ events[j][i].teamName.replace(/\s+/g, '+') + '&' + j.replace(/\s+/g, '+') + '\" data-toggle=\"modal\" data-target=\"#joinModal\">JOIN</button>';
		        			}else if(events[j][i].leavable){
		        				table += '<button class=\"leave btn btn-danger\" id=\"'+ events[j][i].teamName.replace(/\s+/g, '+') + '&' + j.replace(/\s+/g, '+') + '\" data-toggle=\"modal\" data-target=\"#leaveModal\">LEAVE</button>';

		        			}
		        			table += '</td>';
		        			table += '<td><div class="team-link" id="' + events[j][i].teamName.replace(/\s+/g, '+') + '&' + events[j][i].event.replace(/\s+/g, '+') + '">' + events[j][i].teamName + '</div></td>' + '<td> ';
		        			if(events[j][i].member1 != ''){
		        				table += events[j][i].member1Display;
		        			}
		        			if(events[j][i].member2 != ''){
		        				table += '<br/>' + events[j][i].member2Display;
		        			}
		        			if(events[j][i].member3 != ''){
		        				table += '<br/>' + events[j][i].member3Display; 
		        			}
		        			if(events[j][i].member4 != ''){
		        				table += '<br/>' + events[j][i].member4Display; 
		        			}
		        			table += '</td>';
		        			table += '<td>' + events[j][i].walkUpSong + '</td></tr>';
		        		}
		        		table+='</tbody></table><br/><br/>';
		        	}
		        	$("#tableContainer").html(table);

		        	console.log(table);
		        	toggleJoinLeaveTeamButton();
		        	getSelectedJoinDetails();
		        	getSelectedLeaveDetails();
		        	setupNavigateToSelectedTeamDetails();

		        }

		    },
		    error: function (jqXHR, exception) {
		    	var msg = '';
		    	if (jqXHR.status === 0) {
		    		msg = 'Not connect.\n Verify Network.';
		    	} else if (jqXHR.status == 404) {
		    		msg = 'Requested page not found. [404]';
		    	} else if (jqXHR.status == 500) {
		    		msg = 'Internal Server Error [500].';
		    	} else if (exception === 'parsererror') {
		    		msg = 'Requested JSON parse failed.';
		    	} else if (exception === 'timeout') {
		    		msg = 'Time out error.';
		    	} else if (exception === 'abort') {
		    		msg = 'Ajax request aborted.';
		    	} else {
		    		msg = 'Uncaught Error.\n' + jqXHR.responseText;
		    	}
		    	console.log(msg);
		    },

		});
		});
	});
}

function resetFormStyles(){
	var securityAnswerElement = document.getElementById("team-security-answer");
	securityAnswerElement.style.border = "1px solid #ccc";
}

function setFormErrorFormatting(element){
	element.style.border = "2px solid red";
}