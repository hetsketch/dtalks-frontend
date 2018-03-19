<template>
  <article class="media company-item">
    <figure class="media-left">
      <p class="image is-96x96">
        <img :src="company.thuthumbnailmb" class="company-item__company-logo">
      </p>
    </figure>
    <div class="media-content">
      <div class="company-item__header">
        <div class="level is-marginless">
          <div class="level-left">
            <router-link
              :to="{ name: 'company.show', params: { id: company.id } }"
              class="is-size-5 has-text-black is-medium">
              {{ company.name }}
            </router-link>
          </div>
          <div class="level-right">
            <router-link :to="{ name: 'companies', params: { city: company.city } }" class="company-item__cities has-text-grey">{{ company.city }}</router-link>
          </div>
        </div>
        <div class="company-item__url">
          <a :href="company.url">{{ prettyUrl(company.url) }}</a>
        </div>
      </div>
      <div class="company-item__footer">
        <p class="company-item__short-info">{{ shortInfo }}</p>
        <div class="level is-marginless">
          <div class="level-left">
            <div class="level-item">
              <router-link :to="{ name: 'vacancies', params: { companyId: company.id } }">
                Вакансии {{ company.vacancies_count }}
              </router-link>
            </div>
            <div class="level-item">
              <router-link :to="{ name: 'reviews', params: { companyId: company.id } }">
                Отзывы {{ company.reviews_count }}
              </router-link>
            </div>
            <div class="level-item">
              <router-link :to="{ name: 'employees', params: { companyId: company.id } }">
                Сотрудники {{ company.employees_count }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    computed: {
      shortInfo() {
        return this.company.info.split('.')[0];
      }
    },
    methods: {
      prettyUrl(url) {
        if (!this.$_.isNull(url)) {
          return url.split('//')[1];
        }
      }
    },
    props: ['company']
  }
</script>

<style lang="scss">
  .company-item {
    .media-content {
    }

    &__company-logo {
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }

    &__cities {
      font-size: 0.875rem;
    }

    &__link {
      margin-top: -4px;
      margin-bottom: 8px;
      font-size: 0.875rem;
    }

    &__short-info {
      font-size: 0.875rem;
      margin-bottom: 5px;
    }

    &__footer {
      font-size: 0.875rem;
    }
  }
</style>

