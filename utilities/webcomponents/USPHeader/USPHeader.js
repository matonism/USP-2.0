import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class USPHeader extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		if(this.getAttribute(mobile)){
			var wc = new WebComponentLoader(this, "USPHeader/USPHeader-mobile");
		}else{
			var wc = new WebComponentLoader(this, "USPHeader/USPHeader");
		}
			var shadowRoot = this.attachShadow({mode: 'open'});

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