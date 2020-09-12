<template>
  <div>
    <input
      type="checkbox"
      :checked="isItemDone"
      @change="changeDoneStatus"
    >
    <div>{{item.text}}</div>
    <div class="dates-container">
      <div>{{formattedCreationDate}}</div>
      <div v-if="isItemDone">{{formattedDueDate}}</div>
    </div>
    <div class="remove_item_btn"
         @click="removeItem">sad</div>
  </div>
</template>

<script>
import * as STATUSES from '../../../constants/itemStatuses'
import { mapActions } from 'vuex'


export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    isItemDone() {
      return this.item.status === STATUSES.doneStatus;
    },

    formattedCreationDate() {
      return this.item.creationDate;
    },

    formattedDueDate() {
      return this.item.dueDate;
    },
  },

  methods: {
    ...mapActions('ItemsModule', {
      removeItemFromStore: 'removeItem'
    }),

    removeItem() {
      this.removeItemFromStore({ id:this.item.id, doneItem: this.isItemDone})
    },

    changeDoneStatus(e) {
      console.log(e.target.checked)
    }
  },
}
</script>

<style scoped>
  .remove_item_btn {
    margin: 3px;
    size: 15px;
    background-color: cornflowerblue;
  }
</style>
