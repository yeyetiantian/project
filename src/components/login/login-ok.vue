<template>
  <form class="login-box">
    <div class="top-bg">
      <img src="../../assets/img/login-bg.png" alt="">
    </div>
    <div class="input-box font-38">
      <label>真实姓名</label>
      <input type="text" v-model="form.userName" @change="checkfun('userName')"/>
      <div class="color_red msg">{{formRule.userName.text}}</div>
    </div>
    <div class="input-box font-38">
      <label>手机号码</label>
      <input type="tel" v-model="form.phone" @change="checkfun('phone')">
      <div class="color_red msg">{{formRule.phone.text}}</div>
    </div>
    <div class="input-box font-38">
      <label>职位</label>
      <input type="text" v-model="form.userType" @change="checkfun('userType')">
      <div class="color_red msg">{{formRule.userType.text}}</div>
    </div>
    <button type="button" class="btn-sub font-50" @click="submit">确 定</button>
  </form>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        form:{
          userName:'',
          phone:'',
          userType:''
        },
        formRule:{
          userName:{
            text:'',
            msg:'请输入真实姓名'
          },
          phone:{
            text:'',
            msg:'请输入正确的手机号',
            rule:/^1[3|4|5|7|8][0-9]\d{8}$/
          },
          userType:{
            text:'',
            msg:'请输入您的职位'
          }
        }
      }
    },
    watch:{

    },
    methods:{
      checkfun(key){
        if(key){
          if(this.formRule[key].rule&&!(this.formRule[key].rule.test(this.form[key]))){
            this.formRule[key].text=this.formRule[key].msg
          }else if(!this.form[key]){
            this.formRule[key].text=this.formRule[key].msg
          }else{
            this.formRule[key].text=''
          }
        }else{
          let flag=true
          for (let i in this.formRule){
            if(!this.form[i]){
              this.formRule[i].text=this.formRule[i].msg
              flag =false
            }else if(this.formRule[i].rule&&!(this.formRule[i].rule.test(this.form[i]))){
              this.formRule[i].text=this.formRule[i].msg
              flag =false
            }else{
              this.formRule[i].text=''
            }
          }
          return flag
        }
      },
      submit(){
        if(!this.checkfun()) {
          return;
        }
        this.$ajax.post('/updateUser',this.form)
          .then(res=>{
            this.$router.push('/')
          })
      }
    }
  }
</script>

<style lang='less' scoped>
.login-box{
  width: 100%;
  height: 100%;
  background: #268ccd;
  .top-bg{
    width: 100%;
    img{
      max-width: 100%;
    }
  }
  .input-box{
     padding: 0 0.93333rem;
    display: flex;
    position: relative;
    margin-bottom: 0.8rem;
    label{
      display: block;
      color: #fff;
      width: 4.2em;
      padding: 0.16667rem 0;
      text-align: right;
      margin-right: 0.4rem;
    }
    input{
      width: 5.6rem;
      padding: 0.16667rem 0.4rem;
      border: 0;outline: 0;border-radius: 0.13333rem;
      background: rgba(255,255,255,0.3);
      color: #fff;
    }
    .msg{
      position: absolute;
      width: 5.6rem;
      right:0.93333rem;
      bottom:-0.8rem;
    }
  }
  .btn-sub{
    position: absolute;
    left:0;right:0;margin: auto;
    bottom:0.4rem;
    width: 8.9333rem;
    border: 0;
    border-radius: 0.1333rem;
    background: #43abfc;
    color: #fff;
    height:1.44rem;
    &:disabled{
      background: #ccc;
    }
  }
}
</style>
