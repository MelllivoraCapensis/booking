const tabsControlWrapper = document.querySelector('.tabs-control-wrapper');
const filterWrapper = document.querySelector('.filter-wrapper');
const mapWrapper = document.querySelector('.map-wrapper');
const itemsListWrapper = document.querySelector('.items-list-wrapper');
const addFormWrapper = document.querySelector('.add-form-wrapper');

const tabsControlInstance = new TabsControl(tabsControlWrapper,
	'App/components/tabs-control', ['list', 'map', 'add form']);
const addFormInstance = new AddForm(addFormWrapper,
	'App/components/add-form');
const mapInstance = new Map(mapWrapper,
	'App/components/map');
const filterInstance = new Filter(filterWrapper,
	'App/components/filter');
const itemsListInstance = new ItemsList(itemsListWrapper,
	'App/components/list');

filterInstance.addUpdateListening(() => {
	itemsListInstance.data = filterInstance.getData();
})

tabsControlInstance.addUpdateListening(() => {
	const activeTabName = tabsControlInstance.getActiveTabName();
	mapInstance.display(activeTabName);
	addFormInstance.display(activeTabName);
	itemsListInstance.display(activeTabName);
})
tabsControlInstance.setActiveTab(0);
