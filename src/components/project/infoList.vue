<template>
  <div class="proBox bgG">
    <mt-navbar v-model="selected" class="p-t-30 p-l-25 p-r-25 p-b-30 ">
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
          <div class="item p-30 m-b-20" v-if="conductList.length>0" v-for="x in conductList" :key="x.projId" @click="$router.push('/project/schedule/'+x.projId)">
            <div class="flex-box-btew m-b-20">
              <span class="text-bold font-30">{{x.projName}}</span>
              <span>{{x.projType}}</span>
            </div>
            <div class="flex-box-btew m-b-20">
              <span class="color_999">负责人： {{x.projMarke}}</span>
              <!--<span><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/></span>-->
            </div>
            <div class="flex-box-btew">
              <span class="color_999">当前阶段：<i class="color_green">{{x.projStage}}</i></span>
              <span>{{x.projStartdata}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="proList">
          <div class="item p-30 m-b-20 font-30" v-if="completeList.length===0">
            暂无项目
          </div>
          <div class="item p-30 m-b-20" v-if="completeList.length>0" v-for="x in completeList">
            <div class="flex-box-btew m-b-20">
              <span class="text-bold font-30">{{x.projName}}</span>
              <span>{{x.projType}}</span>
            </div>
            <div class="flex-box-btew m-b-20">
              <span class="color_999">负责人： {{x.projMarke}}</span>
              <!--<span><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/></span>-->
            </div>
            <div class="flex-box-btew">
              <span class="color_999">当前阶段：<i class="color_green">{{x.projStage}}</i></span>
              <span>{{x.projStartdata}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="searchBox">
      <mu-text-field hintText="日期 / 班组名 / 项目名称" icon="search"/>
      <span class="addCur font-36 p-r-20 p-l-20"><mu-icon-button icon="add_circle" to="project/add"/>项目</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "proInfoList",
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
          this.$ajax.post('/project/conduct',{})
            .then(result => {
              this.conductList=result.data.data
            })
        },
        getcomplete(){
          this.$ajax.post('/project/complete',{})
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

.proBox {
  height: 100%;
  position: relative;
  .mint-navbar{
    width: 100%;
    position: absolute;
    top:0.3333rem;
    z-index: 2;
  }
  .searchBox{
    position: absolute;z-index: 2;
    bottom: 0;
  }
  .mint-tab-container{
    height: 100%;
    padding-top: 2.4rem!important;
    padding-bottom: 2rem!important;
  }
  .mint-tab-container-item{
    height: 100%;
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
}
</style>
