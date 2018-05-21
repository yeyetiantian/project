<template>
  <div class="proBox bgG p-t-25">
    <mt-navbar v-model="selected" class="p-t-30 p-l-25 p-r-25 p-b-30">
      <mt-tab-item id="1" class="p-20">当前项目 ({{conductList.length}})</mt-tab-item>
      <mt-tab-item id="2" class="p-20">已完成的 ({{completeList.length}})</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" swipeable class="p-25 font-28" >
      <mt-tab-container-item id="1">
        <!--<div class="flex-box-btew m-b-20">
          <span>进行中的项目 10个</span>
          <span class="color_red">需要进一步跟踪的有 3个</span>
        </div>-->
        <div class="proList">
          <div class="item p-30 m-b-20 font-30" v-if="conductList.length===0">
            暂无项目
          </div>
          <div class="item p-30 m-b-20" v-if="conductList.length>0" v-for="x in conductList" :key="x.conProid" @click="$router.push('/build/schedule/'+x.conProid)">
            <div class="flex-box-btew m-b-20">
              <span class="text-bold font-30">{{x.conProname}}</span>
              <span>{{x.conState}}</span>
            </div>
            <div class="flex-box-btew m-b-20">
              <span class="color_999">班组： {{x.construc}}</span>
              <!--<span><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/></span>-->
            </div>
            <div class="flex-box-btew">
              <span class="color_999">当前阶段：<i class="color_green">{{x.conProprogess}}</i></span>
              <span>{{x.conCredate}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="proList">
          <div class="item p-30 m-b-20 font-30" v-if="completeList.length===0">
            暂无项目
          </div>
          <div class="item p-30 m-b-20" v-if="completeList.length>0" v-for="x in completeList" :key="x.conProid" @click="$router.push('/build/schedule/'+x.conProid)">
            <div class="flex-box-btew m-b-20">
              <span class="text-bold font-30">{{x.conProname}}</span>
              <span>{{x.conState}}</span>
            </div>
            <div class="flex-box-btew m-b-20">
              <span class="color_999">班组： {{x.construc}}</span>
              <!--<span><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/></span>-->
            </div>
            <div class="flex-box-btew">
              <span class="color_999">当前阶段：<i class="color_green">{{x.conProprogess}}</i></span>
              <span>{{x.conCredate}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="searchBox p-r-30">
      <mu-text-field hintText="日期 / 班组名 / 项目名称" icon="search"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "proList",
      data() {
        return {
          selected: '1',
          conductList:[],
          completeList:[],
        }
      },
      watch:{

      },
      methods:{
        getconduct(){
          this.$ajax.post('/task/conprolist',{})
            .then(result => {
              this.conductList=result.data.data
            })
        },
        getcomplete(){
          this.$ajax.post('/task/endconprolist',{})
            .then(result => {
              this.completeList=result.data.data
            })
        },
      },
      created(){
        this.getconduct();
        this.getcomplete()
      }
    }
</script>

<style lang="less">
  @import "../../assets/less/set";

.proBox .mint-tab-container-item{
  height: 13.4rem;
  overflow-y: auto;
}

  [data-dpr="1"] .mint-tab-item .mint-tab-item-label{
    font-size:14px;
  }
  [data-dpr="2"] .mint-tab-item .mint-tab-item-label{
    font-size: 28px;
  }
  [data-dpr="3"] .mint-tab-item .mint-tab-item-label{
    font-size: 42px;
  }
</style>
