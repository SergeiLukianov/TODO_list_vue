import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import { mockModules } from '../../../../constants/test-helpers'
import ItemsModule from '../../../../store/modules/items'
import ItemsList from '../items-list'

describe('ItemsList', () => {

  let wrapper;
  let store;
  let mockedModules;

  const renderWrapper = function() {
    mockedModules = mockModules({ ItemsModule })
    store = new Vuex.Store({
      modules: mockedModules,
    })

    let localVue = createLocalVue()

    wrapper = shallowMount(ItemsList, {
      localVue,
      store,
      propsData: {
        items: [{
          id: 1,
          text: 'any text',
        }],
        listName: 'open items',
        sortOptions: ['text asc'],
        sortOption: 'text asc'
      }
    })

  }

  beforeEach(() => {
    renderWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should emit when sort option changed', () => {
    let newSortOption = 'new sort option'

    wrapper.vm.onSortChange({
      target: {
        value: newSortOption
      }
    })

    expect(wrapper.emitted().sortChanged).toEqual([[newSortOption]])
  });

  it('should request items removal when clear list button clicked', () => {
    wrapper.vm.clearList()

    expect(mockedModules.ItemsModule.actions.removeItems.mock.calls[0][1]).toEqual([1])
  });
});

