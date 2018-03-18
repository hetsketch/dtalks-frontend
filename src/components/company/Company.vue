<!--TODO: create company page-->

<template>

</template>

<script>
  export default {
    data() {
      return {
        company: {
          photos: []
        }
      }
    },
    methods: {
      fetchCompany(id) {
        this.$http.get(`/companies/${id}`)
          .then(response => {
            this.company = response.data.data;
          })
          .catch(error => {
            console.log('error');
          });
      }
    },
    created() {
      this.fetchCompany(this.$route.params.id);
    }
  }
</script>

<style lang="scss">

</style>
