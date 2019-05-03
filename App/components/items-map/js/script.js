class ItemsMap extends Map {

	constructor (wrapper, relPath, mapId, coords, zoomValue) {
		super(wrapper, relPath, mapId, coords, zoomValue);
		this.minZoom = 8;
		this.maxZoom = 18;
		this.maxDencity = 1000;
		this.state = {
			data: null,
			markers: [],
			zoom: zoomValue
		}
		this.addZoomListening();

	}

	get visibleItemsNum () {
		let value = (this.state.zoom - this.minZoom) /
		    (this.maxZoom - this.minZoom);
	    value = Math.max(0, value);
        value = Math.pow(value, 
        	Math.floor(this.state.data.length / this.maxDencity));
		value = Math.round(value * this.state.data.length);
		
		return value;
	}

	isMarkerInWindow (marker) {
		return 
	}

	set data (value) {
		this.state.data = value;
		this.render();
	}

	set zoom (value) {
		this.state.zoom = value;
		this.render();
	}

	addZoomListening () {
		this.map.addEventListener('zoom', (e) => {
			console.log('zoom');
			this.zoom = this.map.getZoom();
		})
	}
    
    validNum (val, minVal, maxVal) {
       val = Math.min(val, maxVal);
       val = Math.max(val, minVal);
       return val;
    }

    addMarkers (numFrom, numTo) {
    	numTo = this.validNum(numTo, 0, this.state.data.length);
    	numFrom = this.validNum(numFrom, 0, numTo);

    	for(let i = numFrom; i < numTo; i ++)
    	{
    		const item = this.state.data[i];
	 		const marker = L.marker([item.x, item.y])
	           .addTo(this.map);
            this.state.markers.push(marker);
    	}
    	console.log('added ' + (numTo - numFrom));
    }

    delMarkers (num) {
    	num = Math.max(0, num);
    	num = Math.min(num, this.state.markers.length);
    	for(let i = 0; i < num ; i ++)
	 		{
	 			this.state.markers[this.state.markers.length - 1]
	 			  .remove();
	 			this.state.markers.pop();
	 		}	 	
	}

    render () {
    	 if(this.state.markers.length > this.visibleItemsNum)
    	 	this.delMarkers(this.state.markers.length - 
    	 		this.visibleItemsNum);
    	 else
    	 	this.addMarkers(this.state.markers.length,
    	 		this.visibleItemsNum);
    	console.log('all ' + this.state.markers.length,
    		'visible ' + this.visibleItemsNum);
    }
    
}

