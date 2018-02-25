<template>
  <article class="new-comment media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img class="is-circle" src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <b-field :type="errors.has('comment_text') ? 'is-danger' : ''"
               :message="errors.has('comment_text') ? errors.first('comment_text') : ''">
        <b-input v-autosize
                 name="comment_text"
                 type="textarea"
                 v-model="comment.text"
                 v-validate.disabled="'max:2000'"
                 maxlength="2000"
                 placeholder="Написать комментарий..."
                 @blur="errors.clear()">
        </b-input>
      </b-field>
      <a @click="addComment"
         class="button is-info send-button"
         :class="isLoading ? 'is-loading' : ''">Отправить
      </a>
    </div>
  </article>
</template>

<script>
  import autosize from 'autosize';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        isLoading: false,
        comment: {
          text: ''
        }
      }
    },
    methods: {
      addComment() {
        this.isLoading = true;
        this.$http.post(`/topics/${this.commentableId}/comments`, this.comment, { headers: this.authHeaders })
          .then(response => {
            this.$emit('commentCreated');
            this.isLoading = false;
            this.comment.text = '';
            console.log('comment created');
          })
          .catch(response => {
            console.log('error!');
          });
      }
    },
    computed: {
      ...mapGetters(['authHeaders'])
    },
    directives: {
      autosize: {
        inserted(el) {
          autosize(el.getElementsByClassName('textarea')[0]);
        }
      }
    },
    props: ['commentableId']
  }
</script>

<style lang="scss" scoped>
  .media-content {
    position: relative !important;
  }

  .send-button {
    position: absolute;
    bottom: 45px;
    left: calc(100% - 122px);
  }
</style>

<style lang="scss">
  .new-comment {
    .textarea {
      padding-bottom: 60px !important;
    }
    .control {
      padding: 2px;
    }
  }
</style>
