<template>
  <section class="user-profile">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-9">

          <div class="columns">
            <div class="column is-3">
              <div class="user-profile__photo">
                <img :src="user.avatar.original" alt="">
              </div>
            </div>
            <div class="column is-9">
              <div class="user-profile__user-info">
                <div>
                  <div class="level is-marginless">
                    <div class="level-left">
                      <div class="level-item">
                      <span
                        class="is-size-3 has-text-weight-semibold user-profile__full-name">
                        {{ user.full_name }}
                      </span>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <ul class="user-profile__contacts">
                          <li
                            v-for="link in user.links"
                            class="user-profile__contact is-inline-block">
                            <a :href="link" class="has-gh-color" v-if="$_.includes(link, 'github.com')">
                              <b-icon pack="fab" icon="github"></b-icon>
                            </a>
                            <a :href="link" class="has-fb-color" v-else-if="$_.includes(link, 'facebook.com')">
                              <b-icon pack="fab" icon="facebook"></b-icon>
                            </a>
                            <a :href="link" class="has-vk-color" v-else-if="$_.includes(link, 'vk.com')">
                              <b-icon pack="fab" icon="vk"></b-icon>
                            </a>
                            <a :href="link" class="has-tw-color" v-else-if="$_.includes(link, 'twitter.com')">
                              <b-icon pack="fab" icon="twitter"></b-icon>
                            </a>
                            <a :href="link" class="has-tw-color" v-else>
                              <b-icon pack="fas" icon="link" size="small"></b-icon>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <b-icon
                    icon="briefcase"
                    size="is-small">
                  </b-icon>
                  <span class="user-profile__position"
                        v-if="user.position">
                    {{ user.position }}
                  </span>
                  <router-link
                    v-if="!$_.isEmpty(user.company)"
                    :to="{ name: 'company.show', params: { id: user.company.id } }">
                    <span class="has-text-grey-dark">в</span>
                    {{ user.company.name }}
                  </router-link>
                </div>
                <p class="user-profile__user-bio">
                  {{ user.bio }}
                </p>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column is-12">
              <b-tabs v-model="activeTab">
                <b-tab-item label="Сообщения">
                  <div
                    class="user-profile__tab-info has-text-centered"
                    v-if="$_.isEmpty(user.messages)">
                    <p class="is-size-5">У вас пока нет сообщений :(</p>
                  </div>
                  <div
                    class="box user-profile__topic-item"
                    v-else
                    v-for="i in 5">
                    <a href="#" class="is-size-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis,
                      vel?</a>
                  </div>
                </b-tab-item>

                <b-tab-item label="Комментарии">
                  <div
                    class="user-profile__tab-info has-text-centered"
                    v-if="$_.isEmpty(user.comments)">
                    <p class="is-size-5">Вы еще ничего не комментировали :(</p>
                    <router-link :to="{ name: 'discussions' }">Перейти к обсуждениям</router-link>
                  </div>
                  <div
                    class="box user-profile__topic-item"
                    v-else
                    v-for="comment in user.comments"
                    :key="comment.id">
                    <a :href="comment" class="is-size-6">{{ comment.text }}</a>
                  </div>
                </b-tab-item>

                <b-tab-item label="Топики">
                  <div
                    class="user-profile__tab-info has-text-centered"
                    v-if="$_.isEmpty(user.topics)">
                    <p class="is-size-5">Вы не создали еще ни одного топика, но можете сделать это прямо сейчас!</p>
                    <router-link
                      :to="{ name: 'topic.new' }"
                      class="button">
                      Создать
                    </router-link>
                  </div>
                  <div
                    class="box user-profile__topic-item"
                    v-else
                    v-for="topic in user.topics">
                    <router-link
                      :to="{ name: 'topicPage', params: { id: topic.id } }"
                      class="is-size-5">
                      {{ topic.title }}
                    </router-link>
                  </div>
                </b-tab-item>

                <b-tab-item label="Ивенты">
                  <div
                    class="user-profile__tab-info has-text-centered"
                    v-if="$_.isEmpty(user.events)">
                    <p class="is-size-5">Вы не были еще ни на одном ивенте. Посмотрите
                      <router-link :to="{ name: 'events' }">предстоящие</router-link>
                      ивенты или создайте свой!
                    </p>
                    <router-link :to="{ name: 'event.new' }" class="button">Создать ивент</router-link>
                  </div>
                  <div
                    class="box user-profile__topic-item"
                    v-else
                    v-for="event in user.events">
                    <router-link
                      :to="{name: 'showEvent', params:{ id: event.id }}"
                      class="is-size-5">
                      {{ event.title }}
                    </router-link>
                  </div>
                </b-tab-item>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        user: {
          company: {},
          avatar: {}
        },
        activeTab: 0
      }
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
    created() {
      this.$http.get(`/users/${this.$route.params.id}`)
        .then(response => {
          this.user = response.data.data;
        })
        .catch(error => {
          this.$router.push({ name: '404' });
        });
    }
  }
</script>

<style lang="scss">
  .user-profile {
    margin-top: 30px;

    &__photo {
      max-width: 250px;
      height: auto;
      img {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
      }
    }

    &__topic-item {
      padding: 0.55rem 1rem;
      margin-bottom: 0.5rem !important;
    }

    &__user-info {
      margin-top: -10px;
    }

    &__user-bio {
      margin-top: 20px;
    }

    &__contact {
    }
  }
</style>
