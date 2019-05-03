class AddForm {
	constructor (wrapper, relPath) {
	this.tabName = 'add form';
	this.path = document.URL + relPath;
    this.wrapper = wrapper;
    this.loadStyles();
    this.loadTemplate();
    }
    
    display (activeTabName) {
    	if(activeTabName != this.tabName)
         	this.wrapper.classList.add('hidden');
         else
         	this.wrapper.classList.remove('hidden');
    }

    validate () {
    	return true;
    }
    
    addItem () {
        const xhr = new XMLHttpRequest();
		const url = this.path + '/index.html';
		xhr.open('POST', url);
		const formData = new FormData(this.form);
		xhr.send(formData);
    }

    addFormHandler () {
        this.form.onsubmit = (e) => {
        	e.preventDefault();
        	if(!this.validate())
        		return;
        	this.addItem();
        }
    }

    loadTemplate () {
		const xhr = new XMLHttpRequest();
		const url = this.path + '/index.html';
		xhr.open('GET', url);
		xhr.send();
		xhr.onload = () => {
			this.wrapper.innerHTML = xhr.response;
			this.form = document.querySelector('form.add-form');
			this.addFormHandler();
		}

	}

	loadStyles () {
		const styles = document.createElement('link');
		styles.href = this.path + '/css/style.css';
		styles.rel = 'stylesheet';
        document.head.appendChild(styles);
	}
}

