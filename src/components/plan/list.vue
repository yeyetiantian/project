<template>
   <div class="planBox bgG">
     <mt-navbar v-model="selected">
       <mt-tab-item id="1" class="p-20">今日计划</mt-tab-item>
       <mt-tab-item id="2" class="p-20">已完成的计划</mt-tab-item>
       <mt-tab-item id="3" class="p-20">未来的计划</mt-tab-item>
     </mt-navbar>
     <mt-tab-container v-model="selected" swipeable class="p-25 font-28" >
       <mt-tab-container-item id="1">
         <div class="planList">
           <router-link :to="'./plan/info/'+x" v-for="x in 5">
             <div class="item p-30 m-b-20" >
               <div class="flex-box-btew m-b-20">
                 <span class="text-bold font-30" >参加徐汇区政府会议</span>
                 <span class="color_green">拜访客户</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">王科长</span>
                 <span>上午</span>
               </div>
               <div class="flex-box-btew m-b-5">
                 <span class="color_999">徐家汇政府楼建处</span>
                 <span class="color_blue">已打卡</span>
               </div>
               <div class="flex-box-btew m-b-20">
                 <span class="color_999">天钥桥路1899号1号楼办事处</span>
                 <span></span>
               </div>
               <div class="flex-box-btew">
                 <span><b>计划目标： </b>实现合同初步谈判</span>
                 <span></span>
               </div>
             </div>
           </router-link>
         </div>
         <mu-raised-button label="新计划" primary fullWidth class="p-t-20 p-b-20" icon="add"/>
       </mt-tab-container-item>
       <mt-tab-container-item id="2">
         <div class="planList">
           <div class="item p-30 m-b-20" v-for="x in 2">
             <div class="flex-box-btew m-b-20">
               <span class="text-bold font-30" >参加徐汇区政府会议</span>
               <span class="color_green">拜访客户</span>
             </div>
             <div class="flex-box-btew m-b-5">
               <span class="color_999">王科长</span>
               <span>上午</span>
             </div>
             <div class="flex-box-btew m-b-5">
               <span class="color_999">徐家汇政府楼建处</span>
               <span class="color_blue">已打卡</span>
             </div>
             <div class="flex-box-btew m-b-20">
               <span class="color_999">天钥桥路1899号1号楼办事处</span>
               <span></span>
             </div>
             <div class="flex-box-btew">
               <span><b>计划目标： </b>实现合同初步谈判</span>
               <span></span>
             </div>
           </div>
         </div>
       </mt-tab-container-item>
       <mt-tab-container-item id="3">
         <div class="planList">
           <div class="item p-30 m-b-20" v-for="x in 3">
             <div class="flex-box-btew m-b-20">
               <span class="text-bold font-30" >参加徐汇区政府会议</span>
               <span class="color_green">拜访客户</span>
             </div>
             <div class="flex-box-btew m-b-5">
               <span class="color_999">王科长</span>
               <span>上午</span>
             </div>
             <div class="flex-box-btew m-b-5">
               <span class="color_999">徐家汇政府楼建处</span>
               <span class="color_blue">已打卡</span>
             </div>
             <div class="flex-box-btew m-b-20">
               <span class="color_999">天钥桥路1899号1号楼办事处</span>
               <span></span>
             </div>
             <div class="flex-box-btew">
               <span><b>计划目标： </b>实现合同初步谈判</span>
               <span></span>
             </div>
           </div>
         </div>
       </mt-tab-container-item>
     </mt-tab-container>
   </div>
</template>
<script>
  export default{
    data () {
      return{
        selected: '1'
      }
    },
    methods: {

    },
    created () {

    }
  }
</script>
<style lang="less" type="text/less">
  .planBox .mint-tab-container-item{
    height: 16.2133rem;
    overflow-y: auto;
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

