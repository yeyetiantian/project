<template>
   <div class="planBox bgG">
     <mt-navbar v-model="selected" fixed>
       <mt-tab-item id="1" class="p-20">今日计划</mt-tab-item>
       <mt-tab-item id="2" class="p-20">已完成的计划</mt-tab-item>
       <mt-tab-item id="3" class="p-20">未完成的计划</mt-tab-item>
     </mt-navbar>
     <mt-tab-container v-model="selected" swipeable class="p-25 font-28" >
       <mt-tab-container-item id="1">
         <div class="planList">
           <div v-if="daylist.length===0" class="item p-30">还没有计划，赶快去创建</div>
           <router-link :to="'./plan/info/'+x.planId" v-for="x in daylist" :key="x.planId">
             <div class="item p-30 m-b-20" >
               <div class="flex-box-btew m-b-20">
                 <span class="text-bold font-30" >{{x.planName}}</span>
                 <span class="color_green">{{x.planState}}</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">{{x.custname}}</span>
                 <span>{{x.planStartdate}}</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">{{x.planDetailaddress}}</span>
                 <span class="color_999">{{x.planState}}</span>
               </div>
               <div class="flex-box-btew">
                 <span><b>计划目标： </b>{{x.planExpectres}}</span>
                 <span></span>
               </div>
             </div>
           </router-link>
         </div>
         <mu-raised-button label="新计划" to="/plan/add" primary fullWidth class="addplan p-t-20 p-b-20" icon="add"/>
       </mt-tab-container-item>
       <mt-tab-container-item id="2">
         <div class="planList">
           <router-link :to="'./plan/info/'+x.planId"  v-for="x in endlist"  :key="x.planId">
             <div class="item p-30 m-b-20">
               <div class="flex-box-btew m-b-20">
                 <span class="text-bold font-30" >{{x.planName}}</span>
                 <span class="color_green">{{x.planState}}</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">{{x.custname}}</span>
                 <span>{{x.planStartdate}}</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">{{x.planAddress}}</span>
                 <span class="color_blue">{{x.planState}}</span>
               </div>
               <div class="flex-box-btew m-b-20">
                 <span class="color_999">{{x.planDetailaddress}}</span>
                 <span></span>
               </div>
               <div class="flex-box-btew">
                 <span><b>计划目标： </b>{{x.planExpectres}}</span>
                 <span></span>
               </div>
               <div class="flex-box-btew">
                 <span><b>实际目标： </b>{{x.planActual}}</span>
                 <span></span>
               </div>
             </div>
           </router-link>
         </div>
       </mt-tab-container-item>
       <mt-tab-container-item id="3">
         <div class="planList">
           <router-link :to="'./plan/info/'+x.planId"  v-for="x in weilist"  :key="x.planId">
             <div class="item p-30 m-b-20">
               <div class="flex-box-btew m-b-20">
                 <span class="text-bold font-30" >{{x.planName}}</span>
                 <span class="color_green">{{x.planState}}</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">{{x.custname}}</span>
                 <span>{{x.planStartdate}}</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">{{x.planAddress}}</span>
                 <span class="color_blue">已打卡</span>
               </div>
               <div class="flex-box-btew m-b-20">
                 <span class="color_999">{{x.planDetailaddress}}</span>
                 <span></span>
               </div>
               <div class="flex-box-btew">
                 <span><b>计划目标： </b>{{x.planExpectres}}</span>
                 <span></span>
               </div>
               <div class="flex-box-btew">
                 <span><b>实际目标： </b>{{x.planActual}}</span>
                 <span></span>
               </div>
             </div>
           </router-link>
         </div>
       </mt-tab-container-item>
     </mt-tab-container>
   </div>
</template>
<script>
  export default{
    data () {
      return{
        selected: '1',
        daylist:[],
        endlist:[],
        weilist:[],
      }
    },
    methods: {
      getdaylist(){
        this.$ajax.post('/plan/daylist',{})
          .then(result=>{
            this.daylist=result.data.data
          })
      },
      getendlist(){
        this.$ajax.post('/plan/endlist',{})
          .then(result=>{
            this.endlist=result.data.data
          })
      },
      getweilist(){
        this.$ajax.post('/plan/weilist',{})
          .then(result=>{
            this.weilist=result.data.data
          })
      }
    },
    created () {
      this.getdaylist();
      this.getendlist();
      this.getweilist();
    }
  }
</script>
<style lang="less" type="text/less">
  .planBox{
    height: 100%;
    .mint-tab-container{
      height: 100%;
      .mint-tab-container-wrap{
        height: 100%;
      }
      .mint-tab-container-item{
        padding-top: 0.8rem;
        height: 100%;
        position: relative;
        .planList{
          height: 100%;
          padding-bottom: 1rem;
          overflow-y: auto;
        }
        .addplan{
          position: absolute;
          bottom:0;left:0;
        }
      }
    }
  }
  .planList{
    a{
      color: #333;
    }
    .item{
      background-color: #fff;
      border-left: 0.1333rem solid #4caf50;
    }
  }
</style>

