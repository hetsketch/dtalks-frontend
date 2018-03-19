<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="comment.author.avatar.thumbnail" class="is-rounded" alt="">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.author.full_name }}</strong>
          <small>@{{ comment.author.username }}</small>
          <br>
          {{ comment.text }}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item reply is-grey hover-black"
             @click="showReplyForm = !showReplyForm">
            {{ showReplyForm ? 'Скрыть' : 'Ответить' }}
          </a>
        </div>
      </nav>
      <!--todo: add proper `commentableId` when backend will be ready-->
      <d-comment-form :commentableId="5" v-if="showReplyForm"></d-comment-form>
    </div>
    <div class="media-right">
      <small>{{ moment(comment.created_at).calendar() }}</small>
    </div>
  </article>
</template>

<script>
  import CommentForm from './CommentForm';

  export default {
    data() {
      return {
        showReplyForm: false
      }
    },
    props: ['comment'],
    components: {
      'd-comment-form': CommentForm
    }
  }
</script>

<style lang="scss" scoped>
  .media-content {
    overflow: hidden;

    .content {
      margin-bottom: 0.25rem;
    }
  }

  .reply {
    font-family: $navbar-font-family;
    font-size: 0.875rem;
    text-decoration: underline;
    text-decoration-style: dashed;
  }
</style>
