<template>
  <loading ref="loading"/>
  <router-view></router-view>
</template>

<script>
import loading from './components/Loading.vue'
export default {
  name: 'App',
  components: {
    loading
  },
  methods:{
    check_loading(){
      let timer = setInterval(()=>{
        if(document.readyState === "complete"){
          clearInterval(timer);
          this.$refs.loading.conout();
        }
      },300)
    }
  },
  mounted(){
    this.check_loading();
    this.$router.beforeEach((to,from,next) => {
      this.$refs.loading.conin(next);
    })
  }
}
</script>

<style>
</style>
