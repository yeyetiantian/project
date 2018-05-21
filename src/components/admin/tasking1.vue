<template>
  <div class="task">
    <div class="list">
      <div class="head item bgL color_white font-36">
        <div class="left font-32 p-l-20">任务列表（{{taskList.length}}）</div>
        <div class="right ">
          <mu-flat-button class="btn color_white" label="创建新任务" icon="add_circle"  @click="proVisible=true"/>
        </div>
      </div>
      <div class="con">
        <div class="item p-l-30 p-r-30 p-t-35 p-b-25" v-if="taskList.length>0" v-for="(x,i) in taskList">
          <router-link :to="'/admin/info/'+i" class="left">
            <p class="font-36 color_black">施工编号：AB-0010987</p>
            <span class="color_999" v-if="i%2===0">2018-20-10 19:20</span>
          </router-link>
          <div class="right">
            <mu-raised-button v-if="i%2===0" class="btn" label="委派任务" @click="csVisible=true" primary></mu-raised-button>
            <span v-if="i%2===1" class="time">2018-20-10 19:20</span>
          </div>
        </div>
        <div class="item p-l-30 p-r-30 p-t-35 p-b-25" v-if="taskList.length===0">暂无任务！</div>
      </div>
    </div>
    <div class="list">
      <div class="head item color_white" style="background-color: #b3e5fc;">
        <div class="left font-32 p-l-20">委派记录（{{appointList.length}}）</div>
        <div class="right p-r-30">
          <mu-text-field hintText="日期 / 班组名 / 项目名称" icon="search" fullWidth style="margin-bottom: 0"/><br/>
        </div>
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
    <!--<mt-actionsheet
      :actions="proList"
      v-model="proVisible">
    </mt-actionsheet>
    <mt-actionsheet
      :actions="csList"
      v-model="csVisible">
    </mt-actionsheet>-->
    <mt-popup  v-model="proVisible" class="proPopup">
      <div class="title bgL color_white font-36 flex-box-btew p-25">
        <span>创建新任务</span><mu-icon value="close" @click="proVisible=false"/>
      </div>
      <div class="popupList font-30">
        <mu-radio v-for="x in proList" :label="x.name" name="group" nativeValue="simple1"  class="item"/>
      </div>
      <div class="flex-box font-30">
        <mu-raised-button label="取消" class="flex-1" @click="proVisible=false"/>
        <mu-raised-button label="下一步" class="flex-1" primary/>
      </div>
    </mt-popup>
    <mt-popup v-model="csVisible" class="proPopup">
      <div class="title bgL color_white font-36 flex-box-btew p-25">
        <span>委派给</span><mu-icon value="close" @click="csVisible=false"/>
      </div>
      <div class="popupList font-30">
        <mu-radio v-for="x in csList" :label="x.name" name="group" nativeValue="simple1"  class="item"/>
        <mu-radio label="杨海林" name="group" nativeValue="simple2"  class="item" v-for="x in 10"/>
      </div>
      <div class="flex-box font-30">
        <mu-raised-button label="取消" class="flex-1" @click="csVisible=false"/>
        <mu-raised-button label="指派" class="flex-1" primary/>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    name: "Tasking",
    data (){
        return{
          taskList:[1,2,3,4,5],
          appointList:[1,2],
          proVisible:false,
          proList:[
            {
              name:'xxx项目一期',
              method(value){
                console.log(value)
              }
            },
            {
              name:'xxx项目而期',
              method(){}
            }
          ],
          proSelect:'',
          csVisible:false,
          csList:[
            {
              name:'王建英'
            },
            {
              name:'王海龙'
            }
          ],
          csSelect:''
        }
    },
    methods:{
      proChange (picker, values) {
        this.proSelect=values
      },
      csChange (picker, values) {
        this.csSelect=values
      },
      linkAdd(){
        console.log(this.proSelect)
        this.$router.push('/admin/add')
      }
    },
    watch: {},
    computed: {
      proSlots(){
        return [
          {
            flex: 1,
            textAlign: 'center',
            values:this.proList
          }
        ]
      },
      csSlots(){
        return [
          {
            flex: 1,
            textAlign: 'center',
            values:this.csList
          }
        ]
      }
    },
    mounted () {},
    created () {

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
    width: 8rem;
    .popupList{
      padding:0.6667rem 1.06667rem;
      max-height: 8.5rem;
      overflow-y: auto;
      .item{
        display: block;
        margin-bottom: 0.6667rem;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
