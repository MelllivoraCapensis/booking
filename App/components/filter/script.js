class Filter {
	constructor (wrapper, relPath) {
		this.path = document.URL + relPath;
		this.wrapper = wrapper;

		this.state = {
			data: null
		}
		this.events = {};

		this.init();
	}

	init () {
		this.build();
		this.addUpdateNotifying();
	}

    //static part of component

    build () {
    	const xhr = new XMLHttpRequest();
    	const url = this.path + '/index.html';
    	xhr.open('GET', url);
    	xhr.send();
    	xhr.onload = () => {
    		this.wrapper.innerHTML = xhr.response;
    		this.form = document.querySelector('form.filter');
    		this.addHandlers();
    		this.loadData();
    	}
    }

	//

    // handlers

    addHandlers () {
    	this.addFormHandler();
    }

    addFormHandler() {
    	this.form.onsubmit = (e) => {
    		e.preventDefault();
    		if(!this.validate())
    			return;
    		this.loadData();
    	}
    }

    loadData () {
    	const xhr = new XMLHttpRequest();
    	const url = 'http://training.tw1.ru/';
    	xhr.open('POST', url);
    	const formData = new FormData(this.form);
    	xhr.send(formData);
    	xhr.onload = () => {
    		this.state.data = JSON.parse(xhr.response);
    		this.generateUpdateDataEvent();
    	}
    }

    validate() {
    	return true;
    }
    
    //

    addUpdateNotifying () {
    	this.updateNotifyingElem = document.createElement('div');
    	this.wrapper.appendChild(this.updateNotifyingElem);
    	this.updateNotifyingElem.style.display = 'none';

    	this.events.updateData = {
    		eventObject: new Event('updateData'),
    		eventTarget: this.updateNotifyingElem
    	};
    }

    addListening (eventName, callback) {
    	this.events[eventName].eventTarget
    	.addEventListener(eventName, callback);
    }

    generateUpdateDataEvent () {
    	this.events.updateData.eventTarget
    	.dispatchEvent(this.events.updateData.eventObject);
    }

    //external API

    getData () {
    	return this.state.data;
    }
}

