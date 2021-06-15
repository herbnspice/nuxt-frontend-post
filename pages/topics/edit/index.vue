<template>
    <div class="container row">
        <div class="md-12">
            <h2> Update  a new topic </h2>
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
                    <button type="submit" class="btn btn-primary mt-3" >Update Topic</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            form: {
                title: null,
                body: null
            }
        }
    },
    methods:{
        async submit(){
            await this.$axios.$patch(`topics/${this.$route.params.id}`, this.form)
            this.$router.push('/topics')
        }
    },
    async asyncData( {$axios, params }){
        let { data } = await $axios.$get(`/topics/${params.id}`)
        let form = {
            title: data.title,
            body: data.posts[0].body
        }
        return { form }
    }
}
</script>