class Map {

	constructor (wrapper, relPath, mapId, coords) {
		this.coords = coords;
		this.mapId = mapId;
		this.tabName = 'map';
		this.path = document.URL + relPath;
		this.wrapper = wrapper;
		this.loadStyles();
		this.state = {
			zoom: 12
		}
		this.loadLeafletMap();
	}

	display (activeTabName) {
		if(activeTabName != this.tabName)
			this.wrapper.classList.add('hidden');
		else
			this.wrapper.classList.remove('hidden');
	}

	loadLeafletMap () {
		this.wrapper.innerHTML = '';
		this.wrapper.id = this.mapId;
	
		this.map = L.map(this.wrapper.id).setView(this.coords, this.state.zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoicG9sZXNodWswNyIsImEiOiJjanY3NjljNHcwMmx1M3ludGpkMmtnbXF6In0.jhVqFN6-rmp2o9lWnnCYXA'
		}).addTo(this.map);
    }

	loadStyles () {
		const styles = document.createElement('link');
		styles.href = this.path + '/css/style.css';
		styles.rel = 'stylesheet';
		document.head.appendChild(styles);

	}
}

