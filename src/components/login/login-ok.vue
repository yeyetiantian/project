<template>
  <form class="login-ok-box">
    <img src="../../assets/img/duihao.png" alt="">
    <h1>提交成功</h1>
    <p>请耐心等待，系统尽快为您确认身份！</p>
    <!--<button type="button" class="btn-sub font-50" @click="close">关 闭</button>-->
  </form>
</template>

<script>
  export default {
    name: "login-ok",
    data() {
      return {
      }
    },
    methods:{
      close(){
        window.opener=null;
        window.open("", "_self");
        window.close();
      }
    }
  }
</script>

<style lang='less' scoped>
.login-ok-box{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.86667rem;
  width: 100%;
  height: 100%;
  background: #fff;
  img{
    width: 2.65333rem;
  }
  h1{
    font-size: 1.06667rem;
    color: #878c90;
    margin: 1rem 0;
  }
  p{
    font-size: 0.4rem;
    color: #878c90;
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
  }
}
</style>
