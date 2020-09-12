<template>
  <div>
    <div class="items-list-wrapper">
      <items-list
        :sortOption="openItemsSortOption"
        listName="Open"
        :items="openItems"/>
    </div>

    <div class="items-list-wrapper">
      <items-list
        :sortOption="doneItemsSortOption"
        listName="Done"
        :items="doneItems"/>
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
      'openItems',
      'doneItems',
      'openItemsSortOption',
      'doneItemsSortOption',
    ]),
  }

}
</script>

<style scoped>
  .items-list-wrapper {
    margin: 20px;
  }
</style>
