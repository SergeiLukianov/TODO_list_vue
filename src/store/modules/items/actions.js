import * as types from './mutationTypes'

const actions = {
  createNewItem({ commit, dispatch }, text) {
    commit(types.CREATE_ITEM, text);

    dispatch('updateItemsLocalStorage')
  },

  updateItemsLocalStorage({ state }) {
    localStorage.setItem('items', JSON.stringify(state.items))
  },

  removeItem({ commit, dispatch }, data) {
    commit(types.REMOVE_ITEM, data);

    dispatch('updateItemsLocalStorage')
  },

  updateStatus({ commit, dispatch }, data) {
    commit(types.UPDATE_STATUS, data);

    dispatch('updateItemsLocalStorage')
  },

  setOpenListSort({ commit }, value) {
    commit(types.STORE_OPEN_LIST_SORT, value)

    localStorage.setItem('openItemsSortOption', value)
  },

  setDoneListSort({ commit }, value) {
    commit(types.STORE_DONE_LIST_SORT, value)

    localStorage.setItem('doneItemsSortOption', value)
  },

}

export default actions
