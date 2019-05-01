class TabsControl {

	constructor (wrapper, relPath, tabNames) {
	this.tabs = [];

	this.tabNames = tabNames;
    this.path = document.URL + relPath;
    this.wrapper = wrapper;
    this.loadStyles();
    this.loadTemplate();
    this.state = {
    	activeTabNum: 0;
    }
	}
    
    

	loadTemplate () {
		const xhr = new XMLHttpRequest();
		const URL = this.path + 
		  '/index.html';
		xhr.open('GET', URL);
		xhr.send();

		xhr.onload = () => {
          this.wrapper.innerHTML = xhr.response;
    	}
	}

	loadStyles () {
		const styles = document.createElement('link');
		styles.href = this.path + '/css/style.css';
		styles.rel = 'stylesheet';
        document.head.appendChild(styles);
	}

}

const wrapper = 
  document.querySelector('.tabs-control-wrapper');
const tabsControlExemplar = new TabsControl(wrapper,
	'App/components/tabs-control');
