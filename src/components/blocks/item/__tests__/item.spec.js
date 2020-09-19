import Vuex from 'vuex'

import Item from '../item.vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import * as STATUSES from '../../../../constants/itemStatuses'
import {mockModules} from '../../../../constants/test-helpers'

import ItemsModule from '../../../../store/modules/items'

const doneItem = {
  id: 1600433718398,
  status: STATUSES.DONE_STATUS,
  text: 'write test',
  dueDate: 1600433719398,
}

const openItem = {
  id: 1600433718398,
  status: STATUSES.OPEN_STATUS,
  text: 'write test',
}

describe('Item', () => {

  let wrapper;
  let store;
  let mockedModules;

  const renderWrapper = (options = {}) => {
    let localVue = createLocalVue()

    mockedModules = mockModules({ItemsModule})

    store = new Vuex.Store({
      modules: mockedModules,
    })

    wrapper = shallowMount(Item, {
      ...options,
      store,
      localVue,
    })
  };

  afterEach(() => {
    wrapper.destroy()
  });

  it('renders open item', () => {
    const options = {
      propsData: {
        item: openItem,
      },
    }
    renderWrapper(options)

    expect(wrapper.html()).toMatchSnapshot()
  });

  it('renders done item', () => {
    const options = {
      propsData: {
        item: doneItem,
      },
    }
    renderWrapper(options)

    expect(wrapper.html()).toMatchSnapshot()
  });

  it('checkbox is unchecked for open item', () => {
    const options = {
      propsData: {
        item: openItem,
      }
    }
    renderWrapper(options)

    expect(wrapper.find('.item input[type="checkbox"]').element.checked).toBe(false)
  });

  it('checkbox is checked for done item', () => {
    const options = {
      propsData: {
        item: doneItem,
      }
    }
    renderWrapper(options)

    expect(wrapper.find('.item input[type="checkbox"]').element.checked).toBe(true)
  });

  it('created date in correct format', () => {
    const item = {
      id: new Date(2020, 9, 18, 19, 0).valueOf()
    }

    const options = {
      propsData: {
        item: item,
      }
    }
    renderWrapper(options)

    expect(wrapper.vm.formattedCreationDate).toBe('7:00:00 PM')
  });

  it('should remove item on click remove item icon', () => {
    const options = {
      propsData: {
        item: openItem,
      },
    }
    renderWrapper(options)

    wrapper.vm.removeItem()

    expect(mockedModules.ItemsModule.actions.removeItem.mock.calls[0][1]).toEqual({id: 1600433718398})
  });

  it('should change status on checking checkbox', () => {
    const options = {
      propsData: {
        item: openItem,
      },
    }
    renderWrapper(options)

    let initialCheckboxState = wrapper.find('input[type="checkbox"]').element.checked
    wrapper.vm.changeDoneStatus({
      target: {
        checked: !initialCheckboxState,
      }
    })

    expect(mockedModules.ItemsModule.actions.updateStatus.mock.calls[0][1])
      .toEqual({
        id: openItem.id,
        done: !initialCheckboxState,
      })
  });

  it('should save changes after changes confirmed', () => {
    const options = {
      propsData: {
        item: openItem,
      },
    }
    renderWrapper(options)

    wrapper.vm.editItem()
    expect(wrapper.vm.editMode).toBe(true)

    wrapper.vm.confirmEdit()
    expect(mockedModules.ItemsModule.actions.updateText.mock.calls[0][1])
      .toEqual({
        id: 1600433718398,
        text: "write test",
      })

    //closes edit mode after edit confirmation
    expect(wrapper.vm.editMode).toBe(false)
  });
})
