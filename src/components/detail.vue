<template>
  <div>
    <div class="good">
      <header>
        <div class="back-btn" @click="goback()">
          <van-icon name="arrow-left" />
        </div>
        <div class="shop-btn">
          <van-icon name="cart-o" />
        </div>
        <div class="more-btn">
          <van-icon name="ellipsis" />
        </div>
      </header>

      <div>
        <van-swipe class="swipe" style="height:3.33rem" :loop="false">
          <van-swipe-item v-for="item in shopdetail.swiperImgArr" :key="item.pid">
            <img :src="item" alt="图片" />
          </van-swipe-item>
        </van-swipe>
        <van-divider />
        <van-row style="height:.375rem" class="title_goods">
          <van-col span="20" style="font-size:.14rem">{{shopdetail.name}}</van-col>
          <van-col span="4" style="color:red">
            收藏
            <van-icon name="star-o" />
          </van-col>
        </van-row>

        <div class="price_goods clearfix">
          <span class="price_g">￥{{shopdetail.reduct_price}}</span>
          <span class="discount_g">6.5折</span>
          <span class="send_g">包邮</span>
        </div>
        <div class="more_goods">
          <del>￥{{shopdetail.original_price}}</del>
          <span v-for="(item,i) in shopdetail.describe" :key="i">{{item}}</span>
        </div>
        <div class="detail_box">
          <van-tabs style="border-bottom:none" color="#ff9900">
            <van-tab title="商品详情" class="goods_d">
              <img v-for="(item,i) in shopdetail.shopDes" :key="i" :src="item" alt />
            </van-tab>
            <van-tab title="用户评价" class="evaluate">
              <div class="tag">
                <div style="width:100%display: flex;justify-content: space-between;">
                  <span
                    @click="qhtab(i)"
                    :class="[num == i ? 'spt1' : 'spt' ]"
                    v-for="(item,i) in appraise"
                    :key="i"
                  >{{item}}</span>
                </div>
                <div class="evaluate_d" >
                  <ul v-if="num==index" v-for="(val,key,index) in shopdetail.buyerReviews" :key='index'>
                    <li  v-for="(item,i) in val" :key="i">
                      <div class="u_info">
                        <span class="uname">{{item.buyerName}}</span>
                        <span class="date">2015-10-03 21:47:13</span>
                      </div>
                      <div class="u_detail">
                        <img :src="list" v-for="(list,j) in item.postImg" :key="j" alt />
                      </div>
                      <div class="u_detail">
                        {{item.postDescribe}}
                      </div>
                      <div class="reply">管理员：{{item.adminReviews}}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>

      <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
        <van-icon @click="show=false" color='#9a9a9a' size='.2rem' style="position: absolute;right:.1rem;top:.1rem;width:.28rem;height:.28rem;border: .01rem solid #9a9a9a;text-align:center;line-height:.28rem;border-radius:50%" name="cross" />
        <div class="addcar" >
          <div v-if="i<1" v-for="(item,i) in shopdetail.swiperImgArr" :key="i">
            <img v-if="i<1" :src="item" alt="">
          </div>
          <div>
            <h1>￥{{shopdetail.reduct_price}}</h1>
            <h2>库存2999件</h2>
            <h2>请选择商品属性</h2>
          </div>
        </div>
        <div class="btnbox">
          <span>购买数量</span>
          
          <button @click="[sum>1?sum--:sum]">-</button>
          <span>{{sum}}</span>
          <button @click="sum++">+</button>

        </div>
        <div >
          <div class="sptype">
            <h1>{{shopdetail.buySelect[0].name}}</h1>
            <ul>
              <li @click='sizeType(i)' :class="[itemsum1==i ? 'bgcolor1' : 'bgcolor2']" v-for="(item,i) in shopdetail.buySelect[0].list" :key="i">{{item}}</li>
            </ul>
          </div>
          <div class="sptype">
            <h1>{{shopdetail.buySelect[1].name}}</h1>
            <ul>
              <li :class="[itemsum2==j ? 'bgcolor1' : 'bgcolor2']" @click='ageType(j)' v-for="(item,j) in shopdetail.buySelect[1].list" :key="j">{{item}}</li>
            </ul>
          </div>

        </div>

        <van-goods-action>
          <span style="display:inline-block;width:1rem">总计：￥{{sumList}}</span>
          <van-goods-action-button style="margin-left:.5rem" class="tag_icon" type="warning" text="加入购物车" @click="gobuy()" />
          <van-goods-action-button class="tag_icon" @click="gobuy()" type="danger" text="立即购买" />
        </van-goods-action>
      </van-popup>
      

      <footer>
        <van-goods-action>
          <van-goods-action-icon class="tag_icon" icon="chat-o" text="客服" />
          <van-goods-action-icon class="tag_icon" to='/shopcar' icon="cart-o" text="购物车" />
          <van-goods-action-button class="tag_icon" @click="addcart()" type="warning" text="加入购物车" />
          <van-goods-action-button class="tag_icon" type="danger" text="立即购买" />
        </van-goods-action>
      </footer>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopdetail: "",
      type: "",
      appraise: ["全部好评", "好评", "差评", "晒单"],
      num: 0,
      show: false,
      sum: 1,
      sumList:'',
      shopprice:'',
      itemsum1:0,
      itemsum2:0,
      title:'',
      img:'',
      size:'',
      age:'',
    } 
  },
  methods: {
    goback() {
      history.go(-1);
    },
    addcart() {
      this.show = true;
      //console.log(this.show)
    },
    qhtab(i) {
      this.num = i;
      // this.comType = this.common;
      //console.log(this.num, i);
    },
    gobuy(){
      // console.log(this.shopdetail.swiperImgArr[0])
      let arr=[];
      if(this.size==''){//用户没选择属性，默认属性购买
        this.size=this.shopdetail.buySelect[0].list[0]
      }
      if(this.age==''){
        this.age=this.shopdetail.buySelect[1].list[0]
      }
      this.title=this.shopdetail.name
      this.img=this.shopdetail.swiperImgArr[0]
      let obj ={
        title:this.title,
        size:this.size,
        age:this.age,
        sum:this.sum,
        sumList:this.sumList,
        img:this.img,
        check:false,
        price:this.shopdetail.reduct_price
      }
      
      console.log(localStorage.getItem('arrCar'))
      // localStorage.removeItem('arrCar')
      if(localStorage.getItem('arrCar')){
        console.log('存储有值')
        arr=JSON.parse(localStorage.getItem('arrCar'))
        console.log(arr,'存储有值arr')
        arr.push(obj)
        localStorage.setItem('arrCar',JSON.stringify(arr))
      }else{
        console.log('无存储')
        arr.push(obj)
        localStorage.setItem('arrCar',JSON.stringify(arr))
        //console.log(arr)
      }
      this.$toast.success('成功添加到购物车');
    },
    sizeType(i){
      this.itemsum1=i;
      this.size=this.shopdetail.buySelect[0].list[i] 
    },
    ageType(j){
      this.itemsum2=j
      this.age=this.shopdetail.buySelect[1].list[j] 
    }
  },
  watch:{
    sum(){
      this.sumList=this.shopprice*this.sum
    }
  },
  mounted() {
    this.$http({
      url: `http://yd.msword.top/getDetails?pid=${this.$route.query.pid}`
    })
      .then(res => {
        this.shopdetail = res.data.data;
        //console.log(this.shopdetail, "成功");
        this.shopprice =this.shopdetail.reduct_price
        if(this.sum==1){
          this.sumList=this.shopprice
          //console.log(this.sumList,666)
        }
      })
      .catch(err => {
        console.log(err, "详情失败");
      });
  }
};
</script>
<style scoped>
.bgcolor1{
  background: #ff9900;
  color: #fff;
    float: left;
  width: .6rem;
  height: .22rem;
  line-height: .22rem;
  text-align: center;
  margin-right: .1rem;
  border-radius: .05rem;
}
.btnbox{
  padding: 0 .2rem;
}
.sptype,.agetype{
  padding: .2rem;
}
.sptype ul,.agetype ul{
  padding-top:.2rem
}
.bgcolor2{
  float: left;
  width: .6rem;
  height: .22rem;
  background: #ddd;
  color: #999;
  line-height: .22rem;
  text-align: center;
  margin-right: .1rem;
  border-radius: .05rem;
}
.agetype ul li{
  width: .8rem;
  margin-right: .15rem;
}
.btnbox span:nth-child(1){
  margin-right: 1.8rem;
}
.btnbox span:nth-of-type(2){
  display: inline-block;
  width:.4rem;
  text-align: center;
}
.btnbox button{
  color: #999;
}
.addcar{
  width: 100%;
  height: 1.5rem
}
.addcar div{
  float: left;
  width: 1.35rem;
  height: 1.25rem;
  box-sizing: border-box;
}
.addcar div:nth-child(1){
  padding:.2rem
}
.addcar div:nth-child(2){
  padding-top:.55rem
}
.addcar div:nth-child(2) h1{
  color:#eb2222;
}
.addcar div:nth-child(2) h1,.addcar div:nth-child(2) h2{
  width: 1rem;
  line-height: .2rem;
  font-size: .13rem;
}
.addcar img{
  width: 1rem;
  border: .02rem solid #999;
}
.good {
  padding-bottom: 1rem;
}
.back-btn {
  font-size: 0.2rem;
  position: fixed;
  z-index: 999;
  top: 0.25rem;
  left: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  color: #fff;
  line-height: 0.32rem;
  text-align: center;
  background-color: rgba(102, 102, 102, 0.4);
}
.shop-btn {
  font-size: 0.2rem;
  position: fixed;
  z-index: 999;
  top: 0.25rem;
  right: 0.6rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  color: #fff;
  line-height: 0.32rem;
  text-align: center;
  background-color: rgba(102, 102, 102, 0.4);
}
.more-btn {
  font-size: 0.2rem;
  position: fixed;
  z-index: 999;
  top: 0.25rem;
  right: 0.15rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  color: #fff;
  line-height: 0.32rem;
  text-align: center;
  background-color: rgba(102, 102, 102, 0.4);
}
.swipe img {
  width: 100%;
  margin-top: 0.5rem;
  /* height :auto ; */
  display: block;
  height: 2.9rem;
}
.title_goods,
.price_goods,
.more_goods {
  padding-left: 0.1rem;
}
.price_goods {
  height: 0.35rem;
  padding-top: 0.1rem;
  box-sizing: border-box;
}

