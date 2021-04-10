<template>
  <div>
    <nav-bar/>
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="我也是有底线的~"
          @load="onLoad"
        >
          <div class="item-detail-wrapper">
            <item-detail :categoryItem="categoryItem" v-for="(categoryItem,categoryIndex) in item.list" :key="categoryIndex"></item-detail>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import NavBar from '@/components/content/NavBar'
  import ItemDetail from './childcomp/ItemDetail'
  export default {
    name:'Home',
    components:{
      NavBar,
      ItemDetail
    },
    data(){
      return{
        //和导航组件进行了双向绑定,点击对应标签会改变active的值
        active:-1,
        category:[]
      }
    },
    created(){
      this.getCategory()
    },
    methods:{
      async getCategory(){
        let res = await this.$http.get('/category');
        this.category = res.data;
        //对数据进行改造
        this.category = this.category.map(item => {
          /*
            item就是每一个分类对象，如果直接使用 item.list = [] 设置属性，将
            导致item的list属性无法做到响应式，即当list的元素变化页面不会立即响应(注意，如果直接在data中就定义了对象属性，这些属性可以做到响应式)，
            这时候需要使用Vue.set或this.$set(obj,property,value)去设置根级别的响应
          */
          this.$set(item,'list',[])
          item.page = 0;
          item.pageSize = 10;
          item.finished = false;
          item.loading = false;
          return item
        })
      },
      getCategoryItem(){
        let category = this.currentCategory;
        this.$http.get('/detail/' + category._id,{
          params:{
            page:category.page,
            pagesize:category.pageSize
          }
        }).then(res => {
          category.list.push(...res.data);
          category.loading = false;
          if(res.data.length < category.pageSize){
            category.finished = true
          }
        })
      },
      onLoad(){
        this.currentCategory.page++;
        this.getCategoryItem()
      }
    },
    computed:{
      currentCategory(){
        return this.category[this.active]
      }
    },
    watch:{
      active(){
        if(!this.currentCategory.list.length){
          this.getCategoryItem()
        }
      }
    }
  }
</script>

<style scoped>
.item-detail-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>