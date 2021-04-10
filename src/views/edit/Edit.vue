<template>
  <div class="edit">
    <nav-bar class="nav-bar"/>
    <div class="upload-file">
      <van-uploader class="uploader" :after-read="afterRead" preview-size="100vw" />
      <edit-banner left="头像">
        <img slot="right" :src="imgUrl" alt="">
      </edit-banner>
    </div>
    <edit-banner left="昵称" @click.native="showDialog('昵称','name')">
      <span slot="right">{{model.name}}</span>
    </edit-banner>
    <edit-banner left="账号">
      <span slot="right">{{model.username}}</span>
    </edit-banner>
    <edit-banner left="性别" @click.native="genderShow = true">
      <span slot="right">{{model.gender == 0 ? '女' : '男'}}</span>
    </edit-banner>
    <edit-banner left="个签" @click.native="showDialog('个签','user_desc')">
      <span slot="right">{{model.user_desc}}</span>
    </edit-banner>
    <div class="exit">
      <edit-banner middle="退出登录" @click.native="exitLogin"/>
      <edit-banner middle="返回空间" @click.native="$router.back()"/>
    </div>

    <van-dialog v-model="show" :title="dialogInfo.title" show-cancel-button @confirm="confirmClick(dialogInfo.confirmParams)" @cancel="cancelClick">
      <van-field v-model="content" placeholder="请输入内容" />
    </van-dialog>
    <van-action-sheet v-model="genderShow" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
  import NavBar from '@/components/content/NavBar'
  import EditBanner from './childcomp/EditBanner'

  export default {
    name:'',
    components:{
      NavBar,
      EditBanner
    },
    data(){
      return{
        model:{},
        show:false,
        genderShow:false,
        content:'',
        dialogInfo:{
          title:'',
          confirmParams:''
        },
        actions:[
          {name:'男',val:1},
          {name:'女',val:0}
        ]
      }
    },
    methods:{
      async getEditData(){
        let res = await this.$http.get('/user/' + localStorage.getItem('id'));
        this.model = res.data[0];
        if(this.model.user_img == null){
          this.imgUrl = `/default_img.jpg`
        }else{
          this.imgUrl = this.model.user_img
        }
      },
      //头像上传回调函数
      async afterRead(file){
        let formdata = new FormData();
        formdata.append('file',file.file);
        let res = await this.$http.post('/upload',formdata);
        this.model.user_img = res.data.url;
        this.userUpdate()
      },
      userUpdate(){
        let _this = this;
        this.$http.post('/update/' + localStorage.getItem('id'),this.model).then(res => {
          if(res.data.code == 200){_this.$toast('修改成功')}
        })
      },
      confirmClick(confirmParams){
        this.model[confirmParams] = this.content;
        this.userUpdate();
        this.content = '';
      },
      cancelClick(){
        this.content = '';
      },
      //显示修改框
      showDialog(title,confirmParams){
        this.dialogInfo.title = title;
        this.dialogInfo.confirmParams = confirmParams;
        this.show = true
      },
      //显示性别选择框
      onSelect(data){
        this.model.gender = data.val;
        this.userUpdate();
        this.genderShow = false
      },
      exitLogin(){
        localStorage.clear();
        this.$router.push('/login')
      }
    },
    created(){
      this.getEditData()
    }
  }
</script>

<style scoped>
.edit .nav-bar{
  margin-bottom: 10px;
}
.edit img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.edit .exit{
  margin-top: 20px;
}
.upload-file{
  position: relative;
  overflow: hidden;
}
.upload-file .uploader{
  position: absolute;
  opacity: 0;
}
</style>