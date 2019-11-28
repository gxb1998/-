<template>
  <div style="margin-bottom:.8rem;">
    <header>
      <img src="../assets/images/banner0_01.jpg" alt />
      <img src="../assets/images/indexbanner_02.jpg" alt />
      <div class="box">
        <input type="text" v-model="value" placeholder="请输入商品名称" />
        <van-icon size=".3rem" name="search" />
      </div>
    </header>
    <div v-for='(item,i) in shopList' :key = i>
      <main class="clearfix">
        <div class="title">
          <span>
            <img style="width:0.2rem" src="../assets/images/todayq.jpg" alt />
          </span>
          <span>{{item.name}}</span>
        </div>
      </main>
      <div class="shoplist">
        <ul class=" clearfix">
          <li v-for='shoping in item.list'  @click="shopDetail(shoping.id)" :key = 'shoping.id'>
            <img :src="shoping.thumbnail" alt />
            <p>
              <span>￥{{shoping.reduct_price}}</span>
              <span>￥{{shoping.original_price}}</span>
            </p>
            <p>{{shoping.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../common/api'
export default {
  data() {
    return {
      value: "",
      shopList:'',
      shopdata:''
    };
  },
  mounted(){
    this.$http({
      url:api.home,
    })
    .then(res=>{
      this.shopList = res.data.data
     console.log(this.shopList,'111');
    })
    .catch(err=>{
      console.log(err,'222')
    })
  },
  methods:{
    shopDetail(id){
      //console.log(id)
      this.$router.push({
          path:'/detail',
          query:{
            pid:id
          }
        })
      
    }
  }

};
</script>
<style lang="" scoped>
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
header img {
  width: 3.75rem;
}
header .box {
  text-align: center;
  position: absolute;
  left: 0.58rem;
  top: 0.2rem;
  background: #fedbe4;
  border-radius: 10px;
}
.box input {
  width: 2rem;
  height: 0.44rem;
  padding-left: 0.1rem;
  background: #fedbe4;
  border-radius: 10px;
}
.box i {
  width: 0.44rem;
  height: 0.44rem;
  display: inline-block;
  background: #fedbe4;
  vertical-align: bottom;
  border-radius: 10px;
  text-align: center;
  line-height: 0.44rem;
}
main .title {
  width: 3rem;
  float: left;
  height: 0.26rem;
  line-height: 0.26rem;
  padding-left: 0.13rem;
  margin-top: 0.15rem;
}
main .title span {
  display: inline-block;
  height: 0.26rem;
  vertical-align: middle;
  margin-right: 0.08rem;
}
main .title span:nth-child(1) {
  width: 0.2rem;
  /* background: url() no-repeat; */
  background-size: cover;
}
main .title span:nth-child(2) {
  font-size: 0.15rem;
  color: #7b7b7b;
}
.shoplist {
  margin-top: 0.1rem;
}

.shoplist ul li {
  float: left;
  width: 1.65rem;
  height: 2rem;
  border: 1px solid #eee;
  margin-left: 0.1rem;
  margin-top: 0.1rem;
  padding: 0.17rem;
  box-sizing: border-box;
  color: #666666;
}
.shoplist ul li img {
  width: 1rem;
  margin-left: 0.2rem;
}
.shoplist ul li p {
  line-height: 0.24rem;
}
.shoplist ul li p:nth-of-type(1) span:nth-child(1) {
  display: inline-block;
  margin-right: 0.35rem;
  color: #e60012;
}
.shoplist ul li p:nth-of-type(1) span:nth-child(2) {
  text-decoration: line-through;
}
</style>