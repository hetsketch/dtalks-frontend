<template>
  <div class="events">
    <h2 class="events__heading is-size-4">Не пропусти</h2>
    <d-event-item
      v-for="event in events"
      :key="event.id"
      :event="event">
    </d-event-item>
  </div>
</template>

<script>
  import EventItem from './EventItem'

  export default {
    data() {
      return {
        events: [
          {
            id: 1,
            title: 'Основы разработки игр на Unity',
            start_date: new Date(),
            image: '/Users/mac/dev/dtalks-frontend/src/assets/unity.png'
          },
          {
            id: 2,
            title: 'Основы разработки игр на Unity',
            start_date: new Date(),
            image: '/Users/mac/dev/dtalks-frontend/src/assets/unity.png'
          }
        ]
      }
    },
    components: {
      'd-event-item': EventItem
    }
  }
</script>

<style lang="scss" scoped>
  .events {
    font-family: 'Roboto';

    &__heading {
      font-weight: 500;
    }
  }
</style>
