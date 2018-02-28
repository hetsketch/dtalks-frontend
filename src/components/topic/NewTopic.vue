<template>
  <section class="new-topic">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8 is-narrow">
          <h1 class="title is-2">Создать топик</h1>
          <b-field
            :type="errors.has('topic_title') ? 'is-danger' : ''"
            :message="errors.has('topic_title') ? errors.first('topic_title') : ''">
            <b-input
              v-model="topic.title"
              placeholder="Напишите тему обсуждения или задайте вопрос"
              size="is-medium"
              v-validate="'required|min:10|max:500'"
              name="topic_title">
            </b-input>
          </b-field>
          <b-field
            :type="errors.has('topic_text') ? 'is-danger' : ''"
            :message="errors.has('topic_text') ? errors.first('topic_text') : ''">
            <b-input
              v-model="topic.text"
              placeholder="Опишите подробнее, что вы хотите"
              type="textarea"
              name="topic_text"
              v-validate="'required|min:100|max:30000'"
              minlength="100"
              maxlength="10000"
              v-autosize>
            </b-input>
          </b-field>
          <b-field
            label="Тэги"
            :type="errors.has('topic_tags') ? 'is-danger' : ''"
            :message="errors.has('topic_tags') ? errors.first('topic_tags') : ''">
            <b-taginput
              v-model="topic.tag_list"
              name="topic_tags"
              :data="suggestedTags"
              placeholder="Добавьте тегов"
              maxlength="128"
              autocomplete
              maxtags="10"
              :allowNew="true"
              v-validate="'required'"
              @typing="getTagsAsync"
              :loading="isFetching"
              rounded>
            </b-taginput>
          </b-field>
          <br>
          <a class="button is-info is-pulled-right" @click="createTopic()">Создать топик</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import autosize from 'autosize';
  import _debounce from 'lodash/debounce';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        topic: {
          title: '',
          text: '',
          tag_list: []
        },
        responseErrors: [],
        suggestedTags: [],
        isFetching: false
      }
    },
    computed: {
      ...mapGetters(['authHeaders']),
    },
    directives: {
      autosize: {
        inserted(el) {
          autosize(el.getElementsByClassName('textarea')[0]);
        }
      }
    },
    methods: {
      createTopic() {
        this.$http.post('/topics', this.topic, { headers: this.authHeaders })
          .then(response => {
            console.log('topic has created');
            let topicId = response.data.data.id;
            this.$router.push({ name: 'topicPage', params: { id: topicId } });
          })
          .catch(response => {
            console.log('error')
          });
      },
      getTagsAsync: _debounce(function(text) {
        this.isFetching = true;
        this.$http.get('/tags', { params: { s: text } })
          .then(response => {
            this.isFetching = false;
            this.suggestedTags = response.data.data.tags;
          })
          .catch(response => {
            this.isFetching = false;
            console.log('error while fetching suggested tags');
          });
      }, 300)
    },
  }
</script>

<style lang="scss" scoped>
  .new-topic {
    margin-top: 20px;
  }
</style>
