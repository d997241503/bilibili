<template>
  <div class="login-top">
    <div>
      <slot name="left"></slot>
    </div>
    <div>{{midText}}</div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['midText']
  }
</script>

<style scoped>
  .login-top{
    display: flex;
    background-color: #fff;
    height: 12.5vw;
    font-size: 4.444vw;
  }
  .login-top div{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
</style>