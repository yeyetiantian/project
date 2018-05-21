<template>
  <div class="bgG" style="height: 100%;">
    <div class="flex-box-btew font-36 p-25" style="background-color: #e0e0e1;position: absolute;top:0;width: 100%">
      <span>{{nowDate | formatDate('YY-MM-DD')}}</span>
      <!--<router-link to="./workLog/calendar"><mu-icon value="date_range"  color="#03a9f4"/></router-link>-->
    </div>
    <div style="height: 100vh;padding-bottom: 1.2rem;padding-top: 1.8rem;overflow-y: auto">
      <div v-for="x in logList" :key="x.planId">
        <div class="bgW p-30 m-b-20 font-28" v-if="x.planName">
          <div class="flex-box-btew m-b-20">
            <span class="text-bold font-30" >{{x.planName}}</span>
            <span class="color_green">{{x.planJobnature}}</span>
          </div>
          <div class="flex-box-btew m-b-5">
            <span class="color_999">{{x.custname}}</span>
            <span>{{x.planStartdate}}</span>
          </div>
          <div class="flex-box-btew m-b-20">
            <span class="color_999">{{x.planDetailaddress}}</span>
            <span class="color_blue">{{x.planState}}</span>
          </div>
          <div class="flex-box-btew">
            <span><b>计划目标： </b>{{x.planExpectres}}</span>
          </div>
          <div class="flex-box-btew">
            <span><b>实际完成情况：</b> {{x.planActual}}</span>
          </div>
        </div>
        <div class="bgW m-b-20 font-30 p-40" v-if="!x.planName">
          <pre>{{x.planActual}}</pre>
        </div>
      </div>
      <!--<div class="bgW font-30 p-l-40 flex-box-btew">
        <h1>浦东新区政府新楼盘建设首访 </h1>
        <mu-raised-button label="修改" to="./workLog/edit" class="btn-log-edit" primary/>
      </div>-->
    </div>
    <mu-raised-button label="新增日志" to="/workLog/add" primary fullWidth class="addLog p-t-20 p-b-20 font-30" icon="add"/>
  </div>
</template>

<script>
    export default {
      name: "log",
      data() {
        return {
          nowDate: new Date(),
          logList:[]
        }
      },
      methods:{
        //获取今日日志列表
        getLogList(){
          this.$ajax.post('/Journal/daylist',{})
            .then(result=>{
              this.logList=result.data.data
            })
        }
      },
      created(){
        this.getLogList()
      }
    }
</script>

<style lang="less">
.btn-log-edit{
  width: 3.8rem;
  height: 2.9333rem;
  .mu-raised-button-label{
    font-size: 0.6667rem;
  }
}
  .addLog{
    position: absolute;
    bottom:0;z-index: 10;
  }
</style>
