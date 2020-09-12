<template>
  <div class="items-list">
    <div class="item-element"
      v-for="item in filteredItems"
      :key="item.id">
      <item
        :item="item">
      </item>
    </div>

    <div class="align-right space-above">
      <span
        @click="clearList"
      ><u>Clear "{{ listName }}" list</u>
      </span>
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
    },

    listName: {
      type: String,
      required: false,
      default: 'List',
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
    clearList () {
      console.log('clear requested', this.items.map(item => item.id))
    },
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
</style>
