//depends on Map
class AddingBoxMap extends Map {

	constructor (wrapper, mapId, coords, zoomValue) {
		super(wrapper, mapId, coords, zoomValue);

		this.state = {
			marker: null
		}

		this.init();
	}

	set marker (value) {
		this.state.marker = value;
		let x = (this.state.marker) ? 
		this.state.marker._latlng.lat.toFixed(4) : '';

		let y = (this.state.marker) ? 
		this.state.marker._latlng.lng.toFixed(4) : '';
		
		this.infoBoxX.textContent = 'X: ' + x;
		this.infoBoxY.textContent = 'Y: ' + y;
	}

	init () {
 		this.buildInfoBox();
        this.addHandlers();		
	}

	buildInfoBox () {
		this.infoBox = document.createElement('div');
		this.infoBox.classList.add('map__infobox');
		this.wrapper.appendChild(this.infoBox);

		this.infoBoxX = document.createElement('div');
		this.infoBoxX.classList.add('map__infobox-x');
		this.infoBox.appendChild(this.infoBoxX);
		this.infoBoxX.textContent = 'X: - -';

		this.infoBoxY = document.createElement('div');
		this.infoBoxY.classList.add('map__infobox-y');
		this.infoBox.appendChild(this.infoBoxY);
		this.infoBoxY.textContent = 'Y: - -';

		this.wrapper.style.position = 'relative';
	}

	//handlers

	addHandlers () {
		this.map.addEventListener('click', (e) => {
			this.addMarker(e.latlng.lat, e.latlng.lng)
		});
	}

	addMarker (x, y) {
		if(this.state.marker)
		{
			this.state.marker.remove();
		}

		this.marker = 
		L.marker([x, y]).addTo(this.map);

		const markerDelButton = document.createElement('button');
		markerDelButton.classList.add('map__marker-del');
		markerDelButton.textContent = 'Delete';
		markerDelButton.onclick = this.delMarker.bind(this);

		this.state.marker.bindPopup(markerDelButton);
	}

	delMarker () {
		this.state.marker.remove();
		this.marker = null;
	}
}

