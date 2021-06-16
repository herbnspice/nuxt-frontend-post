<template>
    <div class="container">
        <div class="row align-start">
            <div class="col-12">
                <h2> {{ topic.title}}</h2>
            </div>
            <div class="col-12 px-4">
                <div class="row gx-2">
                    <div v-for="(content, index) in topic.posts" :key="index" class="col d-flex content shadow-sm m-2 p-1">
                        <div class="row">
                            <nuxt-link tag="h2" class="col" :to="{ name : 'topics-post', params : { id: content.id , topicid : topic.id  }}"> {{ content.body}}  </nuxt-link>
                            <div v-if="authenticated" class="col" >
                                <div v-if="user.data.id === content.user.id " class="float-end">
                                    <nuxt-link tag="button" :to="{ name : 'topics-post-edit', params : { id: content.id, topicid:topic.id  }}" class="btn btn-success  btn-sm">
                                        <i class="fa fa-edit"></i>

                                    </nuxt-link>
                                    <button @click.prevent="deletePost( content.id )" class="btn btn-danger  btn-sm">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <p class=" col-12 text-muted"> {{topic.created_at}} by {{ topic.user.name}} </p>
                        </div>
                    </div>
                    <div class="mt-5 ml-5" v-if="authenticated">
                        <form @submit.prevent="create">
                            <div class="form-group">
                                <textarea   v-model.trim="body" rows="10" class="form-control  mt-3" id="body" placeholder="Add a new post" />
                                <small id="emailHelp" class="form-text text-muted" v-if="errors.body"> {{ errors.body[0]}}</small>
                            </div>
                            <button class="btn btn-success mt-2 "> Add a new post </button>
                        </form>
                    </div>
                </div>
            </div>
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