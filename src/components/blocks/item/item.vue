<template>
  <div class="item">
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
      return this.item.status === STATUSES.DONE_STATUS;
    },

    formattedCreationDate() {
      return this.item.creationDate;
    },

    formattedDueDate() {
      return this.item.dueDate;
    },
  },

  methods: {
    ...mapActions('ItemsModule',
      {
          removeItemFromStore: 'removeItem',
          updateStatus: 'updateStatus',
      }
    ),

    removeItem() {
      this.removeItemFromStore({ id:this.item.id, doneItem: this.isItemDone})
    },

    changeDoneStatus(e) {
      this.updateStatus( { id: this.item.id, done: e.target.checked })
    }
  },
}
</script>

<style scoped>
  .item {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .remove_item_btn {
    background-color: cornflowerblue;
  }
</style>
