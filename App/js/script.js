const tabsControlWrapper = document.querySelector('.tabs-control-wrapper');
const filterWrapper = document.querySelector('.filter-wrapper');
const itemsMapWrapper = document.querySelector('.items-map-wrapper');
const itemsListWrapper = document.querySelector('.items-list-wrapper');
const addFormWrapper = document.querySelector('.add-form-wrapper');

const tabsControlInstance = new TabsControl(tabsControlWrapper,
	'App/components/tabs-control', ['list', 'map', 'add form']);
const addFormInstance = new AddForm(addFormWrapper,
	'App/components/add-form');
const itemsMapInstance = new ItemsMap(itemsMapWrapper,
	'App/components/items-map', 'items-map', {x: 55.7522200, y: 37.6155600}, 12);
const filterInstance = new Filter(filterWrapper,
	'App/components/filter');
const itemsListInstance = new ItemsList(itemsListWrapper,
	'App/components/list');

filterInstance.addUpdateListening(() => {
	const itemsData = filterInstance.getData();
	itemsListInstance.data = itemsData;
	itemsMapInstance.data = itemsData;
})

tabsControlInstance.addUpdateListening(() => {
	const activeTabName = tabsControlInstance.getActiveTabName();
	itemsMapInstance.display(activeTabName);
	addFormInstance.display(activeTabName);
	itemsListInstance.display(activeTabName);
	filterInstance.display(activeTabName);
})
tabsControlInstance.setActiveTab(1);
