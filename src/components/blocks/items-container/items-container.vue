<template>
  <div>
    <div class="items-list-wrapper">
      <items-list
        :sortOption="openItemsSortOption"
        listName="Open"
        :items="filteredOpenItems"/>
    </div>

    <div class="items-list-wrapper">
      <items-list
        :sortOption="doneItemsSortOption"
        listName="Done"
        :items="filteredDoneItems"/>
    </div>

  </div>
</template>

<script>
import ItemsList from '../items-list/items-list'
import {mapGetters} from 'vuex'

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

    filteredOpenItems() {
      return Boolean(this.filterContent)
        ? this.storedOpenItems.filter(item => item.text.toLowerCase().includes(this.filterContent.toLowerCase()))
        : this.storedOpenItems;
    },

    filteredDoneItems() {
      return Boolean(this.filterContent)
        ? this.storedDoneItems.filter(item => item.text.toLowerCase().includes(this.filterContent.toLowerCase()))
        : this.storedDoneItems;
    },
  }

}
</script>

<style scoped>
  .items-list-wrapper {
    margin: 20px;
  }
</style>
