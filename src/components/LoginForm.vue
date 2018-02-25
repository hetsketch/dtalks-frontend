<template>
  <div class="login-modal">
    <h2 class="is-size-4 has-text-centered">Войти с помощью</h2>
    <d-socials></d-socials>
    <div class="fields">
      <b-field>
        <b-input
          type="email"
          v-model="credentials.email"
          placeholder="Email или Ник">
        </b-input>
      </b-field>

      <b-field>
        <b-input
          type="password"
          v-model="credentials.password"
          password-reveal
          placeholder="Пароль">
        </b-input>
      </b-field>

      <b-checkbox v-model="remember">Запомнить меня</b-checkbox>
      <a class="is-pulled-right is-small" href="#">Забыли пароль?</a>
      <br><br>
      <a href="#" @click="switchToSignup">Регистрация</a>
      <a class="button is-info is-fullwidth" @click="signin">Войти</a>
    </div>
  </div>
</template>

<script>
  import Socials from './Socials'

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        remember: false,
        responseErrors: {}
      }
    },
    methods: {
      switchToSignup() {
        this.$emit('switchToSignup');
      },
      signin() {
        const self = this;
        this.$store.dispatch('signin', this.credentials).then(() => {
          self.$parent.close();
        });
      }
    },
    components: {
      'd-socials': Socials
    }
  }
</script>

<style lang="scss" scoped>
  .login-modal {
    .fields {
      margin-top: 25px;
    }

    .is-small {
      font-size: 0.75rem;
    }
  }

  h2 {
    margin-bottom: 20px;
  }
</style>
