import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import CreateItem from '../create-item'
import BaseInput from '../../../base/BaseInput'
import BaseButton from '../../../base/BaseButton'
import { mockModules } from '../../../../constants/test-helpers'
import ItemsModule from '../../../../store/modules/items'




describe('CreateItem', () => {
  let wrapper;
  let mockedModules;
  let store;

  const renderWrapper = () => {
    mockedModules = mockModules({ ItemsModule })

    store = new Vuex.Store({
      modules: mockedModules
    })

    let localVue = createLocalVue();
    localVue.component('base-input', BaseInput)
    localVue.component('base-button', BaseButton)

    wrapper = mount(CreateItem, {
      localVue,
      children: [BaseInput, BaseButton],
      store,
    })
  }

  beforeEach(() => {
    renderWrapper()
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot()
  });

  it('should not create item if text is empty', () => {
    wrapper.vm.createItem()

    //createNewItem action not invoked
    expect(mockedModules.ItemsModule.actions.createNewItem.mock.calls).toEqual([]);
  });

  it('should create item and reset value if text is not empty', () => {
    const value = 'some value'
    wrapper.vm.value = value
    wrapper.vm.createItem()

    expect(mockedModules.ItemsModule.actions.createNewItem.mock.calls[0][1]).toBe(value);
    expect(wrapper.vm.value).toBe('')
  });
})
