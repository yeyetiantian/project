<template>
  <div class="task">
    <div class="list">
      <div class="head item">
        <div class="left font-32 p-l-20">任务列表（{{taskList.length}}）</div>
        <div class="right">
          <mu-flat-button class="btn" label="创建新任务" icon="add_circle"  @click="proVisible=true"/>
        </div>
      </div>
      <div class="con">
        <div class="item p-l-20 p-r-20 p-t-10 p-b-10" v-if="taskList.length>0" v-for="(x,i) in taskList">
          <router-link :to="'/admin/info/'+i" class="left">
            <p class="font-28">施工编号：AB-0010987</p>
            <span class="color_999" v-if="i%2===0">2018-20-10 19:20</span>
          </router-link>
          <div class="right">
            <mu-raised-button v-if="i%2===0" class="btn" label="委派任务" @click="csVisible=true"></mu-raised-button>
            <span v-if="i%2===1" class="time">2018-20-10 19:20</span>
          </div>
        </div>
        <div class="item" v-if="taskList.length===0">暂无任务！</div>
      </div>
    </div>
    <div class="list">
      <div class="head item">
        <div class="left font-32 p-l-20">委派记录（{{appointList.length}}）</div>
        <div class="right p-r-30">
          <mu-text-field hintText="日期 / 班组名 / 项目名称" icon="search" fullWidth style="margin-bottom: 0"/><br/>
        </div>
      </div>
      <div class="con">
        <div class="item p-l-20 p-r-20 p-t-10 p-b-10" v-for="x in appointList">
          <div class="left">
            <p class="font-28">施工编号：AB-0010987</p>
            <span class="color_999">2018-20-10 19:20</span>
          </div>
          <div class="right">
            <span class="font-28">王建英</span>
          </div>
        </div>
        <div class="item" v-if="appointList.length===0">暂无委派记录！</div>
      </div>
    </div>
    <mt-actionsheet
      :actions="proList"
      v-model="proVisible">
    </mt-actionsheet>
    <mt-actionsheet
      :actions="csList"
      v-model="csVisible">
    </mt-actionsheet>
    <!--<mt-popup position="bottom" v-model="csVisible" class="proPopup">
      <div class="head">
        <mu-raised-button class="btn" label="取消" @click="csVisible=false"></mu-raised-button>
        <mu-raised-button class="btn" label="确定" ></mu-raised-button>
      </div>
      <mt-picker :slots="csSlots" @change="csChange"/>
    </mt-popup>-->
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
              name:'王建英',
              method(value){
                console.log(value)
              }
            },
            {
              name:'王海龙',
              method(){}
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
    width: 100%;
    .head{
      display: flex;
      align-items: center;
      .btn{
        flex: 1;
      }
    }
  }
</style>
