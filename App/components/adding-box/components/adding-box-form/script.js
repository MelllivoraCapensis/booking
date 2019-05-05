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

		this.inputs.forEach((inputObject) => {
			this.appendInput(inputObject, this.form);
		})
		this.appendInput({tag: 'button', type: 'submit', name: 'submit', 
			value: 'send', label: ''}, this.form);
	}

	appendInput (inputObject, container) {
		const label = document.createElement('label');
		label.classList.add('adding-form__' + inputObject.name + '-label');

        const input = document.createElement(inputObject.tag);
        input.classList.add('adding-form__' + inputObject.name);
        if(inputObject.tag == 'input')
            input.type = inputObject.type;
        input.name = inputObject.name;
        if(inputObject.tag == 'button')
        	input.textContent = inputObject.value;
        
        const labelText = document.createElement('span');
        labelText.classList.add('adding-form__' + inputObject.name + '-label-text');
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
