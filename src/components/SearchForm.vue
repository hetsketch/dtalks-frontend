<template>
  <div>
    <b-input
      class="search-input"
      v-if="isActive"
      ref="search"
      @blur="hideSearchField"
      @keyup.native.enter="search"
      v-model="query"
      placeholder="Что ищем?"/>
    <div v-if="!isActive" @click="showSearchField">
      <b-icon icon="search" type="is-black" size="is-small"></b-icon>
      <span class="search-text">{{ label }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: '',
        isActive: false
      }
    },
    methods: {
      showSearchField() {
        this.isActive = !this.isActive;
        this.$nextTick(() => this.$refs.search.focus());
      },
      hideSearchField() {
        this.isActive = !this.isActive;
      },
      search() {
        // TODO: add search
      }
    },
    props: ['label']
  }
</script>

<style>
  .search-input {
    width: 350px;
  }

  .search-text {
    margin-left: 8px;
  }
</style>
