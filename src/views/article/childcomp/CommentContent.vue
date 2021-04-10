<template>
  <div class="comment-content">
    <div class="comment-class-one" v-for="(item,index) in realCommentData" :key="index">
      <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
      <img v-else src="/default_img.jpg" alt="">
      <div class="comment-class-one-main">
        <p>
          <span>{{item.userinfo && item.userinfo.name}}</span>
          <span>{{item.comment_date}}</span>
        </p>
        <div class="comment-body">
          {{item.comment_content}}
          <span @click="$bus.$emit('replyClick',item.comment_id)">回复</span>
        </div>
        <comment-class-two class="comment-class-two" :childItems="item.child"></comment-class-two>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentClassTwo from './CommentClassTwo'
  export default {
    name:'',
    props:['commentData'],
    components:{
      CommentClassTwo
    },
    data(){
      return{
        realCommentData:[]
      }
    },
    methods:{
      //用递归函数改造评论的数据结构
      changeCommentData(pItem){
        let arr = [];
        for(let item of this.commentData){
          if(item.parent_id == pItem){
            item.child = this.changeCommentData(item.comment_id)
            arr.push(item)            
          }
        }
        return arr
      }
    },
    created(){
      this.realCommentData = this.changeCommentData(null)
    },
    watch:{
      //监听评论数据的变化,并重新渲染页面
      commentData(){
        this.realCommentData = this.changeCommentData(null)
        
        //复杂的嵌套结构Vue不会响应刷新，可以用$forceUpdate()强制更新视图和数据，触发updated生命周期
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped lang="less">
.comment-content{
  .comment-class-one{
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .comment-class-one-main{
      flex: 1;
      p{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 13px;
        color: #777;
      }
      .comment-body{
        position: relative;
        span{          
          position: absolute;
          right: 0;
          color: #fb7299;
          font-size: 13px;
        }
      }
    }
  }
  .comment-class-two{
    margin-top: 10px;
  }
}
</style>