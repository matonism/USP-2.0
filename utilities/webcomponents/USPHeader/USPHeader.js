import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class USPHeader extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: 'open'});
		var wc = new WebComponentLoader(this, "USPHeader/USPHeader");

	}


	disconnectedCallback() {

	}

	attributeChangedCallback() {

	}

	execute(component){
		
	}
	
	//******************* END SETUP ******************

}

export default USPHeader;