
var helperFunctions = (function(helperFunctions){

	helperFunctions.functions = {
		invalidInputFields: invalidInputFields,
		removeInputFieldErrors: removeInputFieldErrors,
		setFormErrorFormatting: setFormErrorFormatting,
		viewIsMobile: viewIsMobile,
		viewIsDesktop: viewIsDesktop,
		verticallyCenterElements: verticallyCenterElements,
		hideElementsForMobile: hideElementsForMobile,
		hideElementsForDesktop: hideElementsForDesktop

	}

	return helperFunctions;

	function invalidInputFields(inputIdToValueMap){
		var invalidInput = false;
		for(var fieldName in inputIdToValueMap){
			var idValuePair = inputIdToValueMap[fieldName];
			var id = idValuePair['id'];
			var domElement = document.getElementById(id);
			var fieldValue = idValuePair['value'];
			
			invalidInput = checkForInputErrors(fieldName, domElement, fieldValue);
			if(invalidInput){
				return true;
			}
			
		}
		return false;
	}

	function setFormErrorFormatting(element, errorString){
	 	element.style.border = "2px solid red";
	 	toastr.error(errorString);
	}

	function removeInputFieldErrors(inputIdToValueMap){
		for(var input in inputIdToValueMap){
			var idValue = inputIdToValueMap[input];
			var element = document.getElementById(idValue['id']);
			element.style.border = "1px solid #ccc";
		}
	}


	function checkForInputErrors(fieldName, domElement, fieldValue){
		if(fieldValue == ""){
			setFormErrorFormatting(domElement, fieldName + " cannot be blank");

		}else if(fieldValue.length > 100){
			setFormErrorFormatting(domElement, fieldName + " must be less than 100 characters");

		}else if(fieldName.toLowerCase() == 'password' && fieldValue.length < 8){
			setFormErrorFormatting(domElement, fieldName + " must have more than 8 characters");

		}else if((fieldName.toLowerCase() == 'username' || fieldName.toLowerCase() == 'password') && fieldValue.indexOf(' ') >= 0){
        	setFormErrorFormatting(domElement, "You cannot have spaces in your " + fieldName);

		}else if(fieldName.toLowerCase() == 'team name' && fieldValue.includes('+')){
			setFormErrorFormatting(domElement, fieldName + " cannot have a (+) symbol");

		}else{
			return false;
		}
		return true;
	}

	function viewIsMobile(){
		if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     		return true;
   		} else {
     		return false;
   		}
	}

	function viewIsDesktop(){
		if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     		return false;
   		} else {
     		return true;
   		}
	}

	function verticallyCenterElements(){

		var verticallyCenter = function(){
			var verticalCenteredElements = $('.vertical-center');

			if(verticalCenteredElements.length > 0){
				window.addEventListener("resize", verticallyCenter);
			}

			for(var i = 0; i < verticalCenteredElements.length; i++){
				var element = $(verticalCenteredElements[i]);
				var parentElement = $(verticalCenteredElements[i].parentElement)
				var parentHeight = parseFloat(parentElement.css("height"));
				var elementHeight = parseFloat(element.css("height"));

				paddingTop = parentHeight/2 - elementHeight/2;
				// element.css("padding-top", paddingTop);
				element.css("position", 'relative');
				element.css("top", paddingTop);
				
			}
		}

		$(document).ready(verticallyCenter());
	}

	function hideElementsForMobile(){
		$(document).ready(function(){
			if(helperFunctions.functions.viewIsMobile()){
				$(".hide-mobile").css("display", "none");
			}
		});
	}

	function hideElementsForDesktop(){
		$(document).ready(function(){
			if(helperFunctions.functions.viewIsDesktop()){
				$(".hide-desktop").css("display", "none");
			}
		});
	}

})(helperFunctions || []);

