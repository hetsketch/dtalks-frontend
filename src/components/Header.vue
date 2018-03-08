<template>
  <header>
    <nav class="navbar is-transparent is-fixed-top has-bottom-shadow" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item" href="/">
            <div class="logo">
              <img src="/static/logo.svg" alt="DevTalks">
            </div>
          </router-link>
          <router-link to="/discussions" class="navbar-item is-underlineable">Обсуждения</router-link>
          <router-link to="/events" class="navbar-item is-underlineable">События</router-link>
          <router-link to="/vacancies" class="navbar-item is-underlineable">Вакансии</router-link>
          <router-link to="/companies" class="navbar-item is-underlineable">Компании</router-link>
          <button class="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="navbar-end">
          <a class="navbar-item">
            <d-search-form label="Поиск" placeholder="Что ищем?"></d-search-form>
          </a>
          <a class="navbar-item">
            <d-login></d-login>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import SearchForm from './SearchForm'
  import Login from './Login'

  export default {
    components: {
      'd-search-form': SearchForm,
      'd-login': Login
    }
  }
</script>

<style lang="scss" scoped>
  .has-bottom-shadow {
    -webkit-box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.25);
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.25);
  }

  .navbar-item {
    font-family: $navbar-font-family;
    position: relative;
  }

  .is-underlineable {
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 47px;
      height: 2px;
      width: 0;
      background-color: #4A90E2;
      transition: width 0.15s;
    }
    &:before {
      content: '';
      top: 47px;
      position: absolute;
      right: 50%;
      height: 2px;
      width: 0;
      background-color: #4A90E2;
      transition: width 0.15s;
    }
    &:hover {
      &:after, &:before {
        width: calc(50% - 1rem);
      }
    }
  }

  .logo {
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 10px;
      height: 20px;
      background-color: #000000;
      left: 175px;
      top: 1px;
      opacity: 0;
      animation-duration: 0.7s;
      animation-name: blink;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }

  @keyframes blink {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
