<template>
  <div>
    <div class="flex-box-btew font-36 p-25" style="background-color: #e0e0e1;">
      <span>施工日志管理</span>
      <router-link to="./logDate" class="flex-box"><mu-icon value="date_range"  color="#03a9f4"/><span style="color: #444">日历查看</span></router-link>
    </div>
    <div class="font-36 p-l-25 p-t-30 p-b-25">今天 <big class="font-48">{{now | formatDate('YY-MM-DD')}}</big></div>
    <div class="logList font-30">
      <router-link :to="'/build/info/'+x.conProid" v-for="x in prolist" :key="x.conProid">
        <p class="flex-box-btew flex-grow p-l-25 p-r-25">
          <span>{{x.conProname}}</span>
          <span>{{x.conCredate}}</span>
        </p>
      </router-link>
      <p class="p-50 text-center" style="color: #f7075c;" v-if="prolist.length<1">
        今日还没有写日志
      </p>
    </div>
    <mu-raised-button label="+ 施工日志" to="./addlog" primary fullWidth class="p-t-50 p-b-50 font-50 m-t-50" />
  </div>
</template>

<script>
  export default {
    name: "operateLog",
    data() {
        return {
          now:new Date(),
          prolist:[]
        }
    },
    methods:{
      getList(){
        this.$ajax.post('/constrcard/prolist',{})
          .then(result=>{
            this.prolist=result.data.data
          })
      },
    },
    created(){
      this.getList();
    }
  }
</script>

<style lang='less' scoped>
  .logList{
    min-height: 12.3rem;
    >a{
      width: 100%;
      display: flex;
      align-items: center;
      height: 1.24rem;
      color: #474747;
      background-color: #f1f1f1;
      margin-bottom: 0.26667rem;
      &.on,&:hover{
        background-color: #fedc74;
      }
      &:before,&:after{
        content: '';
        display: block;
        width: 0.333rem;
        height: 100%;
      }
      &:before{
        background-color: #81d4fa;
      }
      &:after{
        background-color: #0298dc;
      }
    }
  }
</style>
