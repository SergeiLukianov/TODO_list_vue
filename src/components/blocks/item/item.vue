<template>
  <div
    class="item"
    @mouseenter="activate"
    @mouseleave="deactivate"
  >
    <div>
      <input
        type="checkbox"
        :checked="isItemDone"
        @change="changeDoneStatus"
      >
    </div>

    <div class="itemContent"
         v-if="editMode"
    >
      <textarea
        v-model="newContent"
        ref="contentEditor"
        @keydown.esc="confirmEdit"
        @blur="confirmEdit"/>
    </div>
    <div
      class="itemContent"
      v-else
      @dblclick="editItem"
    ><span>{{ item.text }}</span>
    </div>

    <div class="dates-container">
      <div
        class="align-end center text-gray"
      >
        {{ formattedCreationDate }}
      </div>

      <div
        class="align-end center text-black"
        v-if="isItemDone"
      >
        {{ formattedDueDate }}
      </div>
    </div>

    <div
      class="remove_item_btn"
      @click="removeItem"
    >
      <img
        v-if="active"
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

  updated () {
    const contentTextArea = this.$refs.contentEditor

    if (contentTextArea) {
      contentTextArea.focus()
    }
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
      this.removeItemFromStore({ id: this.item.id })
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
    align-items: center;

    border: 1px solid #e3e2e2;
    border-radius: 5px;

    box-shadow: 2px 1px lightgray;
  }

  .remove_item_btn {
    border-left: 2px solid lightgray;
    margin-left: 7px;

    width: 30px;
    height: 100%;
  }

  .remove_item_btn img {
    padding-left: 2px;
    padding-right: 2px;
  }


  .align-end {
    text-align: end;
  }

  textarea {
    width: 100%;
    height: 150px;

    resize: none;
    outline: none;
    border-radius: 5px;
  }

  .itemContent {
    overflow-wrap: anywhere;
    width: 700px;
    height: 100%;
  }

</style>

<style>
  .text-black {
    color: black;
  }

  .text-gray {
    color: gray;
  }
</style>
