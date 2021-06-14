<template>
    <div class="container">
       <h2> {{ topic.title}}</h2>
        <div v-for="(content, index) in topic.posts" :key="index" class="ml-5 content">
            {{ content.body}}
            <p class="text-muted">
            {{topic.created_at}} by {{ topic.user.name}}
        </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            topic : {}
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