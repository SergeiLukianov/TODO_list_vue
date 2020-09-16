<template>
  <div :class="$style.createItem">
    <base-input
      :class="$style.customInput"
      :customStyleClass="$style.customInput"
      placeholder="New task..."
      :value="value"
      @input="updateValue"
      @enter="createItem"
      @esc="clearValue"></base-input>
    <base-button
      :customStyleClass="$style.addItemButton"
      caption="ADD"
      @click="createItem"></base-button>
  </div>
</template>

<script>
import BaseInput from '../../base/BaseInput'
import BaseButton from '../../base/BaseButton'
import { mapActions } from 'vuex'

export default {
  components: {
    BaseButton,
    BaseInput
  },

  data() {
    return {
      value: '',
    }
  },

  methods: {
    ...mapActions('ItemsModule', [
      'createNewItem'
    ]),

    createItem() {
      if (Boolean(this.value)) {
        this.createNewItem(this.value);
        this.clearValue();
      }
    },

    updateValue(val) {
      this.value = val;
    },

    clearValue() {
      this.value = '';
    },
  }
}
</script>

<style module>
  .createItem {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .customInput {
    border: none;
    background-color: transparent;
    outline: none;

    width: 70%;
  }

  input.customInput {
    width: 100%;
    border-bottom: 1px solid lightgray;
  }

  .addItemButton {
    border: none;
    background-color: white;
    width: 80px;
    box-shadow: 3px 3px 7px 1px lightgray;
  }

</style>
