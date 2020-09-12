<template>
  <div>
    <base-input
      placeholder="New task..."
      :value="value"
      @input="updateValue"
      @enter="createItem"
      @esc="clearValue"></base-input>
    <base-button
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

<style scoped>

</style>
