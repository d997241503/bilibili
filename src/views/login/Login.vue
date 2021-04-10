<template>
  <div>
    <login-top midText="登录bilibili">
      <div slot="left" style="font-size:13px;" @click="$router.push('/')">首页</div>
      <div slot="right" style="font-size:13px;" @click="$router.push('/register')">切换到注册</div>
    </login-top>
    <login-text style="margin:15px 0;" label="账号" placeholder="请输入账号" rule="^.{6,18}$" @imputChange="res => model.username = res" />
    <login-text label="密码" placeholder="请输入6-18位密码" rule="^.{6,18}$" type="password" @imputChange="res => model.password = res" />
    <login-btn text="登录" @click.native="handleLogin" />
  </div>
</template>

<script>
  import LoginTop from '@/components/content/login/LoginTop'
  import LoginText from '@/components/content/login/LoginText'
  import LoginBtn from '@/components/content/login/LoginBtn'

  export default {
    name:'',
    components:{
      LoginTop,
      LoginText,
      LoginBtn
    },
    data(){
      return{
        model:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      async handleLogin(){
        let rulg = /^.{6,18}$/;
        if(rulg.test(this.model.username) && rulg.test(this.model.password)){
          let res = await this.$http.post('/login',this.model);
          this.$toast(res.data.msg);
          if(res.data.code == 200){
            localStorage.setItem('id',res.data.id);
            localStorage.setItem('token',res.data.token);
            setTimeout(() => {
              this.$router.push('/userinfo')
            }, 1000);
          }
        }else{
          this.$toast('格式不正确，请重新输入')
        }
      }
    }
  }
</script>

<style scoped>

</style>