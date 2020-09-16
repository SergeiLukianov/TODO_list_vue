<template>
  <div class="footer-container">
    <div class="block">Todo List</div>
    <div class="input block">
      <base-input
        :customStyleClass="$style.searchItemInputWrapper"
        placeholder="Search..."
        :value="value"
        @input="searchItems"
        @esc="searchItems('')"
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
      this.$emit('searchValueChanged', this.value);
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

    margin-bottom: 50px;
  }

  .input {
    margin-left: 150px;
  }


  div.block {
    display: flex;
    margin: 10px;
  }

</style>

<style module>

  .searchItemInputWrapper {
    width: 250px;
  }

  input.searchItemInputWrapper {
    border: none;
    border-bottom: 1px solid #ffffff;
    background-color: transparent;
    outline: none;

    width: 100%;
  }

  input.searchItemInputWrapper::placeholder {
    color: #ffffff;
  }
</style>
