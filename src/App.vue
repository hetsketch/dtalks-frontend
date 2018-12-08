<template>
  <div id="app">
    <d-header></d-header>
    <router-view></router-view>
    <d-footer></d-footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import DiscussionBoard from './components/discussion/DiscussionBoard'
  import EventPage from './components/event/EventPage'
  import UserProfile from './components/user/UserProfile'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      'd-header': Header,
      'd-discussion-board': DiscussionBoard,
      'd-event-page': EventPage,
      'd-user-profile': UserProfile,
      'd-footer': Footer
    },
    created() {
      // TODO: extract it to some method or smth
      let that = this;
      this.$store.commit('FETCH_USER_OS');
      this.$cable.subscriptions.create("AppearanceChannel", {
        received(onlineUsers) {
          that.$store.commit('ONLINE_USERS', onlineUsers);
        }
      });
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Condensed');
  @import '~bulma-divider';

  // Set your colors
  $primary: #468EE5;
  $primary-invert: findColorInvert($primary);
  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;
  $navbar-item-hover-color: none;
  $navbar-height: 4.5rem;
  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  #app {
    display: flex;
    min-height: calc(100vh - 72px);
    flex-direction: column;
  }

  header + * {
    flex: 1;
  }
</style>
