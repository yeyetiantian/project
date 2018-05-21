<template>
  <div class="bgG logList" >
    <div class="bgL flex-box-cen font-36 color_white p-t-20 p-b-20">
      <span>2018年05月05日</span>
    </div>
    <div class="bgW flex-box-btew p-t-40 p-b-40 p-l-20 p-r-20">
      <span class="font-26 flex-box"><mu-icon value="chevron_left" class="color_blue"/>前一天</span>
      <span class="font-36 color_blue">今天</span>
      <span class="font-26 flex-box">后一天<mu-icon value="chevron_right"/></span>
    </div>
    <div class="p-25 logListBox">
      <div class="item m-b-20" v-for="x in 5">
        <span class="num" :class="x===1?'on':''">5<i></i></span>
        <p class="font-28">
          <span class="m-b-20">施工编号：BQ18-SH00061-GZ001</span>
          <span>施工班组： 瑞瀚 / 邵先章</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "logList",
        data() {
            return {}
        }
    }
</script>

<style lang='less' scoped>
  .logList{
    min-height: 100%;
  }
  .logListBox{
    .item{
      background-color: #fff;
      position: relative;
      padding: 0.4rem 0.4rem 0.4rem 2.1333rem;
      .num{
        position: absolute;
        width: 1.3333rem;
        height: 100%;
        background-color: #d4d3d3;
        top:0;left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        color: #fff;
        i{
          width: 0;
          height: 0;
          border-left: 0.3333rem solid #d4d3d3;
          border-top: 0.3333rem solid transparent;
          border-bottom: 0.3333rem solid transparent;
          position: absolute;
          top:0;bottom:0;margin: auto;
          right:-0.3333rem;
        }
        &.on{
          background-color: #ff9600;
          i{
            border-left-color: #ff9600;
          }
        }
      }
      p{
        span{
          display: block;
          line-height: 1;
        }
      }
    }
  }
</style>
