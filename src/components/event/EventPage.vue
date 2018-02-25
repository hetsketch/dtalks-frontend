<template>
  <section class="events">
    <div class="container">
      <div class="columns is-variable is-7">
        <div class="column is-9">
          <div class="events__timeline">
            <div class="level events__nav">
              <div class="level-left">
                <a class="events__upcoming level-item has-text-black is-underlineable green-line"
                   @click="showUpcomingEvents" :class="{ 'is-active': upcoming }">Предстоящие</a>
                <a class="events__past level-item has-text-black is-underlineable green-line"
                   @click="showPastEvents" :class="{ 'is-active': !upcoming }">Прошедшие</a>
              </div>
              <div class="level-right">
                <router-link :to="{ name: 'event.new' }" class="level-item has-text-black events__new-event">Добавить
                  ивент
                </router-link>
              </div>
            </div>
            <div class="events__timeline-day" v-for="(day_events, start_time, index) in events">
              <div class="events__day-header">
                <div class="events__date is-circle">
                  <div class="events__day">{{ moment(start_time).format('D') }}</div>
                  <div class="events__month">{{ moment(start_time).format('MMM') }}</div>
                </div>
              </div>
              <d-event-item v-for="event in day_events" :key="event.id" :event="event"></d-event-item>
            </div>
          </div>

        </div>
        <div class="column is-3">
          <div class="events__cities">
            <span class="events__cities-heading is-size-5 is-bold">Город</span>
            <b-icon icon="info-circle" size="is-small"></b-icon>
            <ul class="events__cities-list">
              <li><a href="#" class="events__city-item is-grey is-medium" @click="clearSelectedCities"
                     :class="{ 'is-selected has-text-black': selectedCities.length === 0 }">Все</a></li>
              <li v-for="city in cities">
                <a href="#"
                   class="events__city-item is-grey is-medium"
                   :class="{ 'is-selected has-text-black': isSelected(city) }"
                   @click="pushPopToSelectedCities(city)">
                  {{ city }}
                </a>
              </li>
            </ul>
          </div>

          <div class="events__categories">
            <span class="events__categories-heading is-size-5 is-bold">Категории</span>
            <b-icon icon="info-circle" size="is-small"></b-icon>
            <ul class="events__categories-list">
              <li><a href="#" class="events__category-item has-text-black is-medium is-selected">Бизнес</a></li>
              <li><a href="#" class="events__category-item is-grey is-medium">Product placement</a></li>
              <li><a href="#" class="events__category-item is-grey is-medium">Backend</a></li>
              <li><a href="#" class="events__category-item is-grey is-medium">Вебинар</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import EventItem from './EventItem'

  export default {
    data() {
      return {
        events: {},
        cities: [],
        errors: [],
        selectedCities: [],
        upcoming: true
      }
    },
    methods: {
      fetchEvents() {
        this.$http.get('/events', { params: this.buildParams() })
          .then(response => {
            this.events = response.data.data;
          })
          .catch(response => {
            this.errors = (response.data.data.errors);
          });
      },
      fetchCities() {
        this.$http.get('/events/cities')
          .then(response => {
            this.cities = response.data.data;
          })
          .catch(response => {
            this.errors = (response.data.data.errors);
          });
      },
      pushPopToSelectedCities(city) {
        let index = this.selectedCities.indexOf(city);
        if(index > -1) {
          this.selectedCities.splice(index, 1);
        } else {
          this.selectedCities.push(city);
        }
      },
      isSelected(city) {
        return this.selectedCities.indexOf(city) > -1;
      },
      clearSelectedCities() {
        this.selectedCities = [];
      },
      showUpcomingEvents() {
        this.upcoming = true;
        this.fetchEvents();
      },
      showPastEvents() {
        this.upcoming = false;
        this.fetchEvents();
      },
      buildParams() {
        let params = {};
        if(this.selectedCities.length > 0) {
          params = Object.assign(params, { cities: this.selectedCities })
        }
        if(!this.upcoming) {
          params = Object.assign(params, { status: 'past' });
        }
        return params;
      }
    },
    watch: {
      selectedCities() {
        this.fetchEvents();
      }
    },
    components: {
      'd-event-item': EventItem
    },

    created() {
      this.fetchEvents();
      this.fetchCities();
    }
  }
</script>

<style lang="scss" scoped>
  .events {
    margin-top: 20px;

    &__day-header {
      display: flex;
    }

    &__nav {
      position: absolute;
      width: calc(100% - 80px);
      top: 20px;
      left: 80px;
      align-items: flex-end;
    }

    &__date {
      position: relative;
      display: inline-flex;
      flex-shrink: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 50px;
      border: 2px solid $grey;
      text-align: center;
      font-size: 15px;
      font-weight: 500;
      font-family: Roboto;
      background-color: white;
    }

    &__day, &__month {
      line-height: 1rem;
    }

    &:before {
      position: absolute;
      content: '';
      background-color: white;
      left: 0;
      z-index: -1;
      width: 50px;
      height: 56px;
      display: block;
    }

    &__timeline {
      position: relative;

      &:before {
        z-index: -2;
        position: absolute;
        top: 0;
        left: 23px;
        content: ' ';
        width: 4px;
        height: 100%;
        background-color: #64B62E;
      }
    }

    &__upcoming, &__past, &__new-event {
      font-family: "Roboto Condensed";
    }

    &__cities-heading,
    &__categories-heading {
      font-family: Roboto;
    }

    &__city-item,
    &__category-item {
      font-size: 0.875rem;
      font-family: Roboto;
    }

    &__cities {
      margin-top: 24px;
    }

    &__categories {
      margin-top: 30px;
    }

    &__cities-list,
    &__categories-list {
      margin-top: 5px;
    }
  }

  .is-selected {
    position: relative;
    margin-left: 10px;

    &:before {
      content: '';
      position: absolute;
      width: 4px;
      height: 4px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      left: -10px;
      top: calc(50% - 1px);
      background-color: $grey;
    }
  }
</style>
