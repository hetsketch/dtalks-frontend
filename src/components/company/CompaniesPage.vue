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
          <!--TODO: Add async loading-->
          <div v-infinite-scroll="loadMore"
               infinite-scroll-disabled="busy"
               infinite-scroll-distance="10">
            <p class="has-text-centered" v-if="busy">Загрузка...</p>
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
        orderBy: 'rating'
      }
    },
    methods: {
      fetchCompanies() {
        let params = { order_by: this.orderBy, q: this.searchQuery };
        this.$http.get('/companies', { params: params })
          .then(response => {
            this.companies = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      searchCompanies() {
        this.fetchCompanies();
      },
      loadMore() {
        this.busy = true;

        setTimeout(() => {
          this.busy = false;
        }, 1000);
      }
    },
    components: {
      'd-company-item': CompanyItem
    },
    created() {
      this.fetchCompanies();
    },
    watch: {
      orderBy() {
        this.fetchCompanies();
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
  }
</style>
