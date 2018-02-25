<template>
  <section class="discussion-board">
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <d-topic-list></d-topic-list>
        </div>
        <div class="column">
          <d-comment-list></d-comment-list>
        </div>
        <div class="column">
          <d-events-list></d-events-list>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import TopicList from './TopicList'
  import CommentList from './CommentList'
  import EventsList from './EventsList'

  export default {
    components: {
      'd-topic-list': TopicList,
      'd-comment-list': CommentList,
      'd-events-list': EventsList,
    }
  }
</script>

<style scoped>
  .discussion-board {
    margin-top: 20px;
  }
</style>
