<template>
  <section class="user-profile">
    <div class="container">
      <b-table :data="users" :columns="columns"></b-table>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        users: [],
        columns: [
          {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true,
            centered: true
          },
          {
            field: 'username',
            label: 'Username',
          },
          {
            field: 'role',
            label: 'Role',
            centered: true
          },
          {
            field: 'online',
            label: 'Online',
            centered: true
          }
        ]
      }
    },

    computed: {
      ...mapGetters(['userOS', 'onlineUsers'])
    },

    created() {
      this.$http.get(`/users`)
        .then(response => {
          this.users = response.data.data.users;
        })
        .then(() => {
          this.mapOnline();
        })
        .catch(error => {
          this.$router.push({ name: '404' });
        });
    },

    methods: {
      mapOnline() {
        this.users = this.users.map(user => {
          return { ...user, online: this.onlineUsers.indexOf(user.id) >= 0 }
        })
      }
    },

    watch: {
      onlineUsers() {
        this.mapOnline();
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
