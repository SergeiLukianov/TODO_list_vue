import * as types from './mutationTypes'
import { OPEN_STATUS, DONE_STATUS } from '../../../constants/itemStatuses'

const mutations = {
  [types.CREATE_ITEM] (state, text) {
    const newItem = {
      id: new Date().valueOf(),
      text,
      creationDate: new Date(),
      status: OPEN_STATUS,
      dueDate: null
    }

    state.items.push(newItem)
  },

  [types.REMOVE_ITEM] (state, { id }) {
      const index = state.items.findIndex(item => item.id === id);
      state.items.splice(index, 1);
  }
}

export default mutations
