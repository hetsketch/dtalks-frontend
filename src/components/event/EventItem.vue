<template>
  <div class="event-item box is-radiusless is-shadowless">
    <header>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link
              :to="{ name: 'showEvent', params: {id: event.id}}"
              class="title is-size-4 has-text-black">
              {{ event.title }}
            </router-link>
          </div>
          <div class="level-item">
            <b-icon icon="location-arrow" size="is-small"></b-icon>
            <a class="location is-size-7">{{ event.city }}</a>
          </div>
          <div class="level-item">
            <b-icon icon="ruble-sign" size="is-small"></b-icon>
            <span class="price is-size-7">{{ event.free ? 'Бесплатно' : event.price }}</span>
          </div>
          <div class="level-item">
            <b-icon icon="users" size="is-small"></b-icon>
            <span class="participants-count is-size-7">{{ event.participants_count }}</span>
          </div>
        </div>
        <div class="level-right"></div>
      </div>
    </header>
    <article>
      <p class="description">{{ event.text }}</p>
    </article>
    <footer>
      <div class="level">
        <div class="level-left">
          <ul class="tags">
            <li
              v-for="tag in event.tags"
              :key="tag.id">
                <a href="#">{{ tag }}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['event']
  }
</script>

<style lang="scss" scoped>
  .event-item {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 65px;
    padding-top: 20px;
    background-color: rgba(100, 182, 46, 0.04);
  }

  .location, .participants-count, .price {
    margin-left: 2px;
    color: inherit;
  }

  .actions {
    margin-bottom: 0 !important;
  }

  .description {
    margin-top: 15px;
    font-size: 0.875rem;
    font-family: Roboto;
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
</style>
