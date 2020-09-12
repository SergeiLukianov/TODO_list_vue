const itemsString = localStorage.getItem('items');

const items = itemsString ? JSON.parse(itemsString) : [];

const openItemsSortOption = localStorage.getItem('openItemsSortOption') || 'recordsAsc';
const doneItemsSortOption = localStorage.getItem('doneItemsSortOption') || 'recordsAsc';

const state = {
  items,
  openItemsSortOption: openItemsSortOption,
  doneItemsSortOption: doneItemsSortOption,
}

export default state
