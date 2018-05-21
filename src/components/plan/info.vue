<template>
  <div class="planInfo bgG font-28">
    <div class="bgL color_white text-center font-40 p-30">
      <h1>2018年4月1号 <span class="font-30">星期四</span></h1>
    </div>
    <div class="bgW p-30">
      <div class="flex-box-btew m-b-30">
        <b class="font-38">{{info.planName}}</b>
        <span class="color_green font-32">{{info.planExpectres}}</span>
      </div>
      <div class="flex-box-btew m-b-10">
        <span class="color_999">{{info.custname}}</span>
        <span>{{info.planStartdate}}</span>
      </div>
      <div class="flex-box-btew m-b-10">
        <span class="color_999">{{info.planDetailaddress}}</span>
        <span class="color_blue">{{info.planState}}</span>
      </div>
      <div class="flex-box-btew m-b-30">
        <span><b>计划目标： </b>{{info.planExpectres}}</span>
        <span></span>
      </div>
      <div class="flex-box-btew m-b-30" v-if="info.planActual">
        <span><b>实际完成情况： </b>{{info.planActual}}</span>
        <span></span>
      </div>
      <mu-divider/>
      <div class="flex-box-btew m-b-10 m-t-25">
        <span class="color_999">项目名称：{{info.projName}}</span>
        <span></span>
      </div>
      <div class="flex-box-btew m-b-10">
        <span class="color_999">项目阶段：{{info.projStage}}</span>
        <span></span>
      </div>
    </div>
    <div class="bgW m-t-20 p-t-30 p-l-30 p-r-30 p-b-10 m-b-20" v-if="compeletShow">
      <div class="text-bold">实际完成情况： </div>
      <mu-text-field v-model="planActual" hintText="请输入实际完成情况" multiLine :rows="3" :rowsMax="6" fullWidth style="margin-bottom: 0" :error-text="planActualMsg" @change="checkfun"/>
    </div>
    <div class="p-20">
      <mu-raised-button v-if="info.planState!=='已完成'&&!compeletShow" label="完成计划" @click="compeletShow=true" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button v-if="compeletShow" label="完成" @click="compeletPlan" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button v-if="!compeletShow" label="关闭" to="/plan" fullWidth class="p-t-20 p-b-20 m-t-20" />
      <mu-raised-button v-if="compeletShow" label="取消" @click="compeletShow=false" fullWidth class="p-t-20 p-b-20 m-t-20" />
    </div>
  </div>
</template>

<script>
    export default {
      name: "planInfo",
      data() {
        return {
          id:this.$route.params.id,
          stateClass:'',
          info:{},
          planActual:'',
          planActualMsg:'',
          compeletShow:false
        }
      },
      methods:{
        getInfo(){
          this.$ajax.post('/plan/list',{
            planId:this.id
          })
            .then(result=>{
              this.info=result.data.data[0]
            })
        },
        //完成计划
        compeletPlan(){
          if(!this.checkfun())return;
          this.$ajax.post('/plan/endupdate',{
            planId:this.id,
            planActual:this.planActual
          })
            .then(result=>{
              this.compeletShow=false
              this.$toast({
                message: '计划已完成',
                iconClass: 'icon icon-success',
                duration: 2000
              });
              this.getInfo()
            })
        },
        checkfun(){
          if(!this.planActual){
            this.planActualMsg='请输入实际完成情况';
            return false
          }else{
            this.planActualMsg='';
            return true
          }
        }
      },
      created(){
        this.getInfo()
      }
    }
</script>

<style lang="less">
  .planInfo{
    min-height: 17.7866rem;
  }
</style>
