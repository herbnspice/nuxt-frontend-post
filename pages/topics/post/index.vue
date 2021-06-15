<template>
    <div class="container row">
        <div class="md-12">
            <h2> {{ form.body }} </h2>
        </div>
        <nuxt-link tag="a" :to="{ name : 'topics-post-edit', params : { id: this.$route.params.id, topicid: this.$route.params.topicid  }}">Edit</nuxt-link>
        <button @click.prevent="deletePost( content.id )">Delete</button>

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
    },

}
</script>