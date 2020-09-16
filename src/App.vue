<template>
  <div id="app">

    <search-items
      @searchValueChanged="updateSearchValue"/>

    <create-item/>

    <items-container
      :filterContent="searchValue"/>

  </div>
</template>

<script>
import SearchItems from './components/blocks/search-items/search-items.vue'
import CreateItem from './components/blocks/create-item/create-item.vue'
import ItemsContainer from './components/blocks/items-container/items-container.vue'

export default {

  components: {
    SearchItems,
    CreateItem,
    ItemsContainer,
  },

  data() {
    return {
      searchValue: '',
    }
  },

  methods: {
    updateSearchValue(value) {
      this.searchValue = value.trim();
    }
  }
}
</script>
