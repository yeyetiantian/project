<template>
  <div>
    <div class="year font-38"><mu-icon value="arrow_back" class="font-40" @click="pickYear(-1)"/><span>{{currentYear}}年</span><mu-icon value="arrow_forward" class="font-40" @click="pickYear(1)"/></div>
    <div class="month font-38">
          <span class="flex-box">
            <mu-icon value="chevron_left" class="font-50"  @click="pickMonth(-1)"/>
            {{currentMonth-1>-1?monthLongList[currentMonth-1]:'十二月'}}
          </span>
      <span>{{monthLongList[currentMonth]}}</span>
      <span class="flex-box">
            {{currentMonth+1<12?monthLongList[currentMonth+1]:'一月'}}
            <mu-icon value="chevron_right" class="font-50" @click="pickMonth(1)"/>
          </span>
    </div>
    <!-- 星期 -->
    <ul class="weekdays data">
      <li v-for="week in weeks">{{week}}</li>
    </ul>
    <!-- 日期 -->
    <ul class="days data" ref="days">
      <li v-for="(day,i) in days" :key="'day'+i" @click="pick(i)" >
        <div class="num font-28" >
          <b v-if="day.getMonth()===currentMonth">{{day.getDate()}}</b>
          <span v-else>{{day.getDate()}}</span>
        </div>
        <div class="bg" ></div>
        <div class="txt" v-if="star && i === star">开始</div>
        <div class="txt" v-if="end && i === end">结束</div>
        <div class="txt" v-if="!star&&!end">&nbsp;</div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "planDate",
      data() {
          return {
            today:new Date(),
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            weeks:["日","一","二","三","四","五","六"],
            monthList:["01","02","03","04","05","06","07","08","09","10","11","12"],
            monthLongList:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
            days: [],
            selectDaays:[],
            star:null,
            end:null
          }
      },
      methods:{
        initData: function(cur=null) {
          let date;
          if (cur) {
            date = new Date(cur);
          } else {
            date = new Date();
          }
          this.currentDay = date.getDate();
          this.currentYear = date.getFullYear();
          this.currentMonth = date.getMonth();
          this.currentWeek = date.getDay(); // 1...6,0
          let str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
          this.setData();
        },
        setData(){
          this.days = [];
          //获取本月的第一天
          let first=new Date(this.currentYear,this.currentMonth,1);
          //获取本月的最后一天
          let last=new Date(this.currentYear,this.currentMonth+1,0);
          //获取本月所有天数
          for (let i=first.getDate();i<=last.getDate();i++) {
            let d = new Date(this.currentYear ,this.currentMonth, i);
            this.days.push(d);
          }
          //获取上个月的最后一天
          let prvLast=new Date(this.currentYear,this.currentMonth,0);
          //获取本月之前的天数
          for (let i =0 ; i<first.getDay();i++) {
            let d = new Date(prvLast.getFullYear(),prvLast.getMonth(),prvLast.getDate()-i);
            this.days.splice(0,0,d);
          }
          //获取下个月的第一天
          let nextLast=new Date(this.currentYear,this.currentMonth+1,1);
          //获取本月之后的天数
          for (let i = 0; i<7-nextLast.getDay();i++) {
            let d = new Date(nextLast.getFullYear(),nextLast.getMonth(),nextLast.getDate()+i);
            this.days.push(d);
          }
        },
        pick: function(index) {
          alert(index);
        },
        pickYear(type){
          this.currentYear+=type;
          this.setData()
        },
        pickMonth: function(type) {
          this.currentMonth+=type;
          if(this.currentMonth<0){
            this.currentMonth=11;
            this.currentYear--
          }
          if(this.currentMonth>11){
            this.currentMonth=0;
            this.currentYear++
          }
          this.setData()
        },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year,month,day){
          let y = year;
          let m = month+1;
          if(m<10) m = "0" + m;
          let d = day;
          if(d<10) d = "0" + d;
          return y+"-"+m+"-"+d
        }
      },
      created(){
        this.initData()
      }
    }
</script>

<style lang='less' scoped>
  .year,.month{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2667rem 0;
    background-color: #fff;
  }
  .month{
    background-color: #8ca0b3;
    color: #fff;
  }
  .weekdays{
    background-color: #e8eced;
    text-align: center;
  }
  .days{
    background-color: #fff;
  }
  .data{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 14.2857%;
      position: relative;
      padding: 0.26667rem;
      border-right: 1px solid #e0e1e8;
      border-bottom: 1px solid #e0e1e8;
      &:nth-child(7n){
        border-right: 0;
      }
      .num{
        text-align: right;
        span{
          color: #a1b1c2;
        }
      }
      .txt{
        text-align: center;
      }
      .num,.txt{
        position: relative;
        z-index: 2;
      }
      .bg{
        position: absolute;
        top:0;left:0;
        width: 100%;height: 100%;
        background-color: #fff;
        &.current{
          background-color: rgba(225, 236, 247, 0.35);
        }
      }
    }
  }
</style>
