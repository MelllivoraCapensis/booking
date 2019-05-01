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
    this.setActiveTab(0);
	}
    
    setActiveTab(tabNum) {
    	this.state.activeTabNum = tabNum;
    	this.tabs.forEach((tab) => {
    		tab.classList.remove('tabs-control__item--current');
       	})
       	this.tabs[tabNum].classList
       	  .add('tabs-control__item--current');
    }


	loadTemplate () {
		const template = document.createElement('ul');
		template.classList.add('tabs-control');
		this.tabNames.forEach((tabName, ind) => {
			const item = document.createElement('li');
			this.tabs.push(item);
			item.dataset.tabNum = ind;
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

const wrapper = 
  document.querySelector('.tabs-control-wrapper');
const tabsControlExemplar = new TabsControl(wrapper,
	'App/components/tabs-control', ['list', 'map', 'add form']);
