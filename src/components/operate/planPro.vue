<template>
  <div class="bgG planBox" style="height: 100%">
    <div class="bgW flex-box-btew font-30 p-t-30 p-l-25 p-r-25 p-b-30" style="position: absolute;top: 0;width: 100%">
      <span>施工编号：{{info.conProcode}}</span>
      <router-link :to="'../planDate'" class="flex-box color_black">
        <mu-icon value="date_range" class="color_blue"/> 全部计划
      </router-link>
    </div>
    <div class="planList p-l-25 p-r-25">
      <div class="item p-20 p-t-30 m-b-20" v-for="x in list" :key="x.conPlanid">
        <div class="flex-box-btew m-b-20">
          <span class="font-36">{{x.conPlanname}}</span>
        </div>
        <div class="flex-box-btew">
          <span class="color_999 flex-box"><mu-icon value="access_time" class="m-r-10 color_green"></mu-icon> {{x.conPlanstadate}}〜{{x.conPlanenddata}}</span>
          <span class="color_green font-28">资料接入</span>
        </div>
      </div>
    </div>
    <div class="add-btn-bottom p-20 bgG">
      <mu-raised-button label="新增计划" :to="'/operate/planBuild/'+id" primary fullWidth class="p-t-20 p-b-20 font-30" icon="add"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "planList",
    data() {
      return {
        id:this.$route.params.id,
        list:[],
        info:{}
      }
    },
    methods:{
      getInfo(){
        this.$ajax.post('/task/conprolist',{
          conProid:this.id
        })
          .then(result=>{
            this.info=result.data.data[0]
          })
      },
      getlist(){
        this.$ajax.post('/consPlan/list',{
          conProid:this.id
        })
          .then(result=>{
            this.list=result.data.data
          })
      },
    },
    created(){
      this.getInfo();
      this.getlist();
    }
  }
</script>

<style lang='less' scoped>
.planList{
  height: 100vh;
  overflow-y: auto;
  padding-top: 1.8rem;
  padding-bottom: 2.4rem;
  .item{
    background-color: #fff;
    border-left: 0.26667rem solid #7cc47f;
  }
}
  .proPlan{
    .item{
      background-color: #fff;
      border-bottom: 1px solid #d6d7dc;
      &:last-child{
        border-bottom: 0;
      }
      p{
        line-height: 1;
        color: #474747;
        span{
          display: block;
        }
      }
      .mu-icon{
        font-size:0.72rem ;
      }
    }
  }
</style>
