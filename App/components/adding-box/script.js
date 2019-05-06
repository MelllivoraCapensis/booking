//depends on AddFormMap
class AddingBox extends Base {
	constructor (wrapper, relPath, mapCoords, mapZoom, tabsControl) {
		
		super(wrapper, tabsControl);

		this.tabName = 'adding box';
		this.path = relPath;
		this.wrapper = wrapper;
		this.tabsControl = tabsControl;

		this.state = {
			visibility: true,
			coords: {
				x: null,
				y: null
			}
		}
		this.init(mapZoom, mapCoords);
	}

	set visibility (value) {
		this.state.visibility = value;
		this.fixMapBug();
		this.renderVisibility();
	}

	renderVisibility () {
		if(!this.state.visibility)
			this.wrapper.classList.add('hidden');
		else
			this.wrapper.classList.remove('hidden');
	}

	init (mapZoom, mapCoords) {
	    this.build(mapZoom, mapCoords);
    	this.tabsControl.addListening('updateActiveTab', () => {
		this.setVisibility(this.tabsControl.getActiveTabName());
		})
	}
    
    //static part of component

	build (mapZoom, mapCoords) {
		this.box = this.appendBox('adding-box');
		this.form = this.importForm();  
		this.map = this.importMap(mapCoords, mapZoom);
	}

	importMap (mapCoords, mapZoom) {
		const mapWrapper = this.appendChildWrapper('adding-box__map-wrapper');
		const map = new AddingBoxMap(mapWrapper, 'addinb-box-map',
			mapCoords, mapZoom);
		return map;
	}

	importForm () {
		const wrapper = this.appendChildWrapper('adding-box__form-wrapper');
		const form = new AddingBoxForm(wrapper, document.URL + this.path +
			'/components/adding-box-form');
		return form;
	}

	// importForm () {
	// 	const wrapper = this.appendChildWrapper('adding-box__form-wrapper');
	// 	const inputs = [
	// 	{tag: 'select', name: 'type', label: 'type', type: '', options:
	//        [{room: 'room'}, {flat: 'flat'}]},
	// 	{tag: 'input', name: 'subway', label: 'subway', type: 'text'},
	// 	{tag: 'input', name: 'price', label: 'price', type: 'number', min: 0, max: 200000},
	// 	{tag: 'textarea', name: 'description', label: 'description',
	// 	    minlength: 20, maxlength: 200},
	// 	{tag: 'input', name: 'image', label: 'image', type: 'file'},
	// 	{tag: 'input', name: 'internet', label: 'internet', type: 'checkbox'},
	// 	{tag: 'input', name: 'kitchen', label: 'kitchen', type: 'checkbox'},
	// 	{tag: 'input', name: 'washing-machine', label: 'washing-machine', type: 'checkbox'},
	// 	{tag: 'input', name: 'pet', label: 'pet', type: 'checkbox'},
	// 	{tag: 'input', name: 'lift', label: 'lift', type: 'checkbox'},
	// 	];
	// 	const form = new AddingBoxForm(wrapper, inputs);
	// 	return form;
	// }

	appendChildWrapper (className) {
		const childWrapper = document.createElement('div');
		childWrapper.classList.add(className);
		this.box.appendChild(childWrapper);
		return childWrapper;
	}

	appendBox (className) {
		const box = document.createElement('div');
		box.classList.add('adding-box');
		this.wrapper.appendChild(box);
		return box;
	}
    
    //
	
	validate () {
		return true;
	}

	fixMapBug() {
    	const resizeEvent = new Event('resize');
		window.dispatchEvent(resizeEvent);
    }

	setVisibility (activeTabName) {
		if(activeTabName != this.tabName)
			this.visibility = false;
		else
			this.visibility = true;
	}
}

