<template>
  <div class="topic-list">
    <div class="level topic-actions">
      <div class="level-left">
        <span class="new has-text-black is-underlineable red-line" href="#">Новые</span>
        <span class="popular has-text-black is-underlineable green-line" href="#">Популярные</span>
      </div>
      <div class="level-right">
        <span class="new-topic has-text-black is-underlineable" href="#" @click="showNewTopicForm">Создать топик</span>
      </div>
    </div>

    <d-topic-item v-for="topic in topics" :topic="topic" :key="topic.id"></d-topic-item>
  </div>
</template>

<script>
  import TopicItem from './TopicItem'

  export default {
    data() {
      return {
        topics: [],
        errors: []
      }
    },
    methods: {
      showNewTopicForm() {

      },
    },
    components: {
      'd-topic-item': TopicItem
    },
    created() {
      this.$http.get('/topics').then(response => {
          this.topics = response.data.data;
        },
        response => {
          this.errors.push(response.errors);
        });
    }
  }
</script>

<style lang="scss" scoped>
  .topic-list {
    .new, .popular, .new-topic {
      font-family: $navbar-font-family;
      position: relative;
      cursor: pointer;
    }

    .popular {
      margin-left: 15px;
    }
  }
</style>
