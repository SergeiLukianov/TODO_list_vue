import * as types from './mutationTypes'
import { DONE_STATUS, OPEN_STATUS } from '../../../constants/itemStatuses'

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
  },

  [types.UPDATE_STATUS] (state, { id, done }) {
    const item = state.items.find(item => item.id === id);

    item.status = done ? DONE_STATUS : OPEN_STATUS;
    if (done) {
      item.dueDate = new Date();
    }
  }
}

export default mutations
