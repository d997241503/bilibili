<template>
  <div class="nav-bar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" @click="$router.push('/')">
    </div>
    <div>
      <p>
        <span>请输入内容</span>
        <van-icon class="icon" name="search" />
      </p>
    </div>
    <div>
      <img :src="imgUrl" alt="" @click="toUserInfo">
      <p>下载APP</p>
    </div>
  </div>
</template>

<script>
  
  export default {
    name:'',
    data(){
      return{
        imgUrl:''
      }
    },
    created(){
      if(localStorage.getItem('id')&&localStorage.getItem('token')){
        this.$http.get('/user/' + localStorage.getItem('id')).then(res => {
          this.model = res.data[0];
          if(this.model.user_img == null){
            this.imgUrl = '/default_img.jpg'
          }else{
            this.imgUrl = this.model.user_img
          }
        })
      }else{
        this.imgUrl = '/default_img.jpg'
      }
    },
    methods:{
      toUserInfo(){
        if(localStorage.getItem('id')&&localStorage.getItem('token')){
          this.$router.push('/userinfo')
        }else{
          this.$router.push('/login');
          this.$toast('请先登录')
        }
      }
    }
  }
</script>

<style scoped>
.nav-bar{
  display: flex;
  height: 12.5vw;
  background-color: #fff;
}
.nav-bar .logo{
  text-align: center;
  width: 33.333vw;
}
.nav-bar .logo img{
  width: 80%;
}
.nav-bar div:nth-child(2){
  flex: 1;
  display: flex;
  align-items: center;
}
.nav-bar div:nth-child(2) p{
  position: relative;
  height: 6.944vw;
  width: 90%;
  padding-left: 6.944vw;
  border-radius: 3.472vw;
  background-color: #f4f4f4;
}
.nav-bar div:nth-child(2) p span{
  color: #aaa;
  font-size: 3.889vw;
  line-height: 6.944vw;
}
.nav-bar div:nth-child(2) p .icon{
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  left: 1.389vw;
  color: #aaa;
}
.nav-bar div:nth-child(3){
  display: flex;
  align-items: center;
  margin: 0 1.944vw;
}
.nav-bar div:nth-child(3) img{
  width: 6.667vw;
  height: 6.667vw;
  border-radius: 50%;
}
.nav-bar div:nth-child(3) p{
  margin: 0 1.944vw;
  padding: 0.833vw 2.222vw;
  background-color: #fb7299;
  color: #fff;
  border-radius: 1.389vw;
  font-size: 3.889vw;
}
img[src=""],img:not([src]){    
  opacity:0;
}
</style>