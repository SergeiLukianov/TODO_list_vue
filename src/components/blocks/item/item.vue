<template>
  <div
    class="item"
    @mouseenter="activate"
    @mouseleave="deactivate"
  >
    <input class="size-1"
           type="checkbox"
           :checked="isItemDone"
           @change="changeDoneStatus"
    >

    <div class="size-5"
         v-if="editMode"
    >
      <textarea
        v-model="newContent"
        ref="contentEditor"
        @keydown.esc="confirmEdit"
        @blur="confirmEdit"/>
    </div>
    <div class="size-5"
         v-else
         @dblclick="editItem"
    >
      {{ item.text }}
    </div>

    <div class="dates-container">
      <div class="align-end">
        {{ formattedCreationDate }}
      </div>

      <div class="align-end"
        v-if="isItemDone"
      >
        {{ formattedDueDate }}
      </div>
    </div>

    <div :class="[
      'remove_item_btn',
      {
        [$style.visibilityHidden] : !active
      }]"
         @click="removeItem"
    >
      <img
        src="../../../assets/icons/icons-bin.svg"
        alt="Remove"
      />
    </div>
  </div>
</template>

<script>
import * as STATUSES from '../../../constants/itemStatuses'
import {mapActions} from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      active: false,
      editMode: false,
      newContent: this.item.text,
    }
  },

  computed: {
    isItemDone () {
      return this.item.status === STATUSES.DONE_STATUS
    },

    formattedCreationDate () {
      const date = new Date(this.item.id)
      return date.toLocaleTimeString('en-US')
    },

    formattedDueDate () {
      const date = new Date(this.item.dueDate)
      return date.toLocaleTimeString('en-US')
    },
  },

  methods: {
    ...mapActions('ItemsModule',
      {
        removeItemFromStore: 'removeItem',
      }
    ),

    ...mapActions('ItemsModule', [
      'updateStatus',
      'updateText',
    ]),

    removeItem() {
      this.removeItemFromStore({ id: this.item.id, doneItem: this.isItemDone })
    },

    changeDoneStatus(e) {
      this.updateStatus({ id: this.item.id, done: e.target.checked})
    },

    activate() {
      this.active = true
    },

    deactivate() {
      this.active = false
    },

    editItem() {
      this.editMode = true
    },

    cancelEdit() {
      this.editMode = false
    },

    confirmEdit() {
      this.updateText({
        id: this.item.id,
        text: this.newContent,
      })
      this.editMode = false
    },
  },
}
</script>

<style scoped>
  .item {
    padding: 5px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid #e3e2e2;
    border-radius: 5px;
  }

  .remove_item_btn {
    border-left: 2px solid lightgray;
    margin-left: 7px;
  }

  .size-1 {
    flex-grow: 1;
  }

  .size-5 {
    flex-grow: 5;
  }

  .align-end {
    text-align: end;
  }

</style>

<style module>
  .visibilityHidden {
    visibility: hidden;
  }
</style>
