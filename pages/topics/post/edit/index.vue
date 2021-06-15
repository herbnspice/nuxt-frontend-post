<template>
    <div class="container row">
       
        <div class="md-6">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="submit">
                        <div class="form-group  mt-3">
                            <label for="title"> <strong>  Post Body </strong>  </label>
                            <input type="title" v-model="form.body" class="form-control  mt-3" id="title" aria-describedby="emailHelp" placeholder="Enter email" autofocus>
                            <small id="emailHelp" class="form-text text-muted" v-if="errors.body"> {{ errors.body[0]}}</small>
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
                body: null
            }
        }
    },
    methods:{
        async submit(){
            await this.$axios.$patch(`/topics/${this.$route.params.topicid}/posts/${this.$route.params.id}`, { body : this.form.body })
            this.$router.push('/topics')
        },
        async deletePost( id ){
             await this.$axios.delete(`/topics/${this.$route.params.topicid}/posts/${id}` )
            this.$router.push('/topics')
        }
    },
    async asyncData( {$axios, params }){
        let { data } = await $axios.$get(`/topics/${params.topicid}/posts/${params.id}`)
        let form = {
            body: data.body,
        }
        return { form }
    }
}
</script>