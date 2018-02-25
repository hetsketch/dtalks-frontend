<template>
  <div class="suggested-topics">
    <h3 class="d-heading is-medium has-text-black">Похожие темы</h3>
    <p>{{$route.params.id}}</p>
    <ul>
      <li
        v-for="topic in suggested_topics"
        :key="topic.id">
        <p>{{ topic.id }}</p>
        <router-link
          :to="{ name: 'showTopic', params: {id: topic.id}}"
          class="suggested-topic is-medium is-size-7">
          {{ topic.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        suggested_topics: []
      }
    },
    methods: {
      fetchSuggestedTopics() {
        this.$http.get('/topics/' + this.$route.params.id + '/suggestions')
          .then(response => {
            this.suggested_topics = response.data.data;
          })
          .catch(response => {
            console.log('error');
          });
      }
    },
    created() {
      //TODO: fetch suggested topics
      // this.fetchSuggestedTopics();
    }
  }
</script>

<style lang="scss" scoped>
  $red: #D0021B;

  .suggested-topics {
    padding: 20px;
    border: 10px solid $light-grey;
  }

  .suggested-topic {
    display: block;
    margin-top: 8px;
    font-family: $roboto;
    &:hover {
      color: $red;
    }
  }

  .d-heading {
    margin-top: -5px;
    font-family: $roboto;
    font-size: 1.1875rem;
  }
</style>
