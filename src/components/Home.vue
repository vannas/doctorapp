<template>

<div class="md-layout container md-alignment-top-space-around">
    
    <div class="error large-layout-item accent" v-if="error != null"> 
        <md-icon>error_outline</md-icon>
        Error detected.             {{error}}
        <md-icon>error_outline</md-icon>
    </div>
    
    <div class="md-layout-item md-card md-size-35">
        <div class="md-card-title md-subheading"><h4><md-icon>edit</md-icon> Register</h4></div>

        <div class="md-card-content">            
            <form id="register" @submit.prevent="register">  
                <md-field>          
                    <label for="register_nom" class="grey-text validate">Patient Name:</label>
                    <md-input type="text" id="register_nom" class="validate" required v-model="register_username"/>
                </md-field>
                
                <md-field>
                    <label for="register_mail" class="grey-text validate">E-mail:</label>
                    <md-input type="email" id="register_mail" class="validate" required v-model="register_email"/>
                </md-field>
                
                <md-field>
                    <label for="register_pass" min="8" class="grey-text validate">Password:</label>
                    <md-input type="password" id="register_pass" class="validate" required v-model="register_pass"/>
                </md-field>
                
                <md-field>
                    <label for="register_confirm" min="8" class="grey-text validate">Confirm password:</label>
                    <md-input type="password" id="register_confirm" class="validate" required v-model="register_confirm"/>
                </md-field>

                <md-button class="md-raised md-dense md-accent nice" type="submit" name="action">Register <md-icon>near_me</md-icon></md-button>
                
            </form>
        </div>
    </div>
    
    <div class="md-layout-item md-card md-size-40">
        <div class="md-card-title md-subheading"><h4><md-icon>contacts</md-icon> Sign in</h4></div>
        
        <div class="md-card-content">            
            <form id="login" @submit.prevent="login">
                <md-field>   
                    <md-icon>email</md-icon> <label for="email">Email:</label> 
                    <md-input id="email" min="8" type="email" class="validate" required v-model="login_email"/>
                </md-field>

                <md-field>
                    <md-icon>lock</md-icon> <label for="login_pass" min="8" class="grey-text validate">Password:</label>
                    <md-input type="password" id="login_pass" class="validate" required v-model="login_pass"/>
                </md-field>
                    
                <md-button class="md-raised md-dense md-accent nice" type="submit" name="action">Login <md-icon>near_me</md-icon></md-button>
            </form>
        </div>
    </div>

    <div id="steps" class="md-layout-item md-card md-size-40">
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>How to Book Your Appointment</md-dialog-title>
            
            <md-tabs md-dynamic-height>
                <md-tab md-label="Step 1">
                    <p>Welcome to Dr. Brenner's Online Booking Service. Doctor Martin Brenner has been practicing medicine for the past 30 years in service of his community, and he's back to working full time on his private practice. Given the high demand for his time, the staff at his clinic has established an automatic system to schedule his work week efficiently.</p>
                    <p> If this is your first visit, please register your information in the appropiate form to proceed. If you have scheduled a time with us before, sign in directly to access Dr. Brenner's calendar. You will be redirected to the scheduling page to book your next appointment.</p>
                </md-tab>

                <md-tab md-label="Step 2">
                    <p>Once you have signed in, click on the calendar icon and select an available date. Choose the time slot that best suits your needs, and write down the cause of your consult. Click on the Confirm button once you have completed the form.</p>
                </md-tab>

                <md-tab md-label="Step 3">
                    <p>Congratulations, Dr. Brenner will see you on the date and time you selected. Remember to arrive at least 30 minutes before your appointment to fill in the registration forms. If you are unable to attend, you may cancel the appointment on the same scheduling page, or inform us directly at 812-200-0020.</p>
                </md-tab>
            </md-tabs>
    
            <md-dialog-actions>
                <md-button class="md-accent" @click="showDialog = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
        <p class="md-body"> <md-icon>warning</md-icon> Is this your first visit?</p> 
        <p class="md-caption">We have a simple step by step guide on how to book your next appointment.</p>
        <md-button class="md-primary md-raised" @click="showDialog = true">Instructions</md-button>
    </div>
</div>
</template>

<script>

export default {
    name: 'Home',
    data() {
        return {
        //variables steps
        showDialog: false,
        //variables login
        login_email: '',
        login_pass: '',
        //variables registro
        register_username: '',
        register_email: '',
        register_pass: '',
        register_confirm: ''
        }
    },
    computed: {
        error() {
            return this.$store.state.error;
        },
        user() {
        return this.$store.state.user;
        }
    },
    methods: {
        login() {
            console.log('login');
            console.log(this.login_email);
            
            const datos_log={email: this.login_email, password: this.login_pass};
            this.$store.dispatch('login', datos_log);
        },
        register() {
            const confirm= document.getElementById('register_confirm');
            confirm.setCustomValidity('');

            //Chequear confirmación de contraseña
            if (this.register_pass != this.register_confirm) {
                console.log(this.register_pass, this.register_confirm);
                confirm.setCustomValidity('Check your spelling, your passwords don´t match');
                return
            }
            
            //ingresar usuario
            const datos= {email: this.register_email, password: this.register_pass, name: this.register_username};
            this.$store.dispatch('register', datos);
        }
    }   

}
</script>

<style scoped>

.error {
    font-size: 24px;
    margin:0.5rem 0.5rem;
}

.md-card{
    margin-top:3em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#steps{
    margin-left:47.5%;
    margin-top: -8%;
}
</style>