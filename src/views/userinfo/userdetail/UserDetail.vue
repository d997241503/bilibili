<template>
  <div class="user-detail">
    <div class="block-1">
      <img :src="imgUrl" alt="">
      <div>
        <div class="user-data">
          <p>
            <span>0</span>
            <span class="data-text">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="data-text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="data-text">获赞</span>
          </p>
        </div>
        <div class="edit-btn" @click="$router.push('/edit')">编辑资料</div>
      </div>
    </div>
    <div class="block-2">
      <h2>{{userInfo.username}}
        <img src="@/assets/sex.png" alt="">
      </h2>
      <p>
        <span v-if="userInfo.user_desc">{{userInfo.user_desc}}</span>
        <span v-else>这个人很神秘，什么没有写</span>
        <span>收起</span>
      </p>
      <span>uid:{{userInfo.id}}</span>
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['userInfo','imgUrl']
  }
</script>

<style scoped lang="less">
.user-detail{
  padding: 1.389vw 4.167vw;
  background-color: #fff;
  .block-1{
    display: flex;
    img{
      width: 23.611vw;
      height: 23.611vw;
      margin-right: 11.111vw;
      border-radius: 50%;
    }
    >div{
      flex: 1;
    }
    .user-data{
      display: flex;
      align-items: center;
      p{
        flex: 1;
        display: flex;
        text-align: center;
        flex-direction: column;
        font-size: 3.611vw;
        .data-text{
          color: #999;
        }
      }
      p:nth-child(1),p:nth-child(2){
        border-right: 0.278vw solid #ccc;
      }
    }
    .edit-btn{
      margin-top: 2.778vw;
      padding: 1.389vw 0;
      text-align: center;
      border: 0.278vw solid #fb7299;
      border-radius: 1.389vw;
      color: #fb7299;
      font-size: 4.444vw;
    }
  }
  .block-2::before{
    content: '';
    display: table;
  }
  .block-2{
    h2{
      font-weight: 400;
      font-size: 6.667vw;
      img{
        height: 5.556vw;
        position: relative;
        top: 0.556vw;
      }
    }
    p{
      display: flex;
      justify-content: space-between;
      font-size: 4.444vw;
      span:nth-child(1){
        color: #999;
      }
      span:nth-child(2){
        color: rgb(0, 149, 199);
      }
    }
    >span{
      display: inline-block;
      font-size: 3.333vw;
      color: #555;
      background-color: #eee;
      padding: 0.556vw 0.833vw;
      margin: 2.222vw 0;
      border-radius: 0.833vw;
    }
  }
}

</style>