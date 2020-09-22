import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import SearchItems from '../../search-items/search-items'
import BaseInput from '../../../base/BaseInput'
import { mockModules } from '../../../../constants/test-helpers'

import ItemsModule from '../../../../store/modules/items'


describe('SearchItems', () => {

  let wrapper;
  let mockedModules;
  let store;

  const renderWrapper = () => {
    mockedModules = mockModules({ ItemsModule })
    store = new Vuex.Store({
      modules: mockedModules,
    })

    let localVue = createLocalVue();
    localVue.component('base-input', BaseInput)

    wrapper = shallowMount(SearchItems, {
      localVue,
      store,
    });
  }

  beforeEach(() => {
    renderWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
  });


  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot()
  });

  it('emits when searching item', () => {
    expect(wrapper.vm.value).toBe('');

    const value = 'any text'
    wrapper.vm.searchItems(value)

    expect(wrapper.vm.value).toBe(value);

    expect(wrapper.emitted().searchValueChanged[0][0]).toBe(value)
  });

});
