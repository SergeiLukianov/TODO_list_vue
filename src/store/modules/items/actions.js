import * as types from './mutationTypes'

const actions = {
  createNewItem({ commit, dispatch }, text) {
    commit(types.CREATE_ITEM, text);

    dispatch('updateOpenItemsLocalStorage')
  },

  updateOpenItemsLocalStorage({ state }) {
    localStorage.setItem('openItems', JSON.stringify(state.openItems))
  },

  removeItem({ commit, dispatch }, data) {
    commit(types.REMOVE_ITEM, data);

    if (data.doneItem) {
      dispatch('updateDoneItemsLocalStorage')
    } else {
      dispatch('updateOpenItemsLocalStorage')
    }
  },

  updateDoneItemsLocalStorage({ state }) {
    localStorage.setItem('doneItems', JSON.stringify(state.openItems))
  },
}

export default actions
