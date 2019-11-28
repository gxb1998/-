<template>
  <div>
    <header>
      <van-icon @click="xianshi()" name="setting-o" />
      <p>个人中心</p>
      <p>
        <a style="color:#fff" href="/#/register">注册</a>
      </p>
      <van-action-sheet v-model="show" :actions="actions" @select="tuichu"/>
    </header>
    <main>
      <div class="headPic">
        <!-- <img src="../assets/images/headPic.png" alt /> -->
        <img v-if="minedata.nickname" :src="minedata.avatarUrl" alt />
        <a href="/#/login" v-if="!(minedata.nickname)">请先登录</a>
        <a
          style="display:block;line-height:.4rem;fontSize:.2rem"
          v-if="minedata.nickname"
        >{{minedata.nickname}}</a>
      </div>
      <div class="collections">
        <van-icon class="colPic" name="like-o" />我的收藏
        <span>(5)</span>
      </div>
    </main>
    <div class="myOrder">
      <p>我的订单</p>
      <a href="#">查看所有订单</a>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
    <!-- <van-popup v-model="show1" :style="{ width:'20%' }">退出成功</van-popup> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      show1: false,
      minedata: {},
      actions: [{ name: "选项" }, { name: "退出" }]
    };
  },
  methods: {
    xianshi() {
      this.show = !this.show;
    },
    tuichu(item){
      if(item.name=='退出'){
        localStorage.removeItem("newArr")
        this.show = false
        this.show1=true
        this.$router.push('/home')
      }
    }
  },
  mounted() {

    if (this.$route.query.nickname) {
      console.log(this.$route.query)
      localStorage.setItem("newArr", JSON.stringify(this.$route.query));
      this.minedata = JSON.parse(localStorage.getItem("newArr"));
    } else {
      if (localStorage.getItem("newArr")) {

        this.minedata = JSON.parse(localStorage.getItem("newArr"));
      }
    }

  }
};
</script>

<style scoped>
body {
  width: 100%;
  background: #fafafa;
}

header {
  width: 100%;
  height: 1.85rem;
  background: #ff9900;
  display: flex;
  justify-content: space-between;

  padding: 0.3rem 0.15rem 0 0.15rem;
  box-sizing: border-box;
  color: #fff;
  font-size: 0.17rem;
}

.user-poster {
  width: 100%;
  height: 53vw;
  display: block;
}

.user-group {
  margin-bottom: 0.07rem;
}
.user-links {
  padding: 0.07rem 0;
  font-size: 0.06rem;
  text-align: center;
  background-color: #fff;
}

.user-links .van-icon {
  display: block;
  font-size: 0.24rem;
}
main {
  height: 1.3rem;
  border-bottom: 0.1rem solid #efeeee;
  background: #fafafa;
}
.myOrder {
  height: 0.3rem;
}

.headPic {
  position: relative;
  width: 0.9rem;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  font-size: 0.1rem;
  left: 1.35rem;
  top: -0.5rem;
  background: #e6dfdf;
  border-radius: 50%;
  border: 0.06rem solid #fff;
  z-index: 100;
}
.headPic img {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
}
main .collections {
  width: 1.25rem;

  font-size: 0.15rem;
  padding-left: 0.15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
main .collections .colPic {
  color: red;
  font-size: 0.2rem;
}
.myOrder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.15rem;
  padding: 0 0.22rem;
} /*
.myOrder a{
color: #999
} */
</style>