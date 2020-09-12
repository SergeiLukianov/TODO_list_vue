<template>
  <div class="footer-container">
    <span class="block">Todo List</span>
    <div class="input block">
      <base-input
        placeholder="Search..."
        :value="value"
        @input="searchItems"
        @esc="clearValue"
      />

      <img
        src="../../../assets/icons/icons-search.svg"
        alt="Search"
      />
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      value: '',
    }
  },

  methods: {
    searchItems (val) {
      this.value = val;
      this.$emit('searchValueChanged', val);
    },

    clearValue() {
      console.log(this.value)
      this.value = '';
    },

  }
}
</script>

<style scoped>
.footer-container {
  display: flex;
  align-content: center;
  justify-content: flex-end;
  background-color: #2581e3;
}

.input {
  margin-left: 150px;
}


div.block {
  display: flex;
  margin: 10px;
}

</style>
