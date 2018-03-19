<template>
  <section class="topic">
    <div class="box">
      <header class="topic-header">
        <div class="level">
          <div class="level-left">
            <figure class="image is-24x24">
              <img :src="user.avatar.thumbnail" class="is-circle" alt="">
            </figure>
            <router-link :to="{name: 'currentUser', params: { id: topic.author.username }}"
                         class="author-fullname is-size-6 has-text-black is-medium">{{ topic.author.full_name }}
            </router-link>
            <span class="position is-medium is-grey"
                  v-if="topic.author.position != null">, {{ topic.author.position }}</span>
          </div>
          <div class="level-right">
            <a href="#" class="comments-count is-grey">
              <b-icon icon="comments" type="is-primary" size="is-small"></b-icon>
              {{ topic.comments_count }}
            </a>
            <span class="views-count">
                    <b-icon icon="eye" type="is-primary" size="is-small"></b-icon>
                    {{ topic.views_count }}
            </span>
          </div>
        </div>
        <div class="d-tags">
          <span class="tag-icon is-size-5">#</span>
          <span v-for="tag in topic.tags" :key="tag.id" class="d-tag"><router-link to="" class="is-grey hover-black">{{ tag.title }}</router-link></span>
        </div>
        <h2 class="topic-title is-size-4">{{ topic.title }}</h2>
      </header>

      <div class="text">
        {{ topic.text }}
      </div>
      <div class="share">

      </div>
    </div>
    <d-comment-list
      :comments="topic.comments"
      :commentableId="topic.id"
      commentable="topics"
      @commentCreated="fetchComments">
    </d-comment-list>
  </section>
</template>

<script>
  import CommentList from '../comment/CommentList';
  import SuggestedTopics from './SuggestedTopics';

  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        topic: {
          comments: [],
          author: {}
        }
      }
    },
    methods: {
      fetchTopic(id) {
        this.$http.get('/topics/' + id)
          .then(response => {
            this.topic = response.data.data;
            // TODO: add tags
            this.topic.tags = [{ title: 'tag1' }, { title: 'tag1' }, { title: 'tag1' }, { title: 'tag1' }]
          })
          .catch(response => {
            console.log('error');
          });
      },
      fetchComments() {
        this.$http.get(`/topics/${this.topic.id}/comments`, { headers: this.authHeaders })
          .then(response => {
            this.topic.comments = response.data.data.comments;
          })
          .catch(response => {
            console.log('error');
          });
      }
    },
    watch: {
      '$route'(to, from) {
        this.fetchTopic(to.params.id)
      }
    }
    ,
    created() {
      this.fetchTopic(this.$route.params.id);
    }
    ,
    components: {
      'd-comment-list':
      CommentList,
    },
    computed: {
      ...mapGetters(['authHeaders'])
    }
  }
</script>

<style lang="scss" scoped>
  .topic-title {
    font-weight: 500;
    font-size: 1.6875rem;
  }

  .author-fullname {
    margin-left: 10px;
  }

  .username {
    font-size: 0.95rem;
  }

  .comments-count, .views-count {
    margin-left: 10px;
  }

  .level {
    margin: 0;
  }

  .d-tags {
    .tag-icon {
      font-family: $logo-font-family;
      font-weight: bold;
    }
    .d-tag {
      font-size: 0.875rem;
      font-family: $roboto;
      margin-left: 5px;
      text-transform: lowercase;
      &:not(:nth-child(2)) {
        margin-left: 12px;
        position: relative;
        &:before {
          content: '';
          width: 3px;
          height: 3px;
          background-color: $grey;
          border-radius: 50%;
          position: absolute;
          left: -8px;
          top: 50%;
        }
      }
    }
  }

  .text {
    margin-top: 10px;
  }
</style>
