class ItemsMap extends Map {

	constructor (wrapper, mapId, coords, zoomValue, tabsControl, filter) {

		super(wrapper, mapId, coords, zoomValue);

        this.tabName = 'map';
		this.minZoom = 8;
		this.maxZoom = 18;
		this.defaultZoom = zoomValue;
		this.defaultCoords = coords;
		this.filter = filter;
		this.maxVisibleMarkers = 100;
		this.tabsControl = tabsControl;

		this.state = {
			visibility: true,
			data: null,
			markers: [],
			zoom: zoomValue
		}
		this.init();
	}

	get visibleItems () {
		if(!this.state.data)
			return [];
		const items = this.state.data.filter((item) => {
			return this.isItemVisible(item);
		})
		if(this.maxZoom != this.state.zoom)
	        var len = Math.min(items.length, this.maxVisibleMarkers);
	    else
	        var len = items.length;	
		return items.slice(0, len);
	}

	isItemVisible (item) {
		const mapSize = this.map.getSize();
		const coords = {
			x: this.map.latLngToContainerPoint([item.x, item.y]).x,
			y: this.map.latLngToContainerPoint([item.x, item.y]).y            
		}
		if(coords.x < 0 || coords.y < 0 ||
			coords.x > mapSize.x || coords.y > mapSize.y)
			return false;
		return true;
	}

	set visibility (value) {
		this.state.visibility = value;
		this.renderVisibility();
		this.fixMapBug();
	}

	set data (value) {
		this.state.data = value;
		this.map.setView(
			L.latLng(this.defaultCoords.x, this.defaultCoords.y),
			this.defaultZoom);
		this.render();
	}

	set zoom (value) {
		this.state.zoom = value;
		this.render();
	}

	init () {
		this.tabsControl.addListening('updateActiveTab', () => {
			this.setVisibility(this.tabsControl.getActiveTabName());
		})

		this.filter.addListening('updateData', () => {
			this.setData(this.filter.getData());
		})

		this.addHandlers();
	}

	addHandlers () {
		this.map.addEventListener('zoom', () => {
			this.zoom = this.map.getZoom();
		})
		this.map.addEventListener('move', () => {
			this.render();
		})
		this.map.addEventListener('resize', () => {
			this.render();
		})
	}
  
    validNum (val, minVal, maxVal) {
       val = Math.min(val, maxVal);
       val = Math.max(val, minVal);
       return val;
    }
   
    render () {
    	 if(this.state.markers.length != 0)
    	 {
    	 	this.state.markers.forEach((marker) => {
    	 		marker.remove();
    	 	});
    	 	this.state.markers = [];
    	 }

    	 this.visibleItems.forEach((item) => {
            const marker = L.marker([item.x, item.y])
	        .addTo(this.map);
            this.state.markers.push(marker);
    	 	})
       }

    renderVisibility () {
		if(!this.state.visibility)
		    this.wrapper.classList.add('hidden');
		else
			this.wrapper.classList.remove('hidden');
	}

    setData (data) {
    	this.data = data;
    }

    setVisibility (activeTabName) {
		if(activeTabName != this.tabName)
			this.visibility = false;
		else
			this.visibility = true;
	}
}

