<template>
  <div>
    <div class="box">
      <header>
        <van-icon
          @click="goback()"
          style="padding-top: .25rem;box-sizing: border-box;"
          name="arrow-left"
        />
        <p>注册</p>
        <p>
          <a href="/#/login">登录</a>
        </p>
      </header>
    </div>
    <main>
      <div class="mainbox">
        <ul>
          <li>
            <p>昵称:</p>
            <input class="ipt" type="text" v-model="nickname" name="nickname" id />
          </li>
          <li>
            <p>手机号:</p>
            <input @blur="yzdel()" class="ipt" type="text" v-model="phone" name="tel" id />
          </li>
          <li>
            <p>密&nbsp;&nbsp;码:</p>
            <input type="text" v-model="password" name="pass" id />
          </li>
          <li>
            <p>验证码:</p>
            <span class="yzm" v-if="show" @click="login()">点击获取</span>
            <i
              v-if="!show"
              style="position:absolute;right:0rem;top:.1rem;width:1.1rem;height:.4rem;background:#999;line-height:.4rem;text-align:center;color:#fff;"
            >{{auth_time}}s重新发送</i>
            <input type="text" v-model="pass" name="pass" id />
          </li>

          <input class="subbtn" @click="login()" type="submit" value="下一步" />
        </ul>
        <van-checkbox
          @click="checked=!checked"
          style="margin-left:1rem"
          v-model="checked"
        >同意用户协议以及隐私条款</van-checkbox>
      </div>
    </main>
  </div>
</template>

<script>
import api from '../common/api'
export default {
  data() {
    return {
      nickname: "",
      phone: "",
      password: "",
      pass: "",
      show: true,
      checked: false,
      auth_time: ""
    };
  },
  methods: {
    login() {
      if (this.checked) {
        if (this.nickname == "" || this.phone == "" || this.password == "") {
          this.$notify("昵称密码或账号不能为空");
        } else {
          if (!/^1[3456789]\d{9}$/.test(this.phone)) {
            this.$notify("手机号码格式错误");
          } else {
            if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.password)){
              this.$http({
                url: api.register,
                params:{
                  phone:this.phone
                }
              })
                .then(res => {
                  console.log(res, "yzm");
                })
                .catch(err => {
                  console.log(err,'err')
                });
              this.show = false;
              this.auth_time = 60;
              var auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                  this.show = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);

              // 验证验证码是否正确
              if(this.pass){
                this.$http({
                  url:api.yzm,
                  params:{
                    phone:this.phone,
                    captcha:this.pass
                  }
                })
                .then(res=>{
                  // this.$notify({ type: 'success', message: '注册成功' });
                  this.$router.push('/login')
                  console.log(res,'成功')
                })
                .catch(err=>{
                  console.log(err,'验证码不正确')
                })
              }
            } else {
              this.$notify("密码必须是6-12位字母数字组合");
            }
          }
        }
      } else {
        this.$notify("请先勾选用户协议");
      }
    },
    finish() {
      this.show = true;
    },
    goback() {
      history.go(-1);
    },
    yzdel() {
      this.$http({
        url: `http://localhost:3000/cellphone/existence/check?phone=${this.phone}`
      })
        .then(res => {
          console.log(res.data.nickname, "验证注册");
          if (res.data.nickname) {
            this.$notify("该账号已经注册，请直接登录");
            this.$router.push('/login')
          }
        })
        .catch(err => {
          console.log(err, "失败");
        });
    }
  },
  mounted() {}
};
</script>


<style scoped>
.yzm {
  position: absolute;
  right: 0;
  top: 0.1rem;
  color: #fe0041;
  font-size: 0.16rem;
}
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
  position: relative;
  height: 0.5rem;
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
  margin-top: 0.3rem;
}
</style>
