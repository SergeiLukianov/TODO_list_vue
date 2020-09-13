<template>
  <div>
    <div class="items-list-wrapper">
      <items-list
        listName="Open"
        :sortOptions="openListSortOptions"
        :sortOption="openItemsSortOption"
        :items="openItemsList"
        @sortChanged="setOpenListSort"
      />
    </div>

    <div class="items-list-wrapper">
      <items-list
        listName="Done"
        :sortOptions="doneListSortOptions"
        :sortOption="doneItemsSortOption"
        :items="doneItemsList"
        @sortChanged="setDoneListSort"
      />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ItemsList from '../items-list/items-list'
import * as SORT_OPTIONS from '../../../constants/sorting/sort-options'
import SORT_FUNCTIONS from '../../../constants/sorting/sort-functions'


export default {
  components: {
    ItemsList
  },

  props: {
    filterContent: {
      type: String,
      default: '',
    }
  },

  computed: {
    ...mapGetters('ItemsModule', [
      'openItemsSortOption',
      'doneItemsSortOption',
    ]),

    ...mapGetters('ItemsModule', {
      storedOpenItems: 'openItems',
      storedDoneItems: 'doneItems',
    }),

    openItemsList() {
      const filteredItems =  Boolean(this.filterContent)
        ? this.storedOpenItems.filter(item => item.text.toLowerCase().includes(this.filterContent.toLowerCase()))
        : this.storedOpenItems;

      return filteredItems.sort(SORT_FUNCTIONS[this.openItemsSortOption]);
    },

    doneItemsList() {
      const filteredItems = Boolean(this.filterContent)
        ? this.storedDoneItems.filter(item => item.text.toLowerCase().includes(this.filterContent.toLowerCase()))
        : this.storedDoneItems;

      return filteredItems.sort(SORT_FUNCTIONS[this.doneItemsSortOption]);
    },

    openListSortOptions() {
      return [
        SORT_OPTIONS.RECORDS_ASC,
        SORT_OPTIONS.RECORDS_DESC,
        SORT_OPTIONS.CREATION_DATE_ASC,
        SORT_OPTIONS.CREATION_DATE_DESC
      ];
    },

    doneListSortOptions() {
      return Object.values(SORT_OPTIONS);
    },

  },

  methods: {
    ...mapActions('ItemsModule', [
      'setOpenListSort',
      'setDoneListSort',
    ]),
  },

}
</script>

<style scoped>
  .items-list-wrapper {
    margin: 20px;
  }
</style>
