<template>
  <div class="task">
    <div class="list">
      <div class="head item bgL color_white font-36">
        <div class="left font-32 p-l-20">任务列表（{{taskList.length}}）</div>
        <div class="right ">
        </div>
      </div>
      <div class="con">
        <div class="item p-l-30 p-r-30 p-t-35 p-b-25" v-if="taskList.length>0" v-for="(x,i) in taskList">
          <router-link :to="'/opadmin/add/'+x.conProid" class="left">
            <p class="font-36 color_black">施工编号：{{x.conProcode}}</p>
          </router-link>
          <div class="right">
            <span class="time">{{x.conCredate}}</span>
          </div>
        </div>
        <div class="item p-l-30 p-r-30 p-t-35 p-b-25" v-if="taskList.length===0">暂无任务！</div>
      </div>
    </div>
    <div class="list" v-if="0">
      <div class="head item " style="background-color: #b3e5fc;">
        <div class="left font-32 p-l-20">委派记录（{{appointList.length}}）</div>
        <div class="right p-r-30">
          <mu-icon value="search" class="color_blue text-bold" @click="searVisible=true"/>
        </div>
      </div>
      <div class="con" style="height: auto">
        <div class="item p-l-30 p-r-30 p-t-35 p-b-25" v-for="x in appointList">
          <div class="left">
            <p class="font-36">施工编号：AB-0010987</p>
            <span class="color_999">2018-20-10 19:20</span>
          </div>
          <div class="right">
            <span class="font-30">王建英</span>
          </div>
        </div>
        <div class="item p-l-30 p-r-30 p-t-35 p-b-25" v-if="appointList.length===0">暂无委派记录！</div>
        <div></div>
      </div>
    </div>
    <mt-popup  v-model="searVisible" class="proPopup">
      <div class="flex-box-btew font-30 p-t-20 p-b-10 p-r-40 search">
        <mu-text-field hintText="日期 / 班组名 / 项目名称 / 施工编号" type="search" icon="search" fullWidth style="margin-bottom: 0"/>
      </div>
      <div class="close font-40">
        <span class="color_white m-r-20" @click="searVisible=false">关闭</span>
        <router-link to="./opadmin/search" class="color_blue" >搜索</router-link>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data (){
        return{
          taskList:[],
          appointList:[1,2],
          searVisible:false
        }
    },
    methods:{
      getList(){
        this.$ajax.post('/task/conslist',{})
          .then(result => {
            this.taskList=result.data.data
          })
      },
    },
    watch: {},
    computed: {

    },
    mounted () {

    },
    created () {
      this.getList()
    }
  }
</script>

<style lang="less">
  .task{
    .con{
      height: 7.46667rem;
      overflow-y: auto;
    }
  }
  .proPopup{
    width: 9.6rem;
    border-radius: 60rem;
    .close{
      position: absolute;
      bottom:-1rem;right:0.8rem;
    }
  }
</style>
