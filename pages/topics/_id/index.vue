<template>
    <div class="container">
        <h2> {{ topic.title}}</h2>
        <div v-for="(content, index) in topic.posts" :key="index" class="ml-12 content">
            <nuxt-link tag="h2" :to="{ name : 'topics-post', params : { id: content.id , topicid : topic.id  }}"> {{ content.body}}  </nuxt-link>
            <div v-if="authenticated">
                <div v-if="user.data.id === content.user.id ">
                    <nuxt-link tag="a" :to="{ name : 'topics-post-edit', params : { id: content.id, topicid:topic.id  }}">Edit</nuxt-link>
                    <button @click.prevent="deletePost( content.id )">Delete</button>
                </div>
            </div>
            <p class="text-muted"> {{topic.created_at}} by {{ topic.user.name}} </p>
        </div>
        <div class="mt-5 ml-5" v-if="authenticated">
            <form @submit.prevent="create">
                <div class="form-group">
                    <textarea   v-model.trim="body" rows="10" class="form-control  mt-3" id="body" placeholder="body" />
                    <small id="emailHelp" class="form-text text-muted" v-if="errors.body"> {{ errors.body[0]}}</small>
                </div>
                <button class="btn btn-outline-primary"> Add a new post </button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            topic : {},
            body: ''
        }
    },
    methods:{
        async create(){
            await this.$axios.post(`/topics/${this.$route.params.id}/posts`, { body : this.body })
            this.$router.push('/topics')
        },
        async deletePost( id ){
             await this.$axios.delete(`/topics/${this.$route.params.id}/posts/${id}` )
            this.$router.push('/topics')
        }
    },
    async asyncData( {$axios, params} ){
        const { data } = await $axios.$get(`/topics/${params.id}`)
        return{ 
            topic: data
        }
    }
}
</script>