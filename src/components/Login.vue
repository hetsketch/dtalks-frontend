<template>
  <div class="login is-vertical-center">
    <b-dropdown
      class="link-text"
      v-if="!$_.isEmpty($store.state.currentUser)">
      <span slot="trigger">
        <span class="login__username">{{ $store.state.currentUser.username }}</span>
        <b-icon icon="chevron-down" size="is-small"></b-icon>
      </span>

      <b-dropdown-item>
        <router-link
          :to="{ name: 'user.profile', params: { id: currentUser.id }}"
          class="has-text-black">
          <b-icon
            pack="far"
            icon="user"
            size="is-small"
            custom-class="regular">
          </b-icon>
          Профиль
        </router-link>
      </b-dropdown-item>

      <b-dropdown-item>
        <router-link
          :to="{ name: 'user.preferences', params: { id: currentUser.id }}"
          class="has-text-black">
          <b-icon
            icon="cog"
            size="is-small">
          </b-icon>
          Настройки
        </router-link>
      </b-dropdown-item>

      <hr class="dropdown-divider">
      <b-dropdown-item @click="$store.dispatch('logout')">
        <b-icon
          icon="sign-out-alt"
          size="is-small">
        </b-icon>
        Выход
      </b-dropdown-item>
    </b-dropdown>

    <div v-else>
        <b-icon icon="sign-in-alt"></b-icon>
      <span class="link-text" @click="isComponentModalActive = true">Войти</span>
    </div>
    <b-modal :active.sync="isComponentModalActive">
      <d-login-form v-if="showLoginForm" @switchToSignup="toggleForm"></d-login-form>
      <d-signup-form v-else="showLoginForm" @switchToLogin="toggleForm"></d-signup-form>
    </b-modal>
  </div>
</template>

<script>
  import LoginForm from './LoginForm';
  import SignupForm from './SignupForm';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        isComponentModalActive: false,
        showLoginForm: true
      }
    },
    computed: {

      ...mapGetters(['currentUser'])
    },
    methods: {
      toggleForm() {
        this.showLoginForm = !this.showLoginForm;
      }
    },
    components: {
      'd-login-form': LoginForm,
      'd-signup-form': SignupForm
    }
  }
</script>

<style lang="scss">
  .login {
    .link-text {
      margin-left: 8px;
    }

    .modal-content {
      width: 370px;
      background-color: #fff;
      padding: 20px 30px 30px 30px;
      border-radius: 5px;
    }

    h2 {
      margin-bottom: 10px;
    }

    &__username {
      -webkit-user-select: none; /* webkit (safari, chrome) browsers */
      -moz-user-select: none; /* mozilla browsers */
      -khtml-user-select: none; /* webkit (konqueror) browsers */
      -ms-user-select: none; /* IE10+ */
    }
  }
</style>
