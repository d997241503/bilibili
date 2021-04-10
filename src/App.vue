<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

  export default {
    name:'',
  }
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  p{
    margin: 0;
  }
</style>
