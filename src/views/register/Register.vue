<template>
  <div>
    <login-top midText="注册bilibili">
      <div slot="left" style="font-size:13px;" @click="$router.push('/')">首页</div>
      <div slot="right" style="font-size:3.611vw;" name="right" @click="$router.push('/login')">切换到登录</div>
    </login-top>
    <login-text style="margin:15px 0;" label="姓名" placeholder="请输入姓名" rule="^.{6,18}$" @imputChange="res => model.name = res" />
    <login-text label="账号" placeholder="请输入账号" rule="^.{6,18}$" @imputChange="res => model.username = res" />
    <login-text label="密码" placeholder="请输入6-18位密码" rule="^.{6,18}$" type="password" @imputChange="res => model.password = res" />
    <login-btn text="注册" @click.native="handleRegister" />
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
          name:'',
          username:'',
          password:''
        }
      }
    },
    methods:{
      async handleRegister(){
        let rulg = /^.{6,18}$/;
        if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
          let res = await this.$http.post('/register',this.model);
          this.$toast(res.data.msg);
          if(res.data.code == 200){
            localStorage.setItem('id',res.data.id);
            localStorage.setItem('token',res.data.objtoken);
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