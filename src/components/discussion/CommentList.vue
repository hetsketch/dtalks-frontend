<template>
  <div class="comments">
    <h2 class="is-size-4">Люди пишут</h2>
      <d-comment-item
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id">
      </d-comment-item>
  </div>
</template>

<script>
  import CommentItem from './CommentItem'

  export default {
    data() {
      return {
        comments: [
          {
            id: 1,
            text: 'Вам бы это в статье написать а не в комментах.',
            publish_date: new Date(),
            author: {
              full_name: 'Александр Коваль'
            }
          },
          {
            id: 2,
            text: 'Вам бы это в статье написать а не в комментах.',
            publish_date: new Date(),
            author: {
              full_name: 'Александр Коваль'
            }
          },
          {
            id: 3,
            text: 'Вам бы это в статье написать а не в комментах.',
            publish_date: new Date(),
            author: {
              full_name: 'Александр Коваль'
            }
          }
        ]
      }
    },
    components: {
      'd-comment-item': CommentItem
    }
  }
</script>

<style lang="scss" scoped>
  .comments {
    font-family: 'Roboto';

    h2 {
      font-weight: 500;
    }
  }
</style>
