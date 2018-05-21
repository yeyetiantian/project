<template>
  <div class="bgG" style="min-height: 100%">
    <div class="scheule p-t-40 p-b-20 p-l-35 p-r-35 font-30">
      <p class="m-b-15"><span>施工编号： {{info.conProcode}}</span></p>
      <p class="m-b-15"><span>项目名称： {{info.conProname}} </span></p>
      <p class="m-b-15"><span>班<i style="padding:0 1em"></i>组： {{info.construc}}</span></p>
      <p class="flex-box-btew m-b-15"><span>人<i style="padding:0 1em"></i>数： {{info.construcnum}}人</span><span class="flex-box"><mu-icon value="access_alarm"/>{{info.conCredate}}</span></p>
    </div>
    <div class="m-t-20" v-for="(x,i) in list">
      <div class="flex-box-btew p-l-30 p-r-30 p-t-15 p-b-15 font-30 color_white" :style="'background-color:'+color[i]">
        <span>{{x.conClocktype}}</span>
        <span>{{x.conClockdate}}</span>
      </div>
      <div class="buildLog p-25 font-24">
        <!--<div class="item m-b-20">
          <span>安全记录表：</span>
          <div class="con">
            <div class="img"></div>
            <div class="img"></div>
            <div class="img"></div>
          </div>
        </div>-->
        <div class="item m-b-40">
          <span>{{x.conClocktype}}照片：</span>
          <div class="con">
            <div class="img"  v-for="img in x.imgList">
              <img :src="$ajax.defaults.baseURL+''+img" alt="" @click="open($ajax.defaults.baseURL+''+img)">
            </div>
          </div>
        </div>
        <div class="item m-b-15">
          <span>施工说明： </span>
          <div class="con">
            <span>{{x.conClockproj}} </span>
          </div>
        </div>
      </div>
    </div>
    <mu-dialog :open="dialog" @close="dialog = false" dialogClass="imgDilog">
      <img :src="diaImg" alt="" @click="dialog = false">
    </mu-dialog>
  </div>
</template>

<script>
    export default {
      name: "buildInfo",
      data() {
          return {
            id:this.$route.params.id,
            dialog:false,
            diaImg:'',
            color:['#81d4fa','#0298dc','#fedc74'],
            list:[],
            info:{}
          }
      },
      methods:{
         open(src){
           this.dialog=true;
           this.diaImg=src
         },
        getList(){
           this.$ajax.post('constrcard/list',{
             conProid:this.id
           })
             .then(result=>{
               this.list=result.data.data;
               if(this.list.length<1)return;
               this.list.forEach(n=>{
                 if(n.conClockpic){
                   this.$set(n,'imgList',n.conClockpic.split(','))
                 }else{
                   this.$set(n,'imgList',[])
                 }
               })
             })
        },
        getInfo(){
           this.$ajax.post('/constrcard/prolist',{
             conProid:this.id
           })
             .then(result=>{
               this.info=result.data.data[0];
             })
        }
      },
      created(){
        this.getInfo()
        this.getList()
      }
    }
</script>

<style lang='less'>
  @import "../../assets/less/set";
  .scheule{
    background-color: #fff;
    color: #333;
  }
  .nextCon{
    box-shadow: 1px 1px 2px 0px
    rgba(0, 0, 0, 0.15);
    border-radius: 0.16rem;
    border: solid 1px #e8e8e8;
  }
  .buildLog{
    background-color: #fff;
    .item{
      display: flex;
      align-items: center;
      >span{
        width: 6em;
        color: #666666;
        margin-right: 0.36rem;
      }
      .con{
        display: flex;
        .img{
          width: 1.36rem;
          height: 1.00667rem;
          margin-right: 0.2rem;
          text-align: center;
          img{
            max-height: 100%;
            max-width: 100%;
          }
        }
      }
    }
  }
</style>
