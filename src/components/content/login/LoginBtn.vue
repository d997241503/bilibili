<template>
  <div class="wrapper">
    <div class="login-btn">
      {{text}}
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['text'],
    methods:{

    }
  }
</script>

<style scoped>
  .wrapper{
    padding: 2.778vw 2.778vw;
  }
  .login-btn{
    height: 12.5vw;
    font-size: 4.444vw;
    background-color: #ff9db5;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.25vw;
  }
</style>