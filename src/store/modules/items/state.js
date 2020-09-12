const savedOpenItemsString = localStorage.getItem('openItems');
const savedDoneItemsString = localStorage.getItem('doneItems');

const openItems = savedOpenItemsString ? JSON.parse(savedOpenItemsString) : [];
const doneItems = savedOpenItemsString ? JSON.parse(savedDoneItemsString) : [];

const openItemsSortOption = localStorage.getItem('openItemsSortOption') || 'recordsAsc';
const doneItemsSortOption = localStorage.getItem('doneItemsSortOption') || 'recordsAsc';

const state = {
  openItems: openItems,
  doneItems: doneItems,
  openItemsSortOption: openItemsSortOption,
  doneItemsSortOption: doneItemsSortOption,
}

export default state
