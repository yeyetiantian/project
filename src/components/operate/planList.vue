<template>
  <div class="bgG planBox" style="height: 100%">
    <mt-navbar v-model="selected" class="p-t-30 p-l-25 p-r-25 p-b-30">
      <mt-tab-item id="1" class="p-20">最新计划 ({{newlist.length}})</mt-tab-item>
      <mt-tab-item id="2" class="p-20">按项目查看 ({{conprolist.length}})</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" swipeable class="font-28" >
      <mt-tab-container-item id="1">
        <div class="planList p-l-25 p-r-25 ">
          <div class="item p-20 m-b-20" v-if="newlist.length===0">
            <span class="font-36">暂无计划</span>
          </div>
          <div class="item p-20 p-t-30 m-b-20" v-for="x in newlist">
            <div class="flex-box-btew m-b-20">
              <span class="font-36">{{x.conPlanname}}</span>
            </div>
            <div class="flex-box-btew">
              <span class="color_999 flex-box"><mu-icon value="access_time" class="m-r-10 color_green"></mu-icon> {{x.conPlanstadate}}〜{{x.conPlanenddata}}</span>
              <span class="color_green font-28">{{x.conPlanspe}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="proPlan">
          <router-link :to="'./operate/planPro/'+x.conProid" class="item flex-box-btew p-t-30 p-l-35 p-b-30 p-r-25" v-for="x in conprolist" :key="x.conProid">
            <p class="font-30">
              <span class="m-b-20">项目名称：{{x.conProname}}</span>
              <span>施工编号：{{x.conProcode}}</span>
            </p>
            <mu-icon value="chevron_right" class="color_blue"/>
          </router-link>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  export default {
    name: "planList",
    data() {
      return {
        selected: '1',
        newlist:[],
        conprolist:[],
      }
    },
    methods:{
      getnewlist(){
        this.$ajax.post('/consPlan/newlist',{})
          .then(result=>{
            this.newlist=result.data.data
          })
      },
      getconprolist(){
        this.$ajax.post('/task/conprolist',{})
          .then(result=>{
            this.conprolist=result.data.data
          })
      },
    },
    created(){
      this.getnewlist();
      this.getconprolist();
    }
  }
</script>

<style lang='less'>
  .planBox{
    position: relative;
    .mint-navbar{
      width: 100%;
      position: absolute;
      top:0;z-index: 100;
    }
    .mint-tab-container{
      height: 100%;
      padding-top: 2.04rem;
      .mint-tab-container-wrap{
        height: 100%;
        .mint-tab-container-item{
          height: 100%;
          overflow-y: auto;
        }
      }
    }
  }
.planList{
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
