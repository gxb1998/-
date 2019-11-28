<template>
  <div>
    <header>
      <div class="box">
        <input type="text" v-model="value" placeholder="请输入商品名称" />
        <van-icon size=".3rem" name="search" />
      </div>
    </header>
    <main>
      <van-tree-select height="140vw" :items="items" :main-active-index.sync="activeIndex">
        <template slot="content">
          <ul class="typeshop"  v-for="(item,i) in shoping" :key ='i' v-if="activeIndex === i">
            <li v-for="(shoping,j) in item.list" :key ='j'>
              <a>
                <img :src="shoping.thumbnail" alt />
              </a>
              <p>{{shoping.name}}</p>
            </li>
          </ul>

        </template>
      </van-tree-select>
    </main>
  </div>
</template>
<script>
import api from '../common/api'
export default {
  data() {
    return {
      shoping:'',
        value:'',
      activeIndex: 0,
      items: [
        {text:''},
        {text:''},
        {text:''},
        {text:''},
        {text:''}
      ]
    };
  },
  mounted(){
    this.$http({
      url:api.type
    })
    .then(res=>{
      this.shoping=res.data.data
      for(let i =0;i<this.shoping.length;i++){
        this.items[i].text = this.shoping[i].name;
        
      } 
      console.log(this.shoping,'成功')
    })
    .catch(err=>{
      console.log(err,'失败了')
    })
  }
};
</script>
<style scoped>
header {
  width: 100%;
  height: 0.8rem;
  background: #ff9900;
}
header .box {
  text-align: center;
  position: absolute;
  left: 0.58rem;
  top: 0.2rem;
  background: #ffe1b5;
  border-radius: 10px;
}
.box input {
  width: 2rem;
  height: 0.44rem;
  padding-left: 0.1rem;
  background: #ffe1b5;
  border-radius: 10px;
}
.box i {
  width: 0.44rem;
  height: 0.44rem;
  display: inline-block;
  background: #ffe1b5;
  vertical-align: bottom;
  border-radius: 10px;
  text-align: center;
  line-height: 0.44rem;
}
.typeshop li {
  width: 1.12rem;
  height: 1.18rem;
  float: left;
  margin:.05rem;
}
.typeshop li a {
  display: inline-block;
  width: 1.13rem;
  height: 1rem;
  padding: .1rem 0.16rem;
  box-sizing: border-box;
  border: 0.01rem solid #1d84a7;
}
.typeshop li img {
  width: 0.82rem;
}
.typeshop li p {
  width: 1.13rem;
  height: 0.25rem;
  background: #1d84a7;
  color: #eee;
  text-align: center;
  line-height: .25rem;
}
</style>