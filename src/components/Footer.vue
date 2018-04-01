<template>
  <footer>
    <div class="footer container">
      <div class="columns">
        <div class="column is-2">
          <div class="logo">
            <a href="/"><img src="/static/inverted_logo.svg" alt="DevTalks"></a>
          </div>
          <div class="socials">
            <ul>
              <li><a href="#" class="facebook has-text-centered">
                <b-icon pack="fab" icon="facebook-f" type="is-white" size="is-small"></b-icon>
              </a></li>
              <li><a href="#" class="vk has-text-centered">
                <b-icon pack="fab" icon="vk" type="is-white" size="is-small" style="margin-top: 5px;"></b-icon>
              </a></li>
              <li><a href="#"><img src="/static/t_logo.png" alt="telegram"></a></li>
              <li><a href="#"><img src="/static/gl_logo.png" alt="gitlab"></a></li>
            </ul>
          </div>
          <div class="copyright">
            <p class="has-text-white">© 2018 dtalks.ru</p>
          </div>
        </div>
        <div class="column is-9">
          <ul class="nav-left">
            <li>
              <a href="/discussions">Обсуждения</a>
            </li>
            <li>
              <a href="/events">События</a>
            </li>
            <li>
              <a href="/vacancies">Вакансии</a>
            </li>
            <li>
              <a href="/companies">Компании</a>
            </li>
          </ul>
        </div>
        <div class="column">
          <ul class="nav-right">
            <li>
              <a href="/about">О проекте</a>
            </li>
            <li>
              <a href="/contacts">Контакты</a>
            </li>
            <li>
              <a href="/rules">Правила</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  footer {
    background-color: #353535
  }
  .footer {
    padding: 1.5rem 1.5rem 1rem;
    background-color: #353535;

    li {
      a {
        color: #ffffff;
      }
    }

    .socials {
      margin-top: 15px;
      ul {
        display: flex;
        flex-direction: row;
      }
      li {
        &:not(:first-child) {
          margin-left: 8px;
        }
        a {
          display: block;
          width: 25px;
          height: 25px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }
      .facebook {
        background-color: #3b5998;
      }
      .vk {
        background-color: #4c75a3;
      }
    }

    .copyright {
      margin-top: 15px;
      font-family: 'Roboto Condensed';
    }
    .nav-left, .nav-right {
      a {
        font-family: "Roboto Condensed";
      }
    }
  }
</style>
