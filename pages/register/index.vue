<template>
    <div class="container text-start"> 
        <div class="row">
            <div class="md-12">
                <h2> Register </h2>
            </div>
            <div class="md-6">
                <div class="card ">
                    <div class="card-body flex-row ">
                    <form @submit.prevent="submit()">
                         <div class="form-group">
                            <label for="email" class="text-left">Full name </label>
                            <input type="fullname" v-model="form.name" class="form-control" id="fullname" aria-describedby="emailHelp" placeholder="Enter full name">
                            <small id="emailHelp" class="form-text text-muted" v-if="errors.name"> {{ errors.name[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" v-model="form.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted" v-if="errors.email">   {{ errors.email[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password"  v-model="form.password" class="form-control" id="password" placeholder="Password">
                            <small id="emailHelp" class="form-text text-muted" v-if="errors.password">  {{ errors.password[0] }}</small>

                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    middleware: ['guest'],
    data(){
        return {
            form :{
                email: '',
                password: '',
                name: ''
            }
        }
    },
    methods:{
        async submit(){
            try{
               await this.$axios.$post('register', this.form)
               await this.$auth.loginWith("local", {
                    data: {
                        email: this.form.email,
                        password: this.form.password
                    }
                });
                this.$router.push({
                    path : this.$route.query.redirect  || '/dashboard'
                })
            } catch( error ){
                console.log( error  )
            }
        }
    }
}
</script>