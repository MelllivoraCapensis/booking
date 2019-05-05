class Base {
	constructor (wrapper, tabsControl) {

		this.wrapper = wrapper;
		this.tabsControl = tabsControl;
	}
	
	set visibility (value) {
		this.state.visibility = value;
		this.renderVisibility();
	}

	renderVisibility () {
		if(!this.state.visibility)
		    this.wrapper.classList.add('hidden');
		else
			this.wrapper.classList.remove('hidden');
	}
    
    setVisibility (activeTabName) {
		if(activeTabName != this.tabName)
			this.visibility = false;
		else
			this.visibility = true;
	}

}
