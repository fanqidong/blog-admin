<template>
  <div id="app">
    <div>
      <p>
        If iView is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <Button type="warning" @click=handleClick>Button</Button>
      <Icon type="ios-lock-outline"></Icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  methods:{
     handleClick(){
     console.log(11)
          this.$Message.info('这是一条普通的提醒');
     }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  p{
    color:red;
  }
}
</style>
