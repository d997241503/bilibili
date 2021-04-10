<template>
  <div class="article">
    <nav-bar></nav-bar>
    <div class="video">
      <video controls="controls" :src="model.content"></video>
    </div>
    <div class="desc" v-if="model.hasOwnProperty('id')">
      <div class="info">
        <div>
          <span>活动</span>
          <span>“{{model.name}}”</span>
        </div>
        <div>
          <span>{{model.userinfo.name}}</span>
          <span>146.4万次播放</span>
          <span>5423弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div>
          <p @click="subClick" :class="{'icon-status':subStatus}">
            <van-icon name="like" class="icon" />关注
          </p>
          <p @click="collectClick" :class="{'icon-status':colStatus}">
            <van-icon name="star" class="icon" />收藏
          </p>
          <p>
            <van-icon name="share" class="icon" />分享
          </p>
          <p>
            <a href="#c-header"><van-icon name="comment" class="icon" />{{comment.length}}评论</a>
          </p>
        </div>
      </div>
    </div>
    <div class="item-detail-wrapper">
      <item-detail :categoryItem="Item" v-for="(Item,Index) in commend" :key="Index"></item-detail>
    </div>
    <comment-header ref="comment_header" class="c-header" id="c-header" :commentLength="comment.length" @publishComment='publishComment' />
    <comment-content ref="comment_content" class="c-content" v-if="comment.length" :commentData = 'comment'/>
  </div>
</template>

<script>
  import NavBar from '@/components/content/NavBar'
  import ItemDetail from '@/views/home/childcomp/ItemDetail'
  import CommentHeader from './childcomp/CommentHeader'
  import CommentContent from './childcomp/CommentContent'

  export default {
    name:'',
    components:{
      NavBar,
      ItemDetail,
      CommentHeader,
      CommentContent
    },
    data(){
      return{
        model:{},
        commend:[],
        comment:[],
        postComment:{
          article_id:'',
          comment_date:'',
          parent_id:null,
          comment_content:''
        },
        colStatus:false,
        subStatus:false
      }
    },
    created(){
      this.getArticleData(),
      this.getItemDetail(),
      this.getComment(),
      this.getColStatus()
    },
    methods:{
      //获取视频详情数据
      getArticleData(){
        this.$http.get('/article/' + this.$route.params.id).then(res => {
          this.model = res.data[0]
          this.getSubStatus()
        })
      },
      //获取推荐数据
      getItemDetail(){
        this.$http.get('/commend').then(res => this.commend = res.data)
      },
      //获取评论数据
      getComment(){
        this.$http.get('/comment/' + this.$route.params.id).then(res => this.comment = res.data)
      },
      //发表评论
      async publishComment(res){
        let date = new Date();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        let str = `${m}-${d}`;

        this.postComment.comment_content = res;
        this.postComment.comment_date = str;
        this.postComment.article_id = this.$route.params.id;

        //发送评论数据
        let result = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.postComment);
        if(result.status == 200){
          this.$toast('发送成功')
        }else{
          this.$toast(`${result.statusText}`)
        }

        this.$refs.comment_header.commentContent = '';
        this.postComment.parent_id = null;
        //重新获取评论数据
        this.getComment();        
      },
      //收藏被点击
      collectClick(){
        this.$http.post('/collection/' + localStorage.getItem('id'),{
          article_id:this.$route.params.id
        }).then(res => {
          this.colStatus = res.data.msg === '收藏成功' ? true : false
          this.$toast(res.data.msg)
        })
      },
      //获取收藏状态
      getColStatus(){
        this.$http.get('/collection/' + localStorage.getItem('id'),{
          params:{
            article_id:this.$route.params.id
          }
        }).then(res => {
          this.colStatus = res.data.success
        })
      },
      //关注被点击
      subClick(){
        this.$http.post('/sub_scription/' + localStorage.getItem('id'),{
          sub_id:this.model.userid
        }).then(res => {
          this.subStatus = res.data.msg === '关注成功' ? true : false
          this.$toast(res.data.msg)
        })
      },
      //获取关注状态
      getSubStatus(){
        this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
          params:{
            sub_id:this.model.userid
          }
        }).then(res => {
          this.subStatus = res.data.success
        })
      }
    },
    watch:{
      /**
       * 当前路由为/article,再次点击article时不会重新创建组件,所以不会调用
       * created钩子函数去请求数据,但这时$route会发生变化，可以监听$route的变化来
       * 手动的请求数据,重新渲染页面
       */
      $route(){
        this.getArticleData();
        this.getItemDetail(),
        this.getComment(),
        this.getColStatus()
      }
    },
    mounted(){
      this.$bus.$on('replyClick',res => this.postComment.parent_id = res)
    }
  }
</script>

<style scoped lang="less">
.article{
  .desc,.c-header{
    padding: 15px;
  }
  .c-content{
    padding: 0 15px 15px;
  }
}
.video video{
  width: 100%;
}
.desc{
  background-color: #fff;
  .info{
    div{
      margin-bottom: 14px;
    }
    div:nth-child(1){
      span:nth-child(1){
        padding: 5px;
        margin-right: 15px;
        background-color: #eee;
        color: #fb7299;
        border-radius: 10px;
        font-size: 13px;
      }
    }
    div:nth-child(2){
      color: #999;
      font-size: 13px;
      span{
        margin-right: 10px;
      }
      span:nth-child(1){
        color:black;
        margin-right: 15px;
      }
    }
    div:nth-child(3){
      display: flex;
      position: relative;
      color: #999;
      margin: 0;
      p{
        display: flex;
        align-items: center;
        margin-right: 20px;
        font-size: 13px;
        .icon{
          margin-right: 5px;
          font-size: 22px;
        }
      }
      p:nth-child(4){
        position: absolute;
        margin: 0;
        right: 0;
        a{
          display: flex;
          align-items: center;
          color: #999;
        }
      }
    }
  }
}
.item-detail-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.icon-status{
  color: #fb7299;
}
</style>