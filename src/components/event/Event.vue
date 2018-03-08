<template>
  <section class="event">
    <div class="container">
      <header class="event__header">
        <div class="level is-marginless">
          <div class="level-left">
            <div class="level-item">
              <h1 class="event__title is-size-2">{{ event.title }}</h1>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-icon icon="eye" size="is-small"></b-icon>
              <span class="event__views">{{ event.views_count }}</span>
            </div>
          </div>
        </div>

        <figure class="event__image image">
          <img src="../../assets/pic.png" alt="">
        </figure>
      </header>
      <article class="event__body">
        <div class="columns">
          <div class="column is-2">
            <ul class="event__meta">
              <li class="event__meta-item">
                <b-icon icon="calendar-alt" size="is-small"></b-icon>
                <span class="event__meta-title">{{ moment(event.start_time).format('DD MMMM YYYY') }}</span>
              </li>
              <li class="event__meta-item">
                <b-icon icon="clock" size="is-small"></b-icon>
                <span class="event__meta-title">
                  {{ moment(event.start_time).format('HH.mm') }} — {{ moment(event.end_time).format('HH.mm') }}
                </span>
              </li>
              <li class="event__meta-item">
                <b-icon icon="location-arrow" size="is-small"></b-icon>
                <span class="event__meta-title" v-if="!event.online">{{ event.city }}</span>
                <span class="event__meta-title" v-else>Online</span>
              </li>
              <li class="event__meta-item" v-if="!event.online">
                <b-icon icon="map-marker" size="is-small"></b-icon>
                <span class="event__meta-title">{{ event.address }}</span>
              </li>
              <li class="event__meta-item">
                <b-icon icon="ruble-sign" size="is-small"></b-icon>
                <span class="event__meta-title" v-if="!event.free">{{ event.price }}</span>
                <span class="event__meta-title" v-else>Бесплатно</span>
              </li>
              <li class="event__meta-item">
                <b-icon icon="users" size="is-small"></b-icon>
                <span class="event__meta-title">{{ event.participants_count }}</span>
              </li>
            </ul>
          </div>

          <div class="column is-8">
            <p class="event__text">{{ event.text }}</p>
            <yandex-map
              :coords="[event.latitude, event.longitude]"
              :controls="[]"
              style="width: 100%;height:180px; margin-top: 30px;">

              <ymap-marker
                marker-type="placemark"
                :coords="[event.latitude, event.longitude]"
                cluster-name="1"
              ></ymap-marker>

            </yandex-map>
            <!--todo: add comments later-->
            <!--<d-comment-list :comments="event.comments"></d-comment-list>-->
          </div>

          <div class="column is-2">
            <h3 class="event__participants-heading has-text-black is-bold is-size-5">Участники</h3>
            <div class="event__participants">
              <div class="row" v-for="participantChunk in filteredParticipants">
                <a :href="participant.user_id" class="event__participant" v-for="participant in participantChunk">
                  <img src="../../assets/img.jpg" alt="">
                </a>
              </div>
            </div>
            <a
              class="event__show-all is-grey is-size-7"
              @click.prevent="toggleParticipantsList"
              v-if="chunkedParticipants.length > 2">
              {{ showAllParticipants ? 'Скрыть' : 'Показать всех' }}
            </a>
            <button
              v-if="!($store.state.currentUser.id == event.author.id)"
              @click="addParticipant"
              class="event__go-button button is-fullwidth">
              Я пойду!
            </button>
            <button
              @click="inviteFriend"
              class="event__invite-button button is-fullwidth">
              Пригласить друга
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        event: {
          participants: []
        },
        chunkedParticipants: [],
        showAllParticipants: false
      }
    },
    methods: {
      fetchEvent(id) {
        this.$http.get('/events/' + id).then(response => {
          this.event = response.data.data;
          this.chunkedParticipants = this.buildChunkedParticipants(this.event.participants);
        }, response => {
          console.log('error');
        });
      },
      buildChunkedParticipants(arr, chunkSize = 4) {
        let groups = [], i;
        for(i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
        }
        return groups;
      },
      toggleParticipantsList() {
        this.showAllParticipants = !this.showAllParticipants;
      },
      addParticipant() {
        //TODO: participants
      },
      inviteFriend() {
        //TODO: invitations
      }
    },
    computed: {
      filteredParticipants: function() {
        if(this.showAllParticipants) {
          return this.chunkedParticipants;
        }
        return this.chunkedParticipants.slice(0, 2);
      }
    },
    watch: {
      '$route'(to, from) {
        this.fetchEvent(to.params.id)
      }
    },
    created() {
      this.fetchEvent(this.$route.params.id);
    },
  }
</script>

<style lang="scss" scoped>
  .event {
    margin-top: 10px;

    &__title {
      font-family: Roboto;
      font-weight: 300;
    }

    &__views {
      margin-left: 10px;
    }

    &__image {
      box-shadow: 0 2px 4px #000;
    }

    &__body {
      margin-top: 20px;
    }

    &__meta-item {
      font-family: "Roboto Condensed";

      &:not(:first-child) {
        margin-top: 10px;
      }
    }

    &__meta-title {
      margin-left: 10px;
    }

    &__participants {
      .row {
        margin-top: 2px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
    }

    &__participant {
      &:not(:first-child) {
        margin-left: 2px;
      }
      img {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
      }
      width: 50px;
      height: 50px;
    }

    &__participants-heading {
      font-family: Roboto;
      margin-bottom: 8px;
    }

    &__go-button, &__invite-button {
      margin-top: 10px;
      font-family: "Roboto Condensed";
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }

    &__go-button {
      border: 2px solid #64B62E;
    }

    &__invite-button {
      border: 2px solid #FABD29;
    }
  }
</style>

<style>
  .ymap-body {
    width: 100%;
    height: 180px;
  }
</style>
