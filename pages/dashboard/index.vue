<template>
    <div class="container text-start"> 
        <div class="row">
            <div class="md-12">
                <h2> Create a new topic </h2>
            </div>
            <div class="md-6">
                <div class="card">
                    <div class="card-body">
                    <form @submit.prevent="submit">
                        <div class="form-group  mt-3">
                            <label for="title"> <strong>  Topic Title </strong>  </label>
                            <input type="title" v-model="form.title" class="form-control  mt-3" id="title" aria-describedby="emailHelp" placeholder="Enter email" autofocus>
                            <small id="emailHelp" class="form-text text-muted" v-if="errors.title"> {{ errors.title[0]}}</small>
                        </div>
                        <div class="form-group  mt-3">
                            <label for="body" > <strong> Title Body</strong>   </label>
                            <textarea   v-model.trim="form.body" rows="10" class="form-control  mt-3" id="body" placeholder="body" />
                            <label class="form-check-label" for="exampleCheck1" v-if="errors.body">{{ errors.body[0]}} </label>

                        </div>
                        <button type="submit" class="btn btn-primary mt-3" >Create Topic</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    middleware: ['auth'],
    data(){
        return {
            form: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        async submit(){
            await this.$axios.$post('topics', this.form)
            this.$router.push('/')

        }
    }
}
</script>