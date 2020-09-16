<template>
  <select @change="onChange">
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      :selected="isSelectedOption(option)"
    >
      {{ getName(option) }}
    </option>
  </select>
</template>

<script>
import SORT_NAMES from '../../constants/sorting/sort-options-names';


export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },

    selectedOption: {
      type: String,
      default: null,
    }
  },

  methods: {
    onChange (e) {
      this.$emit('change', e)
    },

    isSelectedOption(option) {
      return this.selectedOption === option;
    },

    getName(option) {
      return SORT_NAMES[option];
    },
  }
}
</script>
