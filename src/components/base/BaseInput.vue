<template>
  <div>
    <input
      :class="customStyleClass"
      :placeholder="placeholder"
      :value="value"
      @keydown.enter="onEnter"
      @keydown.esc="onEsc"
      @input="onInput"/>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    placeholder: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: '',
    },

    customStyleClass: {
      type: String,
      default: '',
    }
  },

  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    },

    onEnter (event) {
      this.$emit('enter', event.target.value)
    },

    onEsc() {
      this.$emit('esc')
    },

  }
}
</script>
