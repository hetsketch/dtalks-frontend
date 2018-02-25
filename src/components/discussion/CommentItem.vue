<template>
  <div class="box comment is-paddingless is-borderless">
    <div class="level">
      <div class="level-left">
        <figure class="image is-24x24">
          <img src="../../assets/img.jpg" alt="">
        </figure>
        <a class="author-fullname is-size-7"
           href="#">
          {{ comment.author.full_name }}
        </a>
      </div>
      <div class="level-right">
        <span class="publish-date is-size-7">
          {{ moment().startOf('hour').fromNow() }}
        </span>
      </div>
    </div>
    <a class="text is-grey">
      {{ comment.text }}
    </a>
  </div>
</template>

<script>
  export default {
    props: ['comment']
  }
</script>

<style lang="scss" scoped>
  .comment {
    margin: 11px 0 0;
    box-shadow: none;

    figure {
      img {
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
    }

    .author-fullname {
      margin-left: 10px;
      color: $grey;
    }

    .text {
      font-size: 0.8125rem;
      &:hover {
        color: #468EE5;
      }
    }

    .level {
      margin-bottom: 0;
    }
  }

  .is-grey {
    color: $grey;
  }
</style>
