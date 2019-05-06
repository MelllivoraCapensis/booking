class AddingBoxForm {

	constructor (wrapper, relPath) {
		this.wrapper = wrapper;
        this.path = relPath;
        this.state = {
        	features: []
        };

		this.init();
	}

	init () {
		this.build();
	}

	build () {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', this.path + '/index.html');
		xhr.send();
		xhr.onload = (e) => {
			this.wrapper.innerHTML = xhr.response;
			this.form = this.wrapper.querySelector('form.adding-box__form');
			this.addHandlers();
		}
	}

	addHandlers () {
		this.form.onsubmit = (e) => {
			e.preventDefault();
			if(!this.isValid())
				return;
		}
		this.addFeaturesClickHandler();
		
	}

	addFeaturesClickHandler () {
		this.form.querySelectorAll('.features-box div')
		    .forEach((item) => {
		    	const feature = {
		    		name: item.dataset.name,
		    		checked: false,
		    		element: item
		    	};
		    	feature.element.querySelector('img').
		    	    onclick = (e) => {
		    	    	e.preventDefault();
		    	    }
		    	const toggleFunction = (e) => {
		    		feature.checked = !feature.checked;
                    feature.element.classList.toggle(
                    	'features-box__item--checked');
		    	}

		    	feature.element.onclick = toggleFunction;

		    	feature.element.onkeydown = (e) => {
		    		if(e.key == 'Enter')
		    		toggleFunction();

		    	}
		    	this.state.features.push(feature);
		    })
		

	}

	isValid () {
         
	}
}
