import Item from '../item.vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import * as STATUSES from '../../../../constants/itemStatuses'

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

const renderWrapper = (component, options = {}) => {
  if (!Boolean(options.localVue)) {
    options.localVue = createLocalVue()
  }

  return shallowMount(Item, {
    ...options,
  })
}

describe('Item', () => {

  it('renders open item', () => {
    const options = {
      propsData: {
        item: openItem,
      },
      data () {
        return {
          active: false,
          editMode: false,
        }
      },
    }
    expect(renderWrapper(Item, options).html()).toMatchSnapshot()
  });

  it('renders done item', () => {
    const options = {
      propsData: {
        item: doneItem,
      },
      data () {
        return {
          active: false,
          editMode: false,
        }
      },
    }
    expect(renderWrapper(Item, options).html()).toMatchSnapshot()
  });

  it('checkbox is unchecked for open item', () => {
    const options = {
      propsData: {
        item: openItem,
      }
    }
    const wrapper = renderWrapper(Item, options)

    expect(wrapper.find('.item input[type="checkbox"]').element.checked).toBe(false)
  });

  it('checkbox is checked for done item', () => {
    const options = {
      propsData: {
        item: doneItem,
      }
    }
    const wrapper = renderWrapper(Item, options)

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
    const wrapper = renderWrapper(Item, options)

    expect(wrapper.vm.formattedCreationDate).toBe('7:00:00 PM')
  });
})
