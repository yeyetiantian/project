<template>
   <div class="clock">
     <div class="head bgL color_white p-25">
       <h1 class="font-24" v-if="0">当前标记打卡位置：</h1>
       <h1 class="font-30 flex-box-btew"><span><!--政协路2001号B区--></span><mu-icon value="location_on"/></h1>
     </div>
     <div class="map bgG">
       <div class="clock-big">
         <div class="clock-big-bg"></div>
         <div class="clock-small" @click="linkPunch">
           <span class="font-48 m-b-10">{{now | formatDate('hh:mm')}}</span>
           <span class="font-30 m-b-20">{{now | formatDate('YY-MM-DD')}}</span>
           <span>打卡</span>
         </div>
       </div>
       <Map :locationFlag="false"></Map>
     </div>
     <div class="p-30">
       <mu-raised-button label="建立目标客户" to="./clock/add" primary fullWidth class="p-t-20 p-b-20 " v-if="0"/>
       <mu-raised-button label="打卡记录查看" to="./clock/record" fullWidth class="p-t-20 p-b-20 m-t-40" />
     </div>
   </div>
</template>
<script>
  import Map from '../util/map.vue'
  export default{
    components: {
      Map
    },
    data () {
      return{
        center: {lng: 0, lat: 0},
        now:new Date()
      }
    },
    methods: {
      linkPunch(){
        this.$router.push('./clock/punch')
      },
    },
    created () {

    }
  }
</script>
<style lang="less" type="text/less">
.clock{
  .map{
    width: 100%;
    height: 50vh;
    position: relative;
  }
  .clock-big{
    width: 7.44rem;
    height: 7.44rem;
    position: absolute;top:0;right:0;left:0;bottom:0;
    z-index: 1;margin: auto;
    .clock-big-bg{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(3, 169, 244, 0.2);
      /*animation: scale 0.3s infinite alternate;*/
    }
    .clock-small{
      width: 5.16rem;
      height: 5.16rem;
      border-radius: 50%;
      background-color: #03a9f4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      text-align: center;
      position: absolute;top:0;right:0;left:0;bottom:0;margin: auto;
      span:last-child{
        font-size: 1.06667rem;
      }
    }
  }
}
@keyframes scale{
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
</style>

