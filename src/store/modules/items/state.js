import * as SORTS from '../../../constants/sorting/sort-options'

const itemsString = localStorage.getItem('items');

const items = itemsString ? JSON.parse(itemsString) : [];

const openItemsSortOption = localStorage.getItem('openItemsSortOption') || SORTS.RECORDS_ASC;
const doneItemsSortOption = localStorage.getItem('doneItemsSortOption') || SORTS.RECORDS_ASC;

const state = {
  items,
  openItemsSortOption: openItemsSortOption,
  doneItemsSortOption: doneItemsSortOption,
}

export default state
