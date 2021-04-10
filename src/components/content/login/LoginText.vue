<template>
  <div>
    <van-field v-model="text" :label="label" :placeholder="placeholder" :type="type" :rule="rule" @input="handleRule" />
  </div>
</template>

<script>

  export default {
    name:'',
    data(){
      return {
        text:null
      }
    },
    props:['label','placeholder','type','rule'],
    methods:{
      handleRule(){
        let rule = new RegExp(this.rule);
        if(rule.test(this.text)){
          this.$emit('imputChange',this.text)
        }
      }
    }
  }
</script>

<style scoped>

</style>