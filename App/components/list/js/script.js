class ItemsList {
	constructor (wrapper, relPath) {
		this.path = document.URL + relPath;
		this.wrapper = wrapper;
		this.itemHeight = 30;
		this.scrollScale = 1;
		this.loadStyles();
		this.loadTemplate();
		this.state = {
			start: true,
			data: [],
			scroll: 0,
			loadedItemsNum: 0,
		}
		this.pageSize = Math.floor(parseFloat
			(getComputedStyle(this.wrapper).height) / 
		  this.itemHeight);
		this.page = Math.floor(this.state.scroll / 
			this.pageSize);
		this.addScrolling();
	}

	set data (value) {
    	this.state.data = value;
    	this.state.start = true;
    	this.state.scroll = 0;
    	this.render();
    }

	set scroll (value) {
		this.state.scroll = Math.round(
			Math.min(
			  Math.max(0, value),
			  this.state.data.length - this.pageSize)
			);
		this.render();
	}

    render() {
		this.loadItems();
		this.moveList();
	}

    moveList() {
    	const step = - this.state.scroll * this.itemHeight;
    	this.list.style.transform = 
    	  'translateY(' + step + 'px)';
    }

	addScrolling () {
		const disableWheel = (e) => {
			e.preventDefault();
		}

		this.addWrapper.onmouseenter = () => {
			this.addWrapper.onwheel = (e) => {
              this.scroll = this.state.scroll +
                this.scrollScale * Math.sign(e.deltaY);
			}

			document.addEventListener('wheel', 
				disableWheel, {passive: false});

			this.addWrapper.onmouseleave = () => {
				document.removeEventListener('wheel', disableWheel);
			}
		}

	}
    
    loadItems () {
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
		item.classList.add('items-list__item');
		item.style.height = this.itemHeight + 'px';
		item.innerHTML = this.state.data[num];
		this.list.appendChild(item);
	}

	loadTemplate () {
        this.addWrapper = document.createElement('div');
        this.addWrapper.style.height = '100%';
        this.addWrapper.style.overflow = 'hidden';
     	this.list = document.createElement('ul');
		this.list.classList.add('items-list');
		this.addWrapper.appendChild(this.list);
		this.wrapper.innerHTML = '';
		this.wrapper.appendChild(this.addWrapper);
	}

	loadStyles () {
		const styles = document.createElement('link');
		styles.href = this.path + '/css/style.css';
		styles.rel = 'stylesheet';
		document.head.appendChild(styles);
	}
}

const itemsListExemplar = new ItemsList(document.querySelector('.items-list-wrapper'),
	'App/components/list');

filterExemplar.addUpdateListening(() => {
	itemsListExemplar.data = filterExemplar.getData();
})
