<template>
  <div class="md-layout container md-alignment-top-center">
    <h1 class="md-display-2 md-layout-item md-size-100">Scheduling Calendar</h1>

    <md-card class="md-layout-item md-size-40">
      <md-card-header class="md-title">New Appointment for {{user.name}} </md-card-header>
      <md-card-content>
        <form @submit.prevent="new_appointment">
            <h3>Date:</h3>
            <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates" md-immediately id="datepicker"/>
          <small>Office hours are 8am to 5pm</small>                    
          <md-field>
            <label for="times">Time:</label>            
            <md-select name="times" id="times" v-model="times">
              <md-option value="morning">Morning</md-option>
              <md-option value="noon">Noon</md-option>
              <md-option value="afternoon">Afternoon</md-option>
            </md-select>  
            
          </md-field>
              
          <md-field>
            <label>Complaint:</label>
            <md-textarea required v-model="complaint" placeholder="Specify the reason for your medical consult." cols="60" id="reason" />
          </md-field>

          <md-button class="md-raised md-accent" type="submit">Schedule</md-button>
          <md-button class="md-flat md-dense" type="reset">Reset Form</md-button>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

/* eslint-disable no-debugger */

import 'firebase/auth'
import firebase from 'firebase/app'
import { db } from '@/firebase';  //link to the firebase databank 
import router from "@/router"
//import { log } from 'util';

  export default {
    name: 'Appointments',
    data: () => ({
      patients: [],
      selectedDate: null,
      disabledDates: date => {
        const day = date.getDay()

        return day === 6 || day === 0
      },
      times: '',
      complaint: '',
      name: ''
    }),
    mounted() {
      
    },
    methods: {
      new_appointment() {
        var user = firebase.auth().currentUser;
        //push to database
        db.collection('patients').add({
          date: this.selectedDate,
          time: this.times,
          complaint: this.complaint,
          name: user.displayName,
          email: user.email
        });

        //vaciar
        this.selectedDate = null;
        this.times = '';
        this.complaint = '';

        //redirigir
        router.push('/:id/calendar')
      },
      logout() {
        console.log('out of here');
        this.$store.dispatch('logout');
      },
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    firestore() { 
        return {
            patients: db.collection('patients')
        }
    }
  }
</script>

<style scoped>

.md-field {
  padding-top:10px;
}
</style>