class Map {

	constructor (wrapper, relPath) {
	this.tabName = 'map';
	this.path = document.URL + relPath;
    this.wrapper = wrapper;
    this.loadStyles();
    this.loadLeaflet();
    this.state = {
    	zoom: null
    }
    }
      
    display (activeTabName) {
    	if(activeTabName != this.tabName)
         	this.wrapper.classList.add('hidden');
         else
         	this.wrapper.classList.remove('hidden');
    }
      
    loadLeaflet () {
	this.subWrapper = document.createElement('div');
	this.wrapper.innerHTML = '';
	this.wrapper.appendChild(this.subWrapper);
	this.subWrapper.id = 'map';
	this.subWrapper.style.height = '100%';
	this.subWrapper.style.width = '100%';
	this.popup = document.createElement('div');
	this.popup.classList.add('popup');
	this.popup.innerHTML = 'hello';
	this.popup.onclick = () => {
		alert('hello');
	}
   	this.map = L.map('map').setView([55.7522200, 37.6155600], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicG9sZXNodWswNyIsImEiOiJjanY3NjljNHcwMmx1M3ludGpkMmtnbXF6In0.jhVqFN6-rmp2o9lWnnCYXA'
        }).addTo(this.map);
    L.circle([51, 27], {
    	color: 'red',
    	fillColor: 'black',
    	fillOpacity: 0.2,
    	radius: 500
    }).addTo(this.map).bindPopup(this.popup);
    }

	loadStyles () {
		const styles = document.createElement('link');
		styles.href = this.path + '/css/style.css';
		styles.rel = 'stylesheet';
        document.head.appendChild(styles);
       
	}
}

