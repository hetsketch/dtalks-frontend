<template>
  <div class="box topic-item is-radiusless">
    <header>
      <div class="level">
        <div class="level-left">
          <figure class="image is-24x24">
            <img src="../../assets/img.jpg" class="is-circle" alt="">
          </figure>
          <a class="author-fullname is-size-7" href="#">{{ topic.author.full_name }}</a>
        </div>
        <div class="level-right">
          <span class="publish-date is-size-7">
            {{ moment(topic.created_at).calendar() }}
          </span>
        </div>
      </div>
      <router-link :to="{ name: 'topicPage', params: {id: topic.id}}" class="title is-size-4 has-text-black">
        {{ topic.title }}
      </router-link>
    </header>
    <p class="has-text-black">
      {{ topic.text }}
    </p>
    <footer class="topic-item__footer">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <ul class="tags">
              <li v-for="tag in topic.tags" :key="tag.id"><a href="#">{{ tag }}</a></li>
            </ul>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <a href="#" class="is-grey">
              <b-icon icon="comments" type="is-primary" size="is-small"></b-icon>
              {{ topic.comments_count }}
            </a>
          </div>
          <div class="level-item">
            <span>
              <b-icon icon="eye" type="is-primary" size="is-small"></b-icon>
              {{ topic.views_count }}
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    props: ['topic']
  }
</script>

<style lang="scss" scoped>
  .topic-item {
    background-color: #F8F2F2;
    font-family: 'Roboto';

    .author-fullname {
      margin-left: 10px;
      color: $grey;
    }

    .publish-date {
      color: $grey;
    }

    .level {
      margin-bottom: 1rem;
    }

    .title {
      font-weight: 500;
    }

    p {
      margin-top: 0.5rem;
    }

    .topic-item__footer {
      margin-top: 12px;
      font-size: 14px !important;
      color: $grey !important;

      .level {
        margin-bottom: 0;
      }
    }

    .tags {
      margin: 0;

      li {
        margin-left: 10px;
        margin-right: 10px;
      }
      a {
        color: $grey;
        position: relative;
        display: flex;

        &:hover {
          color: #000;
        }

        &:before {
          content: '#';
          position: absolute;
          left: -10px;
        }
      }
    }
  }
</style>
