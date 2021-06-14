<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <nuxt-link class="navbar-brand" to="/">Frontend</nuxt-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <nuxt-link to="/topics" class='nav-link' > Topics </nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link to="/dashboard" 
            class='nav-link'> Create </nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto" v-if="authenticated">
        <li class="nav-item">
          <nuxt-link to="/Logout" 
            class='nav-link'>
              <p> Welcome {{ user.data.name }} </p> 
          </nuxt-link> 
            
        </li>
         <li class="nav-item">
            <a href="#"
            class='nav-link' @click.prevent="onLogout">Logout </a>
        </li>
      </ul>
       <ul class="navbar-nav ml-auto" v-if="!authenticated">
             <li class="nav-item">
            <nuxt-link to="/login" 
            class='nav-link'>Login </nuxt-link>
        </li>
         <li class="nav-item">
            <nuxt-link to="/register" class='nav-link'>Register </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  middleware: ['guest'],
  methods:{
     onLogout(){
      this.$auth.logout()
      this.$router.push('/login') 
    }
  }
}
</script>