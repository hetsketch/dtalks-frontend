<template>
  <div class="comments">
    <strong>{{ comments.length }} {{ comments.length | pluralize }}</strong>
    <hr class="line">
    <div v-for="comment in comments"
         :key="comment.id"
         class="comment">
      <d-comment-item :comment="comment"></d-comment-item>
    </div>
    <d-comment-form
      :commentableId="this.commentableId"
      :commentable="commentable"
      @commentCreated="$emit('commentCreated')">
    </d-comment-form>
  </div>
</template>

<script>
  import CommentForm from './CommentForm'
  import CommentItem from './CommentItem'
  import smartPlurals from 'smart-plurals'

  let russian = smartPlurals.Plurals.getRule('ru');
  let dict = ['комментарий', 'комментария', 'комментариев'];

  export default {
    data() {
      return {
        showReplyForm: false
      }
    },
    filters: {
      pluralize(value) {
        return russian(value, dict);
      }
    },
    methods: {},
    components: {
      'd-comment-form': CommentForm,
      'd-comment-item': CommentItem
    },
    props: ['comments', 'commentableId', 'commentable']
  }
</script>

<style lang="scss" scoped>
  .line {
    margin: 0.5rem 0 0.85rem 0;
    height: 2px;
  }

  .comment {
    margin-bottom: 1rem;
  }
</style>
