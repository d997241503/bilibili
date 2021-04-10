<template>
  <div class="user-info">
    <nav-bar/>
    <img src="@/assets/bannerTop_new.png" alt="" class="backimg">
    <user-detail :userInfo="model" :imgUrl="imgUrl"/>
    <div class="video">
      <span>动态</span>
      <span>视频</span>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/content/NavBar'
  import UserDetail from './userdetail/UserDetail'

  export default {
    name:'',
    components:{
      NavBar,
      UserDetail
    },
    data(){
      return {
        model:{},
        imgUrl:'',
        publicPath:process.env.BASE_URL
      }
    },
    methods:{
      getUserInfo(){
        this.$http.get('/user/' + localStorage.getItem('id')).then(res => {
          this.model = res.data[0];
          if(this.model.user_img == null){
            this.imgUrl = `${this.publicPath}default_img.jpg`
          }else{
            this.imgUrl = this.model.user_img
          }
        })
      }
    },
    created(){
      this.getUserInfo()
    }
  }
</script>

<style scoped lang="less">
.user-info{
  .backimg{
    width: 100%;
    height: 27.778vw;
  }
  .video{
    margin-top: 1.389vw;
    background-color: #fff;
    padding-left: 1.389vw;
    span{
      display: inline-block;
      padding: 2.778vw 2.778vw;
      font-size: 4.444vw;
      color: #555;
    }
  }
}
</style>