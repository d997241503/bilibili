<template>
    <div class="comment-header">
      <p>
        <span>评论</span>
        <span>({{commentLength}})</span>
      </p>
      <div class="comment-publish">
        <img src="/default_img.jpg" alt="">
        <input ref="input" type="text" v-model="commentContent" placeholder="说点什么吧">
        <button @click="handlePublish">发表</button>
      </div>
    </div>
</template>

<script>

  export default {
    name:'',
    props:['commentLength'],
    data(){
      return{
        commentContent:''
      }
    },
    methods:{
      handlePublish(){
        if(!localStorage.getItem('id') || !localStorage.getItem('token')){
          this.$toast('请先登录')
        }else if(this.commentContent == ''){
          this.$toast('内容不能为空')
        }else{
          this.$emit('publishComment',this.commentContent)
        }
      }
    },
    mounted(){
      this.$bus.$on('replyClick',res => {
        this.$refs.input.focus()
      })
    }
  }
</script>

<style scoped lang='less'>
.comment-header {
  p{
    padding: 10px 0;
    span:nth-child(2){
      color: #999;
      margin-left: 10px;
    }
  }
  .comment-publish{
    display: flex;
    img{
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    input{
      outline: none;
      border: 0;
      padding: 5px 8px;
      margin-left: 10px;
      border-radius: 14px;
      background-color: #e9e9e9;
    }
    button{
      outline: none;
      border: 0;
      padding: 0 10px;
      margin-left: 10px;
      background-color: #fb7299;
      color: #fff;
      font-size: 14px;
      border-radius: 14px;
    }
  }
}
</style>