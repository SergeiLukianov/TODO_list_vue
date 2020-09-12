<template>
  <select @change="log">
    <option disabled>Select..</option>
    <option v-for="item in items" :key="item.value" :value="item.value">
      {{item.name}}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    log (e) {
      // console.log(e.target.value)
    }
  }
}
</script>

<style scoped>

</style>
