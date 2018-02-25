<template>
  <div class="login is-vertical-center">
    <b-dropdown
      class="link-text"
      v-if="!$_.isEmpty($store.state.currentUser)">
      <span slot="trigger">
        <span>{{ $store.state.currentUser.username }}</span>
        <b-icon icon="chevron-down" size="is-small"></b-icon>
      </span>
      <b-dropdown-item>Профиль</b-dropdown-item>
      <b-dropdown-item @click="$store.dispatch('logout')">Выход</b-dropdown-item>
    </b-dropdown>

    <div v-else>
      <b-icon icon="sign-in" type="is-blue"></b-icon>
      <span class="link-text" @click="isComponentModalActive = true">Войти</span>
    </div>
    <b-modal :active.sync="isComponentModalActive">
      <d-login-form v-if="showLoginForm" @switchToSignup="toggleForm"></d-login-form>
      <d-signup-form v-else="showLoginForm" @switchToLogin="toggleForm"></d-signup-form>
    </b-modal>
  </div>
</template>

<script>
  import LoginForm from './LoginForm'
  import SignupForm from './SignupForm'

  export default {
    data() {
      return {
        isComponentModalActive: false,
        showLoginForm: true
      }
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
      margin-left: 8px
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
  }
</style>
