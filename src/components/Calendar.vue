<template>
   <div class="md-layout md-alignment-top-center">
    <md-table md-card md-layout-item>
      <md-table-toolbar>
        <h1 class="md-title">Doctor Brenner's Appointments</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>Date</md-table-head>
        <md-table-head md-numeric>Time</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Patient</md-table-head>
        <md-table-head>Complaint</md-table-head>
      </md-table-row>

      <md-table-row v-for="patient in patients" :key="patient.id">
        <md-table-cell> {{patient.date.toDate()}} </md-table-cell>
        <md-table-cell>{{patient.time}}</md-table-cell>
        <md-table-cell>{{patient.email}}</md-table-cell>
        <md-table-cell>{{patient.name}}</md-table-cell>
        <md-table-cell>{{patient.complaint}}</md-table-cell>
      </md-table-row>
    </md-table>

    
  </div>
</template>

<script>
import 'firebase/auth'
import { db } from '@/firebase';
import router from "@/router"

export default {
  name: 'Calendar',
  data: () => ({
      patients: [],
      id: '',
      date:'',
      time: 0,
      patient: '',
      email: '',
      complaint: ''
  }),
  computed: {
      user() {
          if (this.$store.state.user == 'null'){
              router.push('/login');
          }
          return this.$store.state.user;
      },
  },
  firestore() { 
      return {
          patients: db.collection('patients').orderBy('date')
      }
  },
  methods: {
      logout() {
      console.log('out of here');
      this.$store.dispatch('logout');
    },
  },
  mounted(){
      //db.collection('patients').doc('this.$route.params').get()
      //.then(response => {
        //  const info = response.data();
        //  this.date = info.date.ToString();
      //})
      //.catch(error => 
      //    alert(error.message));
  }
}


</script>

<style scoped>



</style>