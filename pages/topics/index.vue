<template>
    <div class="container row">
         <div class="md-12">
            <h2> Latest Topics </h2>
        </div>
        <div class="md-12">
            <div v-for="(topic, index ) in topics" :key="index" class="bg-light mt-5 mb-5">
                <nuxt-link tag="h2" :to="{ name : 'topics-id', params : { id: topic.id }}"> {{ topic.title}}</nuxt-link>
                <div v-for="(content, index) in topic.posts" :key="index" class="ml-5 content">
                    {{ content.body}}
                    <p class="text-muted">
                    {{topic.created_at}} by {{ topic.user.name}}
                </p>
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
        }
    },
    async asyncData( {$axios}){
        let { data, links } = await $axios.$get('/topics')
            return { topics: data,
                    links }
    }
}
</script>