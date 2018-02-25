<template>
  <div class="socials">
    <div class="columns is-multiline is-variable is-1">
      <div class="column is-half">
        <a class="box fb has-text-centered has-text-white">
          <b-icon icon="facebook-official" type="is-white"></b-icon>
          Facebook
        </a>
      </div>
      <div class="column is-half">
        <a class="box google has-text-centered has-text-white">
          <b-icon icon="google" type="is-white"></b-icon>
          Google
        </a>
      </div>
      <div class="column is-half">
        <a class="box twitter has-text-centered has-text-white">
          <b-icon icon="twitter" type="is-white"></b-icon>
          Twitter
        </a>
      </div>
      <div class="column is-half">
        <a class="box github has-text-centered has-text-white">
          <b-icon icon="github" type="is-white"></b-icon>
          Github
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .fb {
    background-color: #3b5998;
  }

  .google {
    background-color: #dd4b39;
  }

  .twitter {
    background-color: #1da1f2;
  }

  .github {
    background-color: #333;
  }

  .socials {
    .box {
      padding: 0.5rem;
      color: #fff;
    }
    .column {
      padding: 0.25rem;
    }
  }
</style>
