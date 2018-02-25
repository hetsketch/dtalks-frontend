<template>
  <div class="box event is-paddingless">
    <div class="columns">
      <div class="column is-narrow">
        <figure class="image">
          <img src="../../assets/unity.png" alt="">
        </figure>
      </div>
      <div class="column">
        <a class="event-title has-text-black">{{ event.title }}</a>
        <p class="event-start-date is-size-7">{{ moment(event.start_date).format('DD MMMM') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['event']
  }
</script>

<style lang="scss" scoped>
  .event {
    box-shadow: none;
    margin: 11px 0 0;

    figure {
      width: 100px;
    }

    .event-title {
      display: block;
      font-family: 'Roboto';
      font-weight: 500;
      font-size: 0.8125rem;
      margin-top: -5px;
      line-height: 1.3;
    }
    .event-start-date {

    }
  }
</style>
