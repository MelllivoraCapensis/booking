class Map {

	constructor (wrapper, mapId, coords, zoomValue) {
		this.coords = coords;
		this.mapId = mapId;
		this.wrapper = wrapper;
		
		this.state = {
          zoom: zoomValue
		}

		this.loadLeafletMap();
	}

	loadLeafletMap () {
		this.wrapper.innerHTML = '';
		this.wrapper.id = this.mapId;
	
		this.map = L.map(this.wrapper.id).setView([this.coords.x, this.coords.y], this.state.zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoicG9sZXNodWswNyIsImEiOiJjanY3NjljNHcwMmx1M3ludGpkMmtnbXF6In0.jhVqFN6-rmp2o9lWnnCYXA'
		}).addTo(this.map).addEventListener('load', () => {
			this.fixMapBug();
		})
		
    }

    fixMapBug() {
    	const resizeEvent = new Event('resize');
		window.dispatchEvent(resizeEvent);
    }
}

