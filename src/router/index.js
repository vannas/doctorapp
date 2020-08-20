import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app'
import Home from '@/components/Home.vue';
import Appointments from '@/components/Appointments.vue';
import Calendar from '@/components/Calendar.vue'
import Error from '@/components/Error.vue';


Vue.use(VueRouter);

let router= new VueRouter ({
    routes: [
        {
            path: '/',
            component: Home,            
        },
        {
            path: '/schedule',
            component: Appointments,
            meta:{
                requiresAuth: true
            },
        },
        {
            path: '/:id/calendar',
            component: Calendar,
            meta:{
                requiresAuth: true
            },
        },
        {
            path: '*',
            component: Error
        }
    ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    //let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    console.log('Usuario actual', currentUser);
    
    //if (requiresAuth && !currentUser) next('/')
    if (to.meta.requiresAuth && currentUser == null){
        next('/')
    } else {
    next()
    }
})

export default router;