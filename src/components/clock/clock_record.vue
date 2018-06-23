<template>
    <div class="clock-record bgG" style="min-height: 100%">
      <div class="flex-box-btew font-36 p-25" style="background-color: #e0e0e1;">
        <span>{{now | formatDate('YY-MM-DD')}}</span>
        <span>今日打卡：{{ddlist.length}}次</span>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <router-link to="./calendar" v-if="0"><mu-icon value="date_range"  color="#03a9f4"/></router-link>
      </div>
      <ul class="_list p-t-20 p-l-25 p-r-25 p-b-40">
        <li v-for="x in ddlist" :key="'dd'+x.clockDate">
          <div class="time font-46">
            <mu-icon value="update" class="font-46 m-b-20"/>
            <span>{{x.clockDate.split(' ')[1]}}</span>
          </div>
          <div class="con p-l-20 p-t-15 p-b-15 p-r-40 font-24">
            <span class="font-30">{{x.clockState}}</span>
            <div class="img-box m-t-10 m-b-10">
              <div class="img m-r-20"></div>
              <div class="img"></div>
            </div>
            <i>地址：{{x.clockAddress}}</i>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "clock_record",
      data() {
        return {
          now:new Date(),
          ddlist:[]
        }
      },
      methods:{
        getList(){
          this.$ajax.post('/clock/ddlist',{})
            .then(result=>{
              this.ddlist=result.data.data
            })
        }
      },
      created(){
        this.getList()
      }
    }
</script>

<style lang="less" scoped>
.clock-record{
  ._list{
    li{
      background-color: #fff;
      display: flex;
      align-items: stretch;
      margin-bottom: 0.26667rem;
      .time{
        width:3.02667rem;
        background-color: #81d4fa;
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      .con{
        .img-box{
          padding-bottom: 0;
          .img{
            width: 0.8rem;
            height: 0.8rem;
          }
        }
        i{
          color: #666;
        }
      }
    }
  }
}
</style>
