<template>
  <div class="proBox bgG p-t-25">
    <mt-navbar v-model="selected" class="p-t-30 p-l-25 p-r-25 p-b-30">
      <mt-tab-item id="1" class="p-20">未分配的 ({{noallotList.length}})</mt-tab-item>
      <mt-tab-item id="2" class="p-20">已分配的 ({{allotList.length}})</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" swipeable class="p-25 font-28" >
      <mt-tab-container-item id="1">
        <div class="proList">
          <div class="item p-30 m-b-20 font-30" v-if="noallotList.length===0">
            暂无项目
          </div>
          <div class="item p-30 m-b-20" v-if="noallotList.length>0" v-for="x in noallotList" :key="x.projId" @click="linkInfo(x.projId)">
            <div class="flex-box-btew m-b-20">
              <span class="text-bold font-30 flex-grow" >{{x.projName}}</span>
            </div>
            <div class="flex-box-btew" >
              <span class="color_999">项目编号：<i class="color_green">{{x.projId}}</i></span>
              <span>{{x.projState}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="proList">
          <div class="item p-30 m-b-20 font-30" v-if="allotList.length===0">
            暂无项目
          </div>
          <div class="item p-30 m-b-20" v-if="allotList.length>0" v-for="x in allotList" :key="'no-'+x.projId" @click="linkInfo(x.projId)">
            <div class="flex-box-btew m-b-20">
              <span class="text-bold font-30">{{x.projName}}</span>
            </div>
            <div class="flex-box-btew">
              <span class="color_999">项目编号：<i class="color_green">{{x.projId}}</i></span>
              <span>{{x.projState}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="searchBox p-r-30">
      <mu-text-field hintText="请输入搜索内容" icon="search"/>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Tasking",
      data() {
        return {
          selected: '1',
          allotList:[],
          noallotList:[],
        }
      },
      watch:{

      },
      methods:{
        getconduct(){
          this.$ajax.post('/project/complete',{})
            .then(result => {
              this.noallotList=result.data.data
            })
        },
        getcomplete(){
          this.$ajax.post('/task/distribution',{})
            .then(result => {
              this.allotList=result.data.data
            })
        },
        linkInfo(id){
          this.$router.push('/admin/info/'+id)
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
