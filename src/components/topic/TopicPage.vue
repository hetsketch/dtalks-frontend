<template>
  <div class="topic-page">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <d-topic></d-topic>
        </div>
        <div class="column is-4">
          <d-suggested-topics></d-suggested-topics>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SuggestedTopics from './SuggestedTopics'
  import Topic from './Topic'

  export default {
    components: {
      'd-topic': Topic,
      'd-suggested-topics': SuggestedTopics
    }
  }
</script>

<style lang="scss">
  .topic-page {
    margin-top: 30px;
  }
</style>
