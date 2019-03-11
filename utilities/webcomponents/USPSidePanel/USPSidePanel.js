import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class USPSidePanel extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: 'open'});
		var wc = new WebComponentLoader(this, "USPSidePanel/USPSidePanel");

	}


	disconnectedCallback() {

	}

	attributeChangedCallback() {

	}

	execute(component){
		this.setUpSidePanel();
	}

	//***************** EXTRA LOGIC *******************

	setUpSidePanel(){
		var side = 'left';
		var size = '30vw';
		if(this.hasAttribute('size')){
			var size = this.getAttribute('size');
			if(size == 'small' || size == 'medium' || size == 'large'){
				size = this.sizeMapping[size];
			}
		}

		if(size.includes('vw')){
			var size = document.documentElement.clientWidth * parseFloat(size) / 100
		}


		if(this.hasAttribute('side')){
			side = this.getAttribute('side');
		}

		var sidePanel = this.shadowRoot.getElementById("side-panel");
		var sidePanelNavTab = this.shadowRoot.getElementById("side-panel-nav-tab");
		var sidePanelArrow = this.shadowRoot.getElementById("side-panel-arrow");

		sidePanel.style.width = size;

		if(side == 'left'){
			sidePanel.style.left = '-' + size;
			sidePanelNavTab.style.left = '0';
			sidePanelArrow.classList.add('side-panel-arrow-right');
		}

		if(side == 'right'){
			sidePanel.style.right = '-' + size;
			sidePanelNavTab.style.right = '0';
			sidePanelArrow.classList.add('side-panel-arrow-left');
		}


		sidePanel.addEventListener("click", this.slideSidePanel(this));
		sidePanelNavTab.addEventListener("click", this.slideSidePanel(this));

	}

	sizeMapping = {
		small: '30vw',
		medium: '60vw',
		large: '90vw'
	}

	slideSidePanel(component){
		return function(){
			var side = component.getAttribute('side');
			var sidePanelNavTab = component.shadowRoot.getElementById("side-panel-nav-tab");
			var sidePanel = component.shadowRoot.getElementById("side-panel");

			if(side == 'left'){
				var sideBarOffset = parseFloat(sidePanel.style.left);

				//if it should slide open
				if(sideBarOffset < 0){
					component.slideSideBarOpenFromLeft(sidePanel, sidePanelNavTab);
				//if it should slide closed
				}else{
					component.slideSideBarClosedFromLeft(sidePanel, sidePanelNavTab);
				}
			}else{
				var sideBarOffset = parseFloat(sidePanel.style.right);

				//if it should slide open
				if(sideBarOffset < 0){
					component.slideSideBarOpenFromRight(sidePanel, sidePanelNavTab);
				//if it should slide closed
				}else{
					component.slideSideBarClosedFromRight(sidePanel, sidePanelNavTab);
				}
			}
		}
	}


	slideSideBarOpenFromLeft(sidePanel, sidePanelNavTab){

		var incrementOnInterval = 5;

		var interval = setInterval(function(){

			var currentSideBarOffset = parseFloat(sidePanel.style.left);
			var navTabOffset = parseFloat(sidePanelNavTab.style.left);
			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				sidePanel.style.left = (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset + incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				sidePanel.style.left = (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset + incrementOnInterval).toString();
			}
		}, 10);
	}

	slideSideBarClosedFromLeft(sidePanel, sidePanelNavTab){
		var incrementOnInterval = 5;

		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat(sidePanel.style.width);
			var currentSideBarOffset = parseFloat(sidePanel.style.left);
			var navTabOffset = parseFloat(sidePanelNavTab.style.left);
			//var mainContentLeftPadding = parseFloat($('.main-content').css("padding-left"));
			//var mainContentRightMargin = parseFloat($('.main-content').css("margin-right"));

			if(currentSideBarOffset <= -currentSideBarWidth + incrementOnInterval){
				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				sidePanel.style.left = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset - incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				sidePanel.style.left = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset - incrementOnInterval).toString();
			}
		}, 10);
	}
	slideSideBarOpenFromRight(sidePanel, sidePanelNavTab){
		var incrementOnInterval = 5;

		var interval = setInterval(function(){
			var currentSideBarOffset = parseFloat(sidePanel.style.right);
			var navTabOffset = parseFloat(sidePanelNavTab.style.right);

			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				sidePanel.style.right =  (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset + incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				sidePanel.style.right = (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset + incrementOnInterval).toString();
			}
		}, 10);
	}

	slideSideBarClosedFromRight(sidePanel, sidePanelNavTab){
		var incrementOnInterval = 5;

		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat(sidePanel.style.width);
			var currentSideBarOffset = parseFloat(sidePanel.style.right);
			var navTabOffset = parseFloat(sidePanelNavTab.style.right);

			if(currentSideBarOffset <= -currentSideBarWidth+incrementOnInterval){

				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				sidePanel.style.right = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset - incrementOnInterval).toString();
				clearInterval(interval);

			}else{

				sidePanel.style.right = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset - incrementOnInterval).toString();
			}
		}, 10);
	}

}


export default USPSidePanel;