<template>
  <div>
    <header></header>
    <footer>
      <p>
        <router-link to="/home" active-class="click">
          <span class="iconfont icon-iconset0111"></span>首页
        </router-link>
      </p>
      <p>
        <router-link to="/type" active-class="click">
          <span class="iconfont icon-fenlei"></span>分类
        </router-link>
      </p>
      <p>
        <router-link to="/shopcar" active-class="click">
          <span class="iconfont icon-gouwuche"></span>购物车
        </router-link>
      </p>
      <p>
        <router-link to="/mine" active-class="click">
          <span class="iconfont icon-wode"></span>我
        </router-link>
      </p>
    </footer>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 3.75rem;
  height: 0.5rem;
  line-height: 0.5rem;
  /* background: pink; */
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #eeeeee;
  background: #fff;
  z-index: 1000;
}
footer p {
  width: 25%;
  text-align: center;
  font-size: 0.14rem;
  box-sizing: border-box;
  line-height: .38rem;
}

.click {
  color: #ff9900;
}
footer p span {
    display: block;
    width: .24rem;
    height: .15rem;
    padding-left: .35rem;
}
footer p a{
    width: 100%;
}
.myicon {
  display: block;
  font-size: 0.14rem;
}
</style>