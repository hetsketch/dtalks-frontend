<template>
  <section class="companies">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <b-input
            v-model="searchQuery"
            @keyup.native.enter="searchCompanies"
            placeholder="Поиск по названию компании">
          </b-input>
          <div class="companies__actions">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <b-select size="is-small" placeholder="Сортировать" rounded v-model="orderBy">
                    <option value="rating">По рейтингу</option>
                    <option value="employees">По количеству сотрудников</option>
                    <option value="vacancies">По количеству вакансий</option>
                  </b-select>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <router-link
                    :to="{ name: 'company.new' }"
                    class="button is-info is-rounded companies__new-company">
                    Добавить компанию
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="companies__companies-list">
            <d-company-item v-for="company in companies" :key="company.id" :company="company"></d-company-item>
          </div>
          <div v-infinite-scroll="loadMore"
               infinite-scroll-disabled="busy"
               infinite-scroll-distance="10"
               infinite-scroll-immediate-check="false">
            <p class="has-text-centered load is-loading" v-if="busy"></p>
          </div>
        </div>
        <div class="column is-4">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import CompanyItem from './CompanyItem';

  export default {
    data() {
      return {
        companies: [],
        searchQuery: '',
        busy: false,
        orderBy: 'rating',
        page: 1,
        totalPages: 1
      }
    },
    methods: {
      fetchCompanies() {
        return new Promise((resolve, reject) => {
          let params = { order_by: this.orderBy, q: this.searchQuery, page: this.page };
          this.$http.get('/companies', { params: params })
            .then(response => {
              resolve(response.data.data);
            })
            .catch(error => {
              console.log(error);
            });
        });
      },
      searchCompanies() {
        this.page = 1;
        this.fetchCompanies().then(data => {
          this.companies = data.companies;
          this.totalPages = data.total_pages;
        });
      },
      loadMore() {
        if(this.page < this.totalPages) {
          this.busy = true;
          this.page++;
          this.fetchCompanies().then((data) => {
            this.companies = this.companies.concat(data.companies);
            this.busy = false;
          });
        }
      }
    },
    components: {
      'd-company-item': CompanyItem
    },
    created() {
      this.fetchCompanies().then(data => {
        this.companies = data.companies;
        this.totalPages = data.total_pages;
      });
    },
    watch: {
      orderBy() {
        this.page = 1;
        this.fetchCompanies().then(data => {
          this.companies = data.companies;
          this.totalPages = data.total_pages;
        });
      }
    }
  }
</script>

<style lang="scss">
  .companies {
    margin-top: 20px;

    &__actions {
      margin-top: 15px;
    }

    &__companies-list {
      margin-top: 35px;
    }

    .load {
      &.is-loading {
        position: relative;
        pointer-events: none;
        opacity: 0.5;
        &:after {
          @include loader;
          position: absolute;
          top: calc(50% - 1em);
          left: calc(50% - 1em);
          width: 2em;
          height: 2em;
          border-width: 0.25em;
        }
      }
    }
  }
</style>
