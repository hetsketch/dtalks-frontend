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
                 v-validate="'max:2000'"
                 maxlength="2000"
                 placeholder="Напишите комментарий и нажмите ⌘ + Enter, чтобы отправить"
                 @keydown.enter.native="addCommentByShortcut"
                 @blur="errors.clear()">
        </b-input>
      </b-field>
      <a @click="addComment"
         class="button is-info send-button"
         :class="isLoading ? 'is-loading' : ''"
         :disabled="$_.isEmpty(comment.text)">
        Отправить
      </a>
    </div>
  </article>
</template>

<script>
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
        if(this.comment.text.length > 0) {
          this.isLoading = true;
          this.$http.post(`/${this.commentable}/${this.commentableId}/comments`, this.comment, { headers: this.authHeaders })
            .then(response => {
              this.$emit('commentCreated');
              this.isLoading = false;
              this.comment.text = '';
              console.log('comment created');
            })
            .catch(response => {
              this.isLoading = false;
              console.log('error!');
            });
        }
      },
      addCommentByShortcut(event) {
        if(this.userOS === 'MacOS') {
          if(event.metaKey) {
            this.addComment();
          }
        } else {
          if(event.ctrlKey) {
            this.addComment();
          }
        }
      }
    },
    computed: {
      ...mapGetters(['authHeaders', 'userOS'])
    },
    props: ['commentableId', 'commentable']
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
