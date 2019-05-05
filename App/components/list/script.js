class ItemsList extends Base {
	constructor (wrapper, relPath, tabsControl, filter) {

        super(wrapper, tabsControl);

		this.tabName = 'list';
		this.itemHeight = 30;
		this.scrollScale = 1;
		this.filter = filter;
		this.pageSize = Math.floor(parseFloat
			(getComputedStyle(this.wrapper).height) / 
			this.itemHeight);

		this.state = {
			visibility: true,
			start: true,
			data: [],
			scroll: 0,
			loadedItemsNum: 0,
			selectedItem: null,
			prevSelectedItem: null
		}
		
		this.init();
	}

	set selectedItem (itemElem) {
		if(itemElem)
			if(itemElem.tagName != 'LI')
				return;
		this.state.selectedItem = itemElem;
		this.renderSelectedItem();
	}

	set data (value) {
		this.state.data = value;
		this.state.start = true;
		this.renderLoadedItems();
		this.scroll = 0;
		this.selectedItem = null;
 	}

	set scroll (value) {
		value = Math.min(value, this.state.data.length - 
			this.pageSize);
		value = Math.max(value, 0);
		value = Math.round(value);
		this.state.scroll = value;
		this.renderScrollOffset();
		this.renderLoadedItems();
	}

	init () {
		this.build();
		this.addHandlers();
		if(this.filter.getData())
			this.data = this.filter.getData();
		this.tabsControl.addListening('updateActiveTab', () => {
			this.setVisibility(this.tabsControl.getActiveTabName());
		});
		this.filter.addListening('updateData', () => {
			this.setData(this.filter.getData());
		})
	}

	//static part of component

	build () {
		this.listVisible = document.createElement('div');
		this.listVisible.style.height = '100%';
		this.listVisible.style.overflow = 'hidden';
		this.listAll = document.createElement('ul');
		this.listVisible.classList.add('items-list');
		this.listVisible.appendChild(this.listAll);
		this.wrapper.innerHTML = '';
		this.wrapper.appendChild(this.listVisible);
	}

    //

    //dynamic part of component
    
	renderSelectedItem () {

    	const prevActive = this.listVisible
		    .querySelector('.items-list__item--active');
		const curActive = this.state.selectedItem;
		if(prevActive)
		{
		    prevActive.classList
		        .remove('items-list__item--active');
		    if(curActive)
		    	if(curActive.dataset.index == prevActive.dataset.index)
	    		{
	    			return;
	    		}
		}
        
		if(curActive)
		    curActive.classList.add('items-list__item--active');
    }

	renderLoadedItems () {
		if(this.state.start)
		{
			const needToLoadNum = Math.min(
				this.state.data.length,
				this.pageSize);
			this.appendItems(needToLoadNum);
			this.state.start = false;
		}
		else
		{
			const needToLoadNum = this.state.scroll + 
			this.pageSize - this.state.loadedItemsNum;
			this.appendItems(needToLoadNum);           
		}
	}

	appendItems (howMany) {
		if(howMany <= 0)
			return;
		howMany = Math.min(
			this.state.data.length - this.state.loadedItemsNum,
			howMany);
		const startInd = this.state.loadedItemsNum;
		for(let i = startInd; i < startInd + howMany; i ++)
			this.appendItem(i);
		this.state.loadedItemsNum += howMany;
	}

	appendItem (num) {
		const item = document.createElement('li');
		item.dataset.index = num;
		item.classList.add('items-list__item');
		item.style.height = this.itemHeight + 'px';
		item.innerHTML = this.state.data[num].x + ' - ' +
		this.state.data[num].y;
		this.listAll.appendChild(item);
	}


	renderScrollOffset () {
		const offset = - this.state.scroll * this.itemHeight;
		this.listAll.style.transform = 
		'translateY(' + offset + 'px)';
	}

	//
	
	//handlers 

	addHandlers () {
        this.addScrollHandler();
        this.addClickHandler();
	}

	addScrollHandler () {
		const disableWheel = (e) => {
			e.preventDefault();
		}

		this.listVisible.onmouseenter = () => {
			this.listVisible.onwheel = (e) => {
				this.scroll = this.state.scroll +
				this.scrollScale * Math.sign(e.deltaY);
			}

			document.addEventListener('wheel', 
				disableWheel, {passive: false});

			this.listVisible.onmouseleave = () => {
				document.removeEventListener('wheel', disableWheel);
			}
		}
	}

	addClickHandler () {
		this.listVisible.onclick =  (e) => {
			this.selectedItem = e.target;
	    }
    }

	//

	// external API

	setData (data) {
		this.data = data;
	}
    
   //

}
