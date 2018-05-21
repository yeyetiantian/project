<template>
  <div class="font-28">
    <div class="flex-box m-b-40 topHead p-l-20 p-r-20 font-24">
      <label>客户资料完整度：</label>
      <div class="flex-box">
        <mu-linear-progress mode="determinate" :size="14" color="#03a9f4" :value="value" style="width:3.5rem;"/>
        <span class="flex-grow m-l-15">{{value}}% <i class="m-l-20" style="color: #ff8400">不错，加油哦！</i></span>
      </div>
    </div>
    <div class="form">
      <div class="base item">
        <label class="face m-r-40 text-left p-l-30">
          <img src="" alt="">
        </label>
        <div class="con">
          <p class="m-b-25 font-36 text-bold">{{info.custname}}</p>
          <p class="m-b-10">{{info.custphone}}</p>
          <p class="m-b-10">{{info.custposition}}</p>
          <p class="m-b-10">{{info.orgCfname}}</p>
          <p>办公地址：{{info.custcompaddress}}</p>
        </div>
      </div>
    </div>
    <div class="vice m-t-40 p-t-35 p-l-25 p-b-40">
      <div class="flex-box-btew m-b-20 font-30 text-bold p-r-20">
        <span>所辖建筑全称</span>
        <mu-raised-button label="更多 . . ." primary v-if="buildList.length>3"/>
      </div>
      <mu-divider class="headLine"/>
      <div class="list">
        <div class="item p-l-20 p-r-20 m-r-20" v-for="(x,i) in buildList" :key="'build_'+i">
          <div class="left">{{x.buildCfname}}</div>
          <div class="right">{{x.buildType}}</div>
        </div>
      </div>
    </div>
    <div class="vice m-t-40 p-l-25">
      <div class="center m-b-20 font-30 text-bold p-r-20">
        <span>附加信息</span><br>
      </div>
      <mu-divider  class="headLine"/>
      <div class="form m-t-20">
        <div class="item p-l-10 p-r-10 m-b-20">
          <label class="m-r-20">家庭地址：</label>
          <span>{{info.custhomeaddress}}-{{info.custhomedetaaddress}}</span>
        </div>
        <div class="item p-l-10 p-r-10 m-b-20">
          <label class="m-r-20">生日：</label>
          <span>{{info.custbirthday}}</span>
        </div>
        <div class="item p-l-10 p-r-10 m-b-20">
          <label class="m-r-20">籍贯：</label>
          <span>{{info.custhometown}}</span>
        </div>
        <div class="item p-l-10 p-r-10 m-b-20">
          <label class="m-r-20">家庭成员：</label>
          <div v-if="info.custfamilymember">
            <p v-for="x in info.custfamilymember.split('$$')">{{x}}</p>
          </div>
          <div v-else></div>
        </div>
        <div class="item p-l-10 p-r-10 m-b-20">
          <label class="m-r-20">风格标签：</label>
          <span>{{info.custlabel}}</span>
        </div>
      </div>
    </div>
    <mu-flat-button label="修改" icon="border_color" primary style="float: right" @click="linkEdit"/>
  </div>
</template>

<script>
    export default {
        name: "info",
      data(){
        return{
          id:this.$route.params.id,
          value:50,
          info:{},
          buildList:[]
        }
      },
      methods: {
        get(){
          this.$ajax.post('/customer/find',{
            custid:this.id
          })
            .then(result => {
              this.info=result.data.data.tCustomer;
              this.buildList=result.data.data.custBuilds
            })
        },
        linkEdit(){
          this.$router.push('../edit/'+this.id)
        }
      },
      created(){
        this.get()
      }
    }
</script>

<style >
  @import "../../assets/less/set.less";
  .topHead{
    height: 1.1733rem;
    background-color: #efeff4;
  }
  .headLine{
    height: 2px;
    background-color: #d6d7dc;
  }
</style>
