<template>
  <div>
    <div class="items-list-wrapper">
      <items-list
        :items="openItems"/>
    </div>

    <div class="items-list-wrapper">
<!--      <items-list-->
<!--        :items="doneItems"/>-->
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

</style>
