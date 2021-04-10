<template>
  <div class="edit-banner">
    <span>{{left}}</span>
    <span>{{middle}}</span>
    <span><slot name="right"></slot></span>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['left','middle']
  }
</script>

<style scoped>
.edit-banner{
  padding: 15px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.edit-banner>span:nth-child(1){
    color: #666;
}
</style>