.price_goods span {
  display: inline-block;
  /* margin-right: 0.2rem; */
}
.price_g {
  color: red;
  font-size: 0.125rem;
  padding-right: 0.2rem;
}
.discount_g,
.send_g {
  width: 0.35rem;
  height: 0.15rem;
  background: #ff9900;
  text-align: center;
  color: #fff;
  line-height: 0.15rem;
}
.more_goods del {
  color: gray;
}
.more_goods span {
  display: inline-block;
  border: 1px solid #ff9900;
  width: 0.7rem;
  height: 0.15rem;
  text-align: center;
  line-height: 0.15rem;
  color: #ff9900;
  margin-left: 0.1rem;
}
.detail_box {
  padding: 0 0.2rem;
  border-top: 0.15rem solid #eee;
  margin-top: 0.1rem;
}
.detail_box .goods_d img {
  width: 3.25rem;
  margin-top: 0.1rem;
}
.tag {
  margin-top: 0.15rem;
  margin-bottom: 0.1rem;
}
.tag .spt {
  margin: 0.1rem 0.08rem;
  display: inline-block;
  width: 0.66rem;
  height: 0.25rem;
  background: #999;
  color: #fff;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 0.25rem;
  font-size: 0.1rem;
}
.spt1 {
  margin: 0.1rem 0.08rem;
  display: inline-block;
  width: 0.66rem;
  height: 0.25rem;
  background: #999;
  color: #fff;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 0.25rem;
  font-size: 0.1rem;
  background: #ff9900;
}
.cur {
  background: #ff9900;
}
.evaluate_d {
  border-top: 1px solid #ccc;
}
.evaluate_d ul li .u_info {
  display: flex;
  justify-content: space-between;
  height: 0.3rem;
  line-height: 0.3rem;
}
.evaluate_d li .u_info .uname {
  color: #ff9900;
  font-size: 0.1rem;
}
.evaluate_d li .u_info .date {
  font-size: 0.07rem;
  color: #999;
}
.u_detail {
  color: #999;
  padding-bottom: 0.1rem;
  overflow: hidden;
}
.u_detail img {
  margin-bottom: 0.05rem;
  float: left;
  height: 0.8rem;
}
.reply {
  background: #ccc;
  padding: 0.1rem;
  border-radius: 0.05rem;
  color: #666;
}
</style>