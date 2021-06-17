<template>
    <div class="container justify-content-start text-start align-items-start p-3">
        <div class="row align-start">
         <div class="md-12">
            <h2> Latest Topics </h2>
        </div>
        <div class="md-6">
            <div v-for="(topic, index ) in topics" :key="index" class="bg-light mt-5 mb-5 p-4 rounded-3 shadow-sm " >
                <nuxt-link tag="h2" :to="{ name : 'topics-id', params : { id: topic.id }}" class=" fs-5 fw-bold"> {{ topic.title}} </nuxt-link>
                <div v-for="(content, index) in topic.posts" :key="index" class="ms-3 content bg-secondary rounded-3 p-2 mt-2 ">
                    <p class="m-0 fs-5 fw-bold"> {{ content.body}}  </p>
                    <p class="text-light fs-6 m-0">
                    {{topic.created_at}} by {{ topic.user.name}}
                </p>
                <div class="btn btn-outline-primary fa fa-thumbs-up float-end" @click="likePost( topic.id , content )"> 
                    <span class="badge"> {{ content.like_count}}</span>
                </div>
                </div>
            </div>
        </div>
        <div class="md-12">
            <ul class="pagination justify-content-center">
                <li v-for="(key, value) in links" :key="value">
                    <a href="" @click.prevent="loadMore(key)" class="page-link">{{ value }}</a>
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            topics: [],
            links: []
        }
    },
    methods: {
       async loadMore( key ){
            let {data, links } = await this.$axios.$get(key)
            this.topics  = {...this.$title, ...data }
            this.links = links
        },
        async likePost( topicId, content){
            const userFormVueX = this.$store.getters["user"]
            console.log( userFormVueX, content.users )
            if( userFormVueX ){
                if( userFormVueX.data.id === content.user.id ){
                    alert('you cant like your own post')
                }
                if( content.users){
                    if( content.users.some( userFormVueX.data.id )) {
                         alert('you already liked  this  post')
                    }
                 } else {
                        await this.$axios.post(`/topics/${topicId}/posts/${content.id}/likes`)
                        let { data, links } = await this.$axios.$get(`/topics`)

                        this.topics  = data
                        this.links  = links
                    }
            } else {
                alert('Please login ')
                this.$router.push('/')
            }
        }
    },
    async asyncData( {$axios}){
        let { data, links } = await $axios.$get('/topics')
            return { topics: data,
                    links }
    }
}
</script>