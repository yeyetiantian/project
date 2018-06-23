<template>
  <div class="form  font-28 bgG" style="height: 100vh;overflow-y: auto">
    <div class="bgL color_white p-t-20 p-r-40 p-b-20 m-b-20">
      <div class="item m-b-20">
        <label>项目编号：</label>
        <span>{{pro.projId}}</span>
      </div>
      <div class="item">
        <label>项目名称：</label>
        <span>{{pro.projName}}</span>
      </div>
    </div>
    <div class="p-40 bgW" v-if="taskList.length<1">暂无分配任务</div>
    <div  v-for="x in taskList" :key="x.id">
      <div class="p-t-20 p-r-40 p-b-20 bgW">
        <mu-raised-button label="委派给" @click="openCs(x.projId)" primary style="float: right"/>
        <div class="item m-b-20">
          <label>施工类型：</label>
          <span>{{x.conProtype}}</span>
        </div>
        <div class="item m-b-20">
          <label>施工项目名：</label>
          <span>{{x.conProname}}</span>
        </div>
        <div class="item m-b-20">
          <label>施工地址：</label>
          <span>{{x.conProaddress}}</span>
        </div>
        <div class="item m-b-20">
          <label>施工编号：</label>
          <span>{{x.conProcode}}</span>
        </div>
        <div class="item m-b-20">
          <label>相关文件：</label>
          <span>BQ18-SH00061-GZ001</span>
        </div>
        <div class="item">
          <label>项目说明：</label>
          <span>{{x.conDescription}}</span>
        </div>
      </div>
      <mu-divider/>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="+ 创建新任务" :to="'/admin/add/'+id" primary fullWidth class="p-t-20 p-b-20 font-30 m-b-40"/>
      <mu-raised-button label="返回列表" :to="'/admin'"  fullWidth class="p-t-20 p-b-20 font-30"/>
    </div>
    <cs-prop v-model="csVisible" @close="closeCs" :pro-id="csProId"></cs-prop>
  </div>
</template>

<script>
  import csProp from '../util/csProp'
  export default {
    name: "addTask",
    components:{csProp},
    data (){
      return{
        id:this.$route.params.id,
        pro:{},
        taskList:[],
        csVisible:false,
        csProId:0
      }
    },
    methods:{
      getPro(){
        this.$ajax.post('/task/prolist',{
          projId:this.id
        })
          .then(result=>{
            this.pro=result.data.data[0]
          })
      },
      getInfo(){
        this.$ajax.post('/task/list',{
          projId:this.id
        })
          .then(result=>{
            this.taskList=result.data.data
          })
      },
      linkEdit(){
        this.$router.push('../edit/'+this.id)
      },
      openCs(id){
        this.csVisible=true;
        this.csProId=id
      },
      closeCs(){
        this.csVisible=false
      }
    },
    created(){
      this.getPro();
      this.getInfo()
    }
  }
</script>

<style lang="less">

</style>
