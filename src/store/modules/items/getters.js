import { OPEN_STATUS, DONE_STATUS } from '../../../constants/itemStatuses'

const getters = {
  openItems: state => state.items.filter(item => item.status === OPEN_STATUS),
  doneItems: state => state.items.filter(item => item.status === DONE_STATUS),
  openItemsSortOption: state => state.openItemsSortOption,
  doneItemsSortOption: state => state.doneItemsSortOption,
}

export default getters
