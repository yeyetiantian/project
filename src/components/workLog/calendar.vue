<template>
  <div class="calendar font-40">
    <div class="p-20">
      <div class="year font-60"><mu-icon value="arrow_back" class="font-58" @click="pickYear(-1)"/><span>{{currentYear}}年</span><mu-icon value="arrow_forward" class="font-58" @click="pickYear(1)"/></div>
      <div class="month"><mu-icon value="chevron_left" class="font-58"  @click="pickMonth(-1)"/><span>{{monthLongList[currentMonth]}}</span><mu-icon value="chevron_right" class="font-58" @click="pickMonth(1)"/></div>
    </div>
    <!-- 星期 -->
    <ul class="weekdays data">
      <li v-for="week in weeks">{{week}}</li>
    </ul>
    <!-- 日期 -->
    <ul class="days data">
      <li v-for="day in days" >
        <b v-if="day.getMonth()===currentMonth">{{day.getDate()}}</b>
        <span v-else>{{day.getDate()}}</span>
        <i v-if="day.getFullYear()===today.getFullYear()&&day.getMonth()===today.getMonth()&&day.getDate()===today.getDate()" class="today"></i>
        <i v-else-if="0" class="work"></i>
      </li>
    </ul>
    <mu-popup position="bottom" :open="Popup" popupClass="w-100" :overlay="false" style="width: 100%">
      <div class="popup font-34 color_white">
        <span class="m-l-35"><i class="m-r-20" style="background-color: #42bdf5;"></i>表示打过卡</span>
        <span class="m-l-40 m-r-40"><i class="m-r-20" style="background-color: #ff525c"></i>表示今日</span>
        <mu-flat-button label="关闭" color="#fff" @click="Popup=false"/>
      </div>
    </mu-popup>
  </div>
</template>
<script>
  export default{
    data () {
      return{
        today:new Date(),
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        weeks:["日","一","二","三","四","五","六"],
        monthList:["01","02","03","04","05","06","07","08","09","10","11","12"],
        monthLongList:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        days: [],
        Popup:true
      }
    },
    computed: {
    },
    watch:{
    },
    methods: {
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
        console.log("today:" + str + "," + this.currentWeek);
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
      pick: function(date) {
        alert(this.formatDate( date.getFullYear() , date.getMonth() + 1, date.getDate()));
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
      },
      close(){
        this.Popup=false
      }
    },
    created () {
      this.initData();
    }
  }
</script>
<style lang="less" type="text/less">
  .calendar{
    height: 100%;
    background: linear-gradient(#087ec4,#03a9f4);
    color: #fff;
    .year,.month{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.3333rem 0;
      border-bottom: 1px solid #fff;
    }
    .data{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        width: 13.6%;
        text-align: center;
        padding: 0.26667rem;
        position: relative;
        i{
          display: block;
          width: 1.14667rem;
          height: 1.14667rem;
          border-radius: 50%;
          position: absolute;
          top: 0;bottom: 0;left: 0;right: 0;
          margin: auto;z-index: 1;
          &.today{
            background-color: #ff525c;
          }
          &.work{
            background-color: #42bdf5;
          }
        }
        span,b{
          position: relative;
          z-index: 2;
        }
        span{
          opacity: 0.5;
        }
      }
    }
  }
  .popup{
    width: 100%;
    height: 2.16rem;
    background: #028ac8;
    display: flex;
    align-items: center;
    span{
      display: flex;
      align-items: center;
      i{
        display: inline-block;
        width: 0.7333rem;
        height: 0.73333rem;
        border-radius: 50%;
      }
    }
    .mu-flat-button-label{
      font-size: 0.45333rem;
    }
  }
</style>

