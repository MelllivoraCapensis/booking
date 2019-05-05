class TabsControl {

	constructor (wrapper, relPath, tabNames, activeTabNum) {
		this.tabs = [];
		this.tabNames = tabNames;
		this.path = document.URL + relPath;
		this.wrapper = wrapper;
		this.state = {
			activeTabNum: null
		}
		this.events = [];
		this.init(activeTabNum);
	}

	set activeTabNum (value) {
		this.state.activeTabNum = value;
		this.render();
        this.updateNotifyingElem
            .dispatchEvent(this.events.updateActiveTab.eventObject);
	}

	init (activeTabNum) {
		this.build();
        this.addHandlers();
        this.addUpdateNotifying();
        this.activeTabNum = activeTabNum;
	}

	build () {
		this.box = document.createElement('ul');
		this.box.classList.add('tabs-control');

		this.tabNames.forEach((tabName, ind) => {

			const tab = document.createElement('li');
			tab.dataset.tabNum = ind;
			tab.dataset.tabName = tabName;
		    tab.textContent = tabName;
			tab.classList.add('tabs-control__item');

			this.tabs.push(tab);
			this.box.appendChild(tab);
		})

		this.wrapper.innerHTML = '';
		this.wrapper.appendChild(this.box);
	
	}

	addHandlers () {
		this.box.onclick = (e) => {
			this.activeTabNum = e.target.dataset.tabNum;
		}
	}

	render () {
		this.tabs.forEach((tab) => {
			tab.classList.remove('tabs-control__item--current');
		})
		this.tabs[this.state.activeTabNum].classList
		.add('tabs-control__item--current');
	}

	addUpdateNotifying (callback) {
		this.updateNotifyingElem = document.createElement('div');
		this.wrapper.appendChild(this.updateNotifyingElem);
		this.updateNotifyingElem.style.display = 'none';

		this.events.updateActiveTab = {
				eventObject: new Event('updateActiveTab'),
				eventTarget: this.updateNotifyingElem
			};
	}

	addListening (eventName, callback) {
         this.events[eventName].eventTarget
             .addEventListener(eventName, callback);
	}

	//external API

	setTabNames (tabNamesArray) {
        this.tabNames = tabNamesArray;
	}

	getActiveTabName () {
		return this.tabs[this.state.activeTabNum].dataset.tabName;
	}

	setActiveTab (num) {
		this.activeTabNum = num;
	}

	//
}

