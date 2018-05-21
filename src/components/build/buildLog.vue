<template>
  <div>
    <div class="flex-box-btew font-36 p-25" style="background-color: #e0e0e1;">
      <span>施工日志管理</span>
      <router-link to="./calendar" class="flex-box"><mu-icon value="date_range"  color="#03a9f4"/><span style="color: #444">日历查看</span></router-link>
    </div>
    <div class="font-36 p-l-25 p-t-30 p-b-25">今天 <big class="font-48">15/04/2018</big></div>
    <div class="logList font-30">
      <a  class="on">
        <p class="flex-box-btew flex-grow p-l-25 p-r-25">
          <span>XXXXXX项目名称</span>
          <span>AM 10:03</span>
        </p>
      </a>
      <a  v-for="x in 4">
        <p class="flex-box-btew flex-grow p-l-25 p-r-25">
          <span>XXXXXX项目名称</span>
          <span>AM 10:03</span>
        </p>
      </a>
    </div>
    <mu-raised-button label="+ 施工日志" primary fullWidth class="p-t-50 p-b-50 font-50 m-t-50" />
  </div>
</template>

<script>
    export default {
        name: "buildLog",
        data() {
            return {}
        }
    }
</script>

<style lang='less'>
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
      &.on{
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
