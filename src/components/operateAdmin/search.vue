<template>
  <div class="task">
    <div class="bgG font-28 text-center p-25">搜到1个符合条件的记录！</div>
    <div class="list">
      <div class="head item " style="background-color: #b3e5fc;">
        <div class="left font-32 p-l-20">委派记录（{{appointList.length}}）</div>
        <div class="right p-r-30"></div>
      </div>
      <div class="con">
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
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data (){
        return{
          taskList:[1,2,3,4,5],
          appointList:[1,2],
          searVisible:true
        }
    },
    methods:{

    },
    watch: {},
    computed: {

    },
    mounted () {},
    created () {

    }
  }
</script>

<style lang="less">
  .task{

  }
</style>
