<template>
  <div>
    <button
      :class="customStyleClass"
      @click="onClick">{{caption}}</button>
  </div>
</template>

<script>
export default {

  props: {
    caption: {
      type: String,
      default: 'Submit'
    },

    customStyleClass: {
      type:String,
      default: '',
    },
  },

  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
