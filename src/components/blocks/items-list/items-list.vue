<template>
  <div class="items-list">
    <div
      v-for="item in items"
      :key="item.id">
      <item
        :item="item">
      </item>
    </div>
  </div>
</template>

<script>
import Item from '../item/item'

export default {
  components: {
    Item,
  },

  props: {
    items: {
      type: Array,
      required: true,
      default: () => ([]),
    }
  }
}
</script>

<style>
  /*.items-list {*/
  /*  border: 1px solid #e3e2e2;*/
  /*  border-radius: 5px/10px;*/
  /*}*/
</style>
