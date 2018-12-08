<template>
  <div class="login-modal">
    <h2 class="is-size-4 has-text-centered has-text-black">Регистрация</h2>
    <form @submit.prevent="signup">
      <b-field>
        <b-input
          v-model="user.username"
          placeholder="Ник"
        >
        </b-input>
      </b-field>

      <b-field>
        <b-input
          type="email"
          v-model="user.email"
          placeholder="Email"
        >
        </b-input>
      </b-field>

      <b-field>
        <b-input
          type="password"
          v-model="user.password"
          password-reveal
          placeholder="Пароль"
        >
        </b-input>
      </b-field>

      <b-field>
        <b-input
          type="password"
          v-model="user.password_confirmation"
          password-reveal
          placeholder="Подтверждение пароля"
        >
        </b-input>
      </b-field>
      <a href="#" @click="switchToLogin">Войти</a>
      <button class="button is-info is-fullwidth" type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
  import Socials from './Socials'

  export default {
    data() {
      return {
        user: {
          username: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        responseErrors: []
      }
    },
    methods: {
      switchToLogin() {
        this.$emit('switchToLogin');
      },
      signup() {
        this.$http.post('/auth', this.user)
          .then(response => {
            this.$store.commit('authHeaders', response.headers);
            console.log('user has successfully created');
          })
          .catch(response => {
            console.log(response);
            this.responseErrors = response.data.errors;
          })
      }
    },
    components: {
      'd-socials': Socials
    }
  }
</script>

<style scoped>
  .modal-card {
    width: 500px;
  }

  .modal-card-head, .modal-card-foot {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
</style>
