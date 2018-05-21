<template>
  <div class="bgG" style="min-height: 100%">
    <!--<div class="text-center font-30 bgL color_white p-25">
      您当前有 <span class="font-36">2</span> 个任务要处理！
    </div>-->
    <div class="buildPlan">
      <div class="item m-b-25" v-for="x in list" :key="x.conProid">
        <h1 class="flex-box-btew p-t-15 p-b-15 p-l-30 p-r-15"><span class="font-36">{{x.conProname}}</span><mu-raised-button :to="'/build/schedule/'+x.conProid" label="进度查看"/></h1>
        <div class="p-30 p-b-40 font-24">
          <p class="m-b-5">施工编号：BQ18-SH00061-GZ001</p>
          <p>班组名称：{{x.construc}}</p>
        </div>
      </div>
      <div class="item m-b-25" v-if="list.length<1">
        <div class="p-30 p-b-40 font-24">
          暂无项目
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "buildPlan",
        data() {
            return {
              list:[]
            }
        },
      methods:{
        getList(){
          this.$ajax.post('task/conprolist',{})
            .then(result=>{
              this.list=result.data.data;
            })
        },
      },
      created(){
          this.getList()
      }
    }
</script>

<style lang='less'>
  .buildPlan{
    padding: 0.4rem 0.333rem;
    .item{
      background-color: #ffffff;
      box-shadow: 1px 1px 2px 0px
      rgba(0, 0, 0, 0.15);
      border-radius: 2px;
      overflow: hidden;
      h1{
        background-color: #c8dee8;
      }
      p{
        color: #474747;
      }
    }
  }
</style>
