<template>
  <div>
    <header>
      <div class="box">
        <img src="../assets/images/caricon.jpg" alt @click="goback()" />
        <span>购物车</span>
      </div>
    </header>

    <div class="shopcarbox">
      <van-swipe-cell
        v-for="(item,i) in arrCar"
        :key="i"
        style="height:1.9rem; position: relative;;background:#fafafa"
      >
        <div class="carbox">
          <p style="padding-left:.4rem;color:#aeaeae;">
            <span class="iconfont icon-iconset0111"></span>杭州保税区仓
          </p>
          <van-checkbox
            style="position:absolute;top:.8rem;left:.05rem;width:.2rem;float:left;z-index:1000"
            v-model="item.check"
            @click="checkOne(i)"
          ></van-checkbox>
          <van-card
            :sumnum="sumprice"
            :price="item.sum*item.price"
            desc="描述信息"
            :title="item.title"
            :thumb="item.img"
            style="padding-left:.3rem;"
          >
            <div slot="tags">
              <van-tag plain type="danger">{{item.size}}</van-tag>
              <van-tag plain type="danger">{{item.age}}</van-tag>
              <br />
              <van-button size="mini" @click="cutNum(i)">-</van-button>
              <van-button size="mini">{{item.sum}}</van-button>
              <van-button size="mini" @click="addNum(i)">+</van-button>
            </div>
          </van-card>
        </div>
        <template slot="right" :disabled='del'>
          <van-button square type="danger" @click="delShop(i)" style="height:1.5rem;" text="删除" />
        </template>
      </van-swipe-cell>
      <div class="carnull" v-if="arrCar.length==0">
        <img src="../assets/images/carNull.jpg" alt />
        <p>购物车空空如也</p>
      </div>
    </div>

    <footer>
      <div>
        <van-checkbox v-model="checkAll" @click="checkA()">全选</van-checkbox>
      </div>
      <div>
        <van-checkbox v-model="bianji" @click="bj()">编辑</van-checkbox>
      </div>
      <div>
        <span style="color:#FF0000">
          合计:{{sumprice}}
          <br />(不含运费)
        </span>
      </div>
      <input class="btn" type="submit" value="去结算" />
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bianji: false,
      checkAll: false,
      num: 0,
      price: "",
      arrCar: [],
      del:true
    };
  },
  methods: {
    bj(){
      this.del=false;
    },
    goback() {
      history.go(-1);
    },
    cutNum(i) {
      if (this.arrCar[i].sum > 1) {
        this.arrCar[i].sum--;
      }
      localStorage.setItem("arrCar", JSON.stringify(this.arrCar));
      // console.log(JSON.parse(localStorage.getItem("arrCar"))[i].sum)
    },
    addNum(i) {
      this.arrCar[i].sum++;
      //this.arrCar[i].sumList
      localStorage.setItem("arrCar", JSON.stringify(this.arrCar));
      console.log(JSON.parse(localStorage.getItem('arrCar')))
    },
    checkA() {
      if (this.checkAll) {
        this.arrCar.map((item, i) => {
          item.check = false;
        });
      } else {
        this.arrCar.map((item, i) => {
          item.check = true;
        });
      }
    },
    checkOne(i) {
      this.arrCar[i].check = !this.arrCar[i].check;
      let result = this.arrCar.map((item, i) => {
        return item.check;
      });
      let bool = result.every((item, i) => {
        return item == true;
      });
      if (bool) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    //删除商品
    delShop(i) {
      //删除点击的这一项
      this.arrCar.splice(i, 1);
      console.log(this.arrCar);
      // for (let i = 0; i < this.arrCar.length; i++) {
      //   this.sumprice += Number(this.arrCar[i].sumList);
      // }
      //重新设置本地存储为当前剩余数组
      localStorage.setItem("arrCar", JSON.stringify(this.arrCar));
      console.log(JSON.parse(localStorage.getItem("arrCar")));
    }
  },
  mounted() {
    //取出本地存储的数据保存到arrCar中
    this.arrCar = JSON.parse(localStorage.getItem("arrCar"));

    //console.log(this.arrCar);
    // localStorage.removeItem('arrCar')
  },
  computed: {
    sumprice() {
      let sum = 0;
      this.arrCar.map((item, i) => {
        //如果单选选中就计算金额 否则 不计算
        console.log(item);
        if (item.check) {
          sum += Number(this.arrCar[i].sum)*Number(this.arrCar[i].price);
        }
      });
      return sum;
    }
  }
};
</script>
<style lang="" scoped>
.carnull {
  width: 2rem;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 2rem;
  left: 0.8rem;
}
.carnull img {
  width: 1.5rem;
}
.carnull p {
  font-size: 0.18rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  color: #3e3e3e;
}
.shopcarbox {
  margin-bottom: 1rem;
}
header {
  width: 100%;
  height: 0.8rem;
  background: #ff9900;
}
header .box {
  position: absolute;
  left: 0rem;
  top: 0rem;
  background: #ff9900;
  width: 100%;
  height: 0.8rem;
  display: flex;
  align-items: center;
}
.box img {
  display: block;
  width: 0.18rem;
  margin-left: 0.2rem;
}
.box span {
  display: inline-block;
  color: #fff;
  font-size: 0.2rem;
  width: 0.8rem;
  margin-left: 1.4rem;
}
.carbox {
  margin-top: 0.2rem;
  height: 0.3rem;
  line-height: 0.3rem;
}

footer {
  width: 100%;
  height: 0.55rem;
  background: #fff;
  position: fixed;
  bottom: 0.51rem;
  right: 0;
  border-top: 1px solid #eee;
}
footer div {
  float: left;
}
footer .btn {
  position: fixed;
  right: 0;
  width: 1.16rem;
  height: 0.55rem;
  background: #ff5500;
  color: #fff;
  font-size: 0.18rem;
}
footer div:nth-of-type(1),
footer div:nth-of-type(2) {
  width: 0.72rem;
  height: 0.55rem;
  text-align: center;
  /* line-height: .2rem;
  padding-top: .1rem; */
  color: #e6e6e6;
}
footer div:nth-of-type(3) {
  width: 1.2rem;
  text-align: center;
  height: 0.56rem;
  line-height: 0.2rem;
  padding-top: 0.1rem;
  color: #b0b0b0;
}
</style>