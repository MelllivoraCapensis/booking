class Filter {
	constructor (wrapper, relPath) {
	this.path = document.URL + relPath;
    this.wrapper = wrapper;

    this.state = {
    	data: null
    }

    this.updateEvent = new Event('update');
    this.loadStyles();
    this.loadTemplate();
    this.addUpdateListening();
    this.loadData();

    }

    addUpdateListening(callback) {
    	this.updateListeningElem = document.createElement('div');
    	this.wrapper.appendChild(this.updateListeningElem);
    	this.updateListeningElem.classList.add('hidden');
    	this.updateListeningElem.addEventListener('update', callback);
    }

    validate() {
    	return true;
    }

    getData () {
    	return this.state.data;
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
                this.updateListeningElem.dispatchEvent(this.updateEvent);
            }
    }
    
	loadTemplate () {
		const xhr = new XMLHttpRequest();
		const url = this.path + '/index.html';
		xhr.open('GET', url);
		xhr.send();
		xhr.onload = () => {
			this.wrapper.innerHTML = xhr.response;
			this.form = document.querySelector('form.filter');
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

const filterExemplar = new Filter(document.querySelector('.filter-wrapper'),
	'App/components/filter');
