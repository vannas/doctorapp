<template>
  <div id="app">    
    <md-tabs class="md-primary nav-wrapper" md-alignment="right">
        <router-link to="/"><md-tab md-icon="home" md-label="Home"></md-tab></router-link> 
        <router-link to="/appointments" v-if="$route.path != '/login'"><md-tab md-icon="add" md-label="Make Appointment"> </md-tab></router-link> 

        <router-link to="/login" @click="logout" v-if="user"><md-tab md-icon="exit" md-label="Log Out"></md-tab></router-link>
    </md-tabs>

    <router-view/> 

  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'App',
  components: {
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut();
    },
  }
}
</script>

<style>
  #app {
    font-family: Roboto, Tahoma, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-bottom:30px;
  }

</style>
