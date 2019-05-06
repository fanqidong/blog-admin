<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods:{
     
  },
  mounted(){
    this.$router.push({
      name:'Admin'
    })
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
  min-height: 100vh;
}
</style>
