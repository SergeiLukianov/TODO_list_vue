<template>
  <div
    class="items-list"
  >
    <div class="list-header">
      <div>{{listName}}</div>
      <div>
        <base-dropdown
          :options="sortOptions"
          :selectedOption="sortOption"
          @change="onSortChange"
        />
      </div>
    </div>

    <template
      v-for="item in filteredItems"
    >
      <item
        :key="item.id"
        :item="item">
      </item>
    </template>

    <div class="remove-btn align-right space-above">
      <a
        href="#"
        @click.prevent="clearList"
      >Clear "{{ listName }}" list</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Item from '../item/item'
import BaseDropdown from '../../base/BaseDropdown'

export default {
  components: {
    BaseDropdown,
    Item,
  },

  props: {
    items: {
      type: Array,
      required: true,
      default: () => ([]),
    },

    listName: {
      type: String,
      required: false,
      default: 'List',
    },

    sortOptions: {
      type: Array,
      default: () => ([]),
    },

    sortOption: {
      type: String,
      required: true,
    },
  },

  computed: {
    filteredItems() {
      return this.items;
    },
  },

  methods: {
    ...mapActions('ItemsModule', [
      'removeItems'
    ]),

    clearList () {
      this.removeItems(this.items.map(item => item.id));
    },

    onSortChange(e) {
      this.$emit('sortChanged', e.target.value)
    }
  },
}
</script>

<style>
  .items-list {
    border: 1px solid #e3e2e2;
    border-radius: 15px/10px;
    padding: 20px;
  }

  .align-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .space-above {
    margin-top: 30px;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

</style>

<style scoped>
  .remove-btn a {
    color: #000000;
  }
</style>
