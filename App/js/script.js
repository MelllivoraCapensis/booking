class App {
	constructor (activeTab) {
		this.init(activeTab);
	}

	init (activeTab) {
		this.importTabsControl();
		this.importFilter();
		this.importItemsList();
		this.importItemsMap();
		this.importAddingBox();
        this.setup(activeTab);
	}

	setup (activeTab) {
        this.tabsControl.setActiveTab(2);
	}

	importTabsControl () {
		const tabsControlWrapper = 
		document.querySelector('.tabs-control-wrapper');
		this.tabsControl = 
		new TabsControl(tabsControlWrapper, 
			'App/components/tabs-control', 
			['list', 'map', 'adding box'], 0);
	}

	importFilter () {
		const filterWrapper = 
		document.querySelector('.filter-wrapper');
		this.filter = new Filter(filterWrapper,
			'App/components/filter');
	}

	importItemsList () {
		const itemsListWrapper = 
		document.querySelector('.items-list-wrapper');
		this.itemsList = new ItemsList(itemsListWrapper,
			'App/components/list', this.tabsControl, this.filter);
	}

	importAddingBox () {
		const addingBoxWrapper =
		document.querySelector('.adding-box-wrapper');
		this.addingBox = new AddingBox(addingBoxWrapper,
			'App/components/adding-box', 
			{x: 55.7522200, y: 37.6155600}, 12, this.tabsControl);
	}

	importItemsMap () {
		const itemsMapWrapper =
		document.querySelector('.items-map-wrapper');
		this.itemsMap = new ItemsMap(itemsMapWrapper,
			'App/components/items-map', 
			{x: 55.7522200, y: 37.6155600}, 12, this.tabsControl, 
			this.filter);
	}

	
}

new App(0);
