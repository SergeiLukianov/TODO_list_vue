import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import CreateItem from '../create-item'
import { resetModules, getGetterTypes } from '../../../../constants/test-helpers'
import ItemsModule from '../../../../store/modules/items'
import TestItems from './test-data/items.json'




describe('CreateItem', () => {
  let wrapper;
  let store;
  let getterTypes = getGetterTypes({ ItemsModule })

  const renderWrapper = () => {
    ItemsModule.state.items = [];

    store = new Vuex.Store({
      modules: resetModules({ ItemsModule }),
    })

    let localVue = createLocalVue();
    wrapper = mount(CreateItem, {
      localVue,
      store,
    })
  }

  beforeEach(() => {
    renderWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should not create item if text is empty', () => {
    expect(store.getters[getterTypes.openItems].length).toBe(0);

    wrapper.vm.createItem()
    expect(store.getters[getterTypes.openItems].length).toBe(0);
  });

  it('should create item and reset value if text is not empty', () => {
    expect(store.getters[getterTypes.openItems].length).toBe(0);

    const value = 'some value'
    wrapper.vm.value = value
    wrapper.vm.createItem()

    expect(store.getters[getterTypes.openItems].length).toBe(1);
    expect(wrapper.vm.value).toBe('')
  });

});
