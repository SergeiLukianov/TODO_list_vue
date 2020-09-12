import * as types from './mutationTypes'
import * as STATUSES from '../../../constants/itemStatuses'

const mutations = {
  [types.CREATE_ITEM] (state, text) {
    const newItem = {
      id: new Date().valueOf(),
      text,
      creationDate: new Date(),
      status: STATUSES.openStatus,
      dueDate: null
    }

    state.openItems.push(newItem)
  },

  [types.REMOVE_ITEM] (state, {id, doneItem}) {
    if (doneItem) {
      const index = state.doneItems.findIndex(item => item.id === id);
      state.doneItems.splice(index, 1);
    } else {
      const index = state.openItems.findIndex(item => item.id === id);
      state.openItems.splice(index, 1);
    }
  }
}

export default mutations
