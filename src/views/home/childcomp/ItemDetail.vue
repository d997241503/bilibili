<template>
  <div class="item-detail" @click="$router.push(`/article/${categoryItem.id}`)">
    <div class="img-wrapper">
      <img :src="categoryItem.img" alt="">
      <div class="bottom-wrapper">
        <span class="left">
        <van-icon style="margin-right:3px" name="video-o" />
        {{categoryItem.id}}
        </span>
        <span class="right">
          <van-icon style="margin-right:3px" name="comment-o" />
          {{categoryItem.commentlen}}
        </span>
      </div>
    </div>
    <p>{{categoryItem.name}}</p>
  </div>
</template>

<script>

  export default {
    name:'',
    data(){
      return{

      }
    },
    props:['categoryItem'],
    methods:{

    }
  }
</script>

<style scoped lang="less">
.item-detail{
  width: 45%;
  margin: 5px 0;
  img{
    width: 100%;
  }
  p{
    font-size: 14px;
  }
  .img-wrapper{
    position: relative;
    color: #fff;
    span{
      display: flex;
      align-items: center;
    }
    .left{
      position: absolute;
      left: 5px;
      bottom: 5px;
    }
    .right{
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
    .bottom-wrapper{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 20%;
      background: linear-gradient(to bottom,rgba(200,200,200,.3),rgba(0,0,0,.6));
    }
  }
}
</style>