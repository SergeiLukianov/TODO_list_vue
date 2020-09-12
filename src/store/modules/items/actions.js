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

}

export default actions
