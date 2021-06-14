<template>
    <div class="container text-start"> 
        <div class="row">
            <div class="md-12">
                    <h2> Login </h2>
            </div>
            <div class="md-6">
                <div class="card">
                    <div class="card-body">
                    <form @submit.prevent="submit">
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" v-model="form.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" autofocus>
                            <small id="emailHelp" class="form-text text-muted" v-if="errors.email"> {{ errors.email[0]}}</small>
                        </div>
                        <div class="form-group">
                            <label for="password" >Password</label>
                            <input type="password"  v-model.trim="form.password" class="form-control" id="password" placeholder="Password">
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1" v-if="errors.password">{{ errors.password[0]}} </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                    <p> Dont have an account? <nuxt-link to="/register"> Register here</nuxt-link> </p>
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
            form : {
                email: '',
                password: ''
            }
        }
    },
    methods:{
        async submit(){
            try{
                await this.$auth.loginWith("local", {
                    data: this.form
                })
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