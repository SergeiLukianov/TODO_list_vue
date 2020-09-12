<template>
  <div>
    <button @click="onClick">{{caption}}</button>
  </div>
</template>

<script>
export default {
  // inheritAttrs: false,

  props: {
    caption: {
      type: String,
      default: 'Submit'
    }
  },

  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
