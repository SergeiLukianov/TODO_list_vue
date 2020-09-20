import Vuex from 'vuex'

import Item from '../item.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { resetModules } from '../../../../constants/test-helpers'
import OriginalItemsModule from '../../../../store/modules/items'
import TestItems from './test-data/test-items.json'

describe('Item - integration', () => {
  let wrapper;
  let store;

  const renderWrapper = (options = {}) => {
    let localVue = createLocalVue()

    let ItemsModule = {...OriginalItemsModule}
    ItemsModule.state.items = TestItems

    store = new Vuex.Store({
      modules: resetModules({ ItemsModule }),
    })

    wrapper = shallowMount(Item, {
      ...options,
      store,
      localVue,
    })
  };

  beforeEach(() => {
    localStorage.setItem('items', JSON.stringify(TestItems))
  });

  afterEach(() => {
    wrapper.destroy()
    localStorage.removeItem('items')
  });

  it('local storage is updated after item removed', () => {
    let firstDoneItem = JSON.parse(localStorage.getItem('items')).filter(item => item.status === 'done')[0]
    renderWrapper({
      propsData: {
        item: firstDoneItem,
      }
    })
    let id = firstDoneItem.id

    wrapper.vm.removeItem()

    expect(JSON.parse(localStorage.getItem('items')).find(item => item.id === id)).toBe(undefined)
  });

  it('local storage is updated after item status changed by checking the box', () => {
    let firstDoneItem = JSON.parse(localStorage.getItem('items')).filter(item => item.status === 'done')[0]

    renderWrapper({
      propsData: {
        item: firstDoneItem,
      }
    })
    let id = firstDoneItem.id

    wrapper.vm.changeDoneStatus({
      target: {
        checked: false,
      }
    })
    expect(JSON.parse(localStorage.getItem('items')).find(item => item.id === id).status).toBe('open')
  });

  it('local storage is updated after item text updated', () => {
    const item = JSON.parse(localStorage.getItem('items')).find(item => item.text === 'one')

    renderWrapper({
      propsData: {
        item: item,
      }
    })
    const id = item.id
    const updatedText = 'one updated'

    wrapper.vm.editItem()

    wrapper.vm.newContent = updatedText
    wrapper.vm.confirmEdit()

    expect(JSON.parse(localStorage.getItem('items')).find(item => item.id === id).text).toBe(updatedText)
  });
});
