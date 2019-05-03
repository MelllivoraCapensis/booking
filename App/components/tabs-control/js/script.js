class TabsControl {

	constructor (wrapper, relPath, tabNames) {
	this.tabs = [];
	this.tabNames = tabNames;
    this.path = document.URL + relPath;
    this.wrapper = wrapper;
    this.loadStyles();
    this.loadTemplate();
    this.state = {
    	activeTabNum: null
    }
    this.update = new Event('update');
    this.addUpdateListening();
    this.setActiveTab(0);
	}
    
    addUpdateListening(callback) {
    	this.updateListeningElem = document.createElement('div');
    	this.wrapper.appendChild(this.updateListeningElem);
    	this.updateListeningElem.classList.add('hidden');
    	this.updateListeningElem.addEventListener('update', callback);
    }


    setActiveTab(tabNum) {
    	this.state.activeTabNum = tabNum;
    	this.tabs.forEach((tab) => {
    		tab.classList.remove('tabs-control__item--current');
       	})
       	this.tabs[tabNum].classList
       	  .add('tabs-control__item--current');
       	this.updateListeningElem.dispatchEvent(this.update);
    }
    
    getActiveTabName () {
    	return this.tabs[this.state.activeTabNum].dataset.tabName;
    }

	loadTemplate () {
		const template = document.createElement('ul');
		template.classList.add('tabs-control');
		this.tabNames.forEach((tabName, ind) => {
			const item = document.createElement('li');
			this.tabs.push(item);
			item.dataset.tabNum = ind;
			item.dataset.tabName = tabName;
			item.classList.add('tabs-control__item');
			item.textContent = tabName;
			template.appendChild(item);
		})
		this.wrapper.innerHTML = '';
		this.wrapper.appendChild(template);
		template.onclick = (e) => {
			this.setActiveTab(e.target.dataset.tabNum);
		}
	}

	loadStyles () {
		const styles = document.createElement('link');
		styles.href = this.path + '/css/style.css';
		styles.rel = 'stylesheet';
        document.head.appendChild(styles);
	}
}

