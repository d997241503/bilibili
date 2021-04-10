<template>
  <div>
    <div class="class-two" v-for="(item,index) in childItems" :key="index">
      <div class="comment-header">
        <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
        <img v-else src="/default_img.jpg" alt="">
        <div>
          <p>
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}}</span>
          </p>
        </div>
      </div>
      <div class="comment-body">
        <span v-if="reply" style="color:#478ef0;font-size:13px">
          回复 {{item.parent_user_info.name}}:
        </span>
        {{item.comment_content}}
        <span class="reply" @click="$bus.$emit('replyClick',item.comment_id)">回复</span>
      </div>
      <comment-class-two class="comment-class-two" :childItems="item.child" :reply="true"></comment-class-two>
    </div>
  </div>
</template>

<script>

  export default {
    name:'CommentClassTwo',
    props:['childItems','reply']
  }
</script>

<style scoped lang="less">
.class-two{
  padding: 20px 0 0;
  img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .comment-header{
    position: relative;
    display: flex;
    margin-bottom: 10px;
    >div{
      // width:calc(100% - 65px);
      margin-left: 10px;
      p{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #777;
        span:nth-child(2){
          position: absolute;
          right: 20px;
        }
      }
    }
  }
  .comment-body{
    position: relative;
    .reply{
      position: absolute;
      right: 20px;
      color: #fb7299;
      font-size: 13px;
    }
  }
}
</style>