<template>
  <div>
    <div class="box">
      <header>
        <van-icon
          @click="goback()"
          style="padding-top: .25rem;box-sizing: border-box;"
          name="arrow-left"
        />
        <p>登录</p>
        <p>
          <a href="/#/register">注册</a>
        </p>
      </header>
      <main>
        <div class="mainbox">
          <ul>
            <li>
              <p>手机号:</p>
              <input class="ipt" type="text" v-model="phone" name="tel" id />
            </li>
            <li>
              <p>密&nbsp;&nbsp;码:</p>
              <input type="password" v-model="password" name="pass" id />
            </li>
            <span class="ipt" style="padding-left:2.4rem">
              <a style="color:#b8b8b8; font-size: .15rem;" href>忘记密码</a>
            </span>
            <input class="subbtn" @click="login()" type="submit" value="登录" />
          </ul>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import api from '../common/api'
export default {
  data() {
    return {
      nickname:'',
      phone: "",
      password: "",
    };
  },
  methods: {
    goback() {
      history.go(-1);
    },
    login() {
      if (this.phone == "" || this.password == "") {
        this.$notify("密码或账号等不能为空");
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.phone)) {
          this.$notify("手机号码格式错误");
        } else {
          this.$http({
            url:api.login,
            params:{
              phone:this.phone,
              password:this.password,
            }
          })
          .then(res=>{
            this.$router.push({
              path:'/mine',
              query:{
                nickname:res.data.profile.nickname,
                avatarUrl:res.data.profile.avatarUrl
              }
            })
          })
          .catch(err=>{
            console.log(err,'2333')
          })
        }
      }
    }
  }
};
</script>


<style scoped>
.box {
  position: fixed;
  left: 0;
  top: 0;
  height: 0.7rem;
  width: 100%;
  background: #ff9900;
  padding: 0.03rem;
  box-sizing: border-box;
  line-height: 0.7rem;
}
header {
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.2rem;
  color: #fff;
}
header a {
  color: #fff;
  padding-right: 0.1rem;
}
.mainbox {
  margin-top: 0.3rem;
}
.mainbox li {
  height: 0.7rem;
  border-bottom: 1px solid #b8b8b8;
}
.mainbox ul {
  padding: 0.3rem;
  margin-top: 1.25rem;
}
.mainbox li {
  margin-top: 0.28rem;
}
.mainbox li p {
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.15rem;
  color: #6e6e6e;
}
.mainbox li input {
  height: 0.3rem;
  width: 3rem;
}
footer {
  text-align: center;
}
.subbtn {
  width: 3rem;
  height: 0.5rem;
  background: #ff9900;
  line-height: 0.5rem;
  font-size: 0.16rem;
  color: #fff;
  border-radius: 5px;
}
</style>
