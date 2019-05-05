class AddingBoxForm {

	constructor (wrapper, inputs) {
		this.wrapper = wrapper;
		this.inputs = inputs;
        
        this.state = {};

		this.init();
	}

	init () {
		this.build();
		this.addHandlers();
	}

	build () {
		this.form = document.createElement('form');
		this.form.classList.add('adding-box__form');
		this.form.classList.add('adding-form');
		this.wrapper.appendChild(this.form);

		this.inputs.filter((inputObject) => inputObject.type != 'checkbox')
		    .forEach((inputObject) => {
			    this.appendInput(inputObject, this.form);
		    })
        
		this.featuresBox = document.createElement('fieldset');
		this.featuresBox.classList.add('adding-box__features');
		this.featuresBox.classList.add('features-box');
		this.form.insertBefore(this.featuresBox, 
			this.form.querySelector('.adding-box__submit'));

        this.inputs.filter((inputObject) => inputObject.type == 'checkbox')
            .forEach((inputObject) => {
            	this.appendInput(inputObject, this.featuresBox);
            })

		this.appendInput({tag: 'button', type: 'submit', name: 'submit', 
			value: 'send', label: ''}, this.form);
	}

	appendInput (inputObject, container) {

        const input = document.createElement(inputObject.tag);
       
        switch (inputObject.tag) {
        	case 'input':
        		input.type = inputObject.type;
        		if(input.type == 'number')
        		{
        			input.min = inputObject.min;
        			input.max = inputObject.max;
        		}
        		break;
    		case 'select':
    		    inputObject.options.forEach((option) => {
        		const item = document.createElement('option');
        		input.appendChild(item);
        		item.value = Object.keys(option)[0];
        		item.textContent = option[item.value];
        	    })
	    		break;
    		case 'button':
    		    input.textContent = inputObject.value;
	    		break;
	        case 'textarea':
	            input.minLength = inputObject.minlength;
	            input.maxLength = inputObject.maxlength;
        	default:
        		// statements_def
        		break;
        }

        const classPrefix = 
		    (input.type == 'checkbox') ? 'features-box__' : 'adding-form__';
        console.log(classPrefix);
        input.classList.add(classPrefix + inputObject.name);

		const label = document.createElement('label');
		label.classList.add(classPrefix + inputObject.name + '-label');
       
        input.name = inputObject.name;
        input.required = true;


        const labelText = document.createElement('span');
        labelText.classList.add(classPrefix + 
            inputObject.name + '-label-text');
        labelText.textContent = inputObject.label;

        label.appendChild(labelText);
        label.appendChild(input);
		container.appendChild(label);
	}

	addHandlers () {
		this.form.onsubmit = (e) => {
			e.preventDefault();
			if(!this.isValid())
				return;
		}
	}

	isValid () {
         
	}
}
