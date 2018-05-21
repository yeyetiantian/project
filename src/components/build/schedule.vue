<template>
  <div class="bgG">
    <div class="scheule p-t-40 p-b-20 p-l-35 p-r-35 font-30">
      <h1 class="font-36 text-bold m-b-25">{{info.conProname}}</h1>
      <p class="flex-box-btew m-b-15"><span>班组： {{info.construc}} </span><span>{{info.conState}}</span></p>
      <p class="m-b-15"><span>施工编号： {{info.conProcode}}</span></p>
      <p class="m-b-15"><span>当前阶段： {{info.conProprogess}}</span></p>
    </div>
    <mt-tab-container v-model="selected" swipeable class="font-28 bgW" >
      <mt-tab-container-item id="1" class="p-20">
        <mu-timeline iconColor="#b3e5fc">
          <mu-timeline-item v-for="(x,i) in lineList" :key="i">
            <div class="timeLineIcon" :class="x.status" slot="icon" @click="update(x.status,x.name)"></div>
            <div class="flex-box-btew m-b-10" :class="x.status" slot="time">
              <span>{{x.name}}</span>
              <!--<mu-raised-button  label="更多" labelPosition="before" icon="more_horiz" v-if="x.value&&x.value.length>3"/>-->
            </div>
            <div slot="des" class="p-t-25 p-b-25 p-l-30 p-r-30" @click="openTrack(x.name)">
              <p v-if="x.value.length===0">暂无内容</p>
              <p v-for="(j,m) in x.plan" >{{m+1}}.{{j.planActual}}</p>
              <p v-for="(c,i) in x.value" >{{i+1}}.{{c.tempoContent}}</p>
            </div>
          </mu-timeline-item>
        </mu-timeline>
      </mt-tab-container-item>
    </mt-tab-container>
    <mu-dialog :open="trackVisitor" :title="trackTitle+' - 新增'" @close="closeTrack">
      <mu-text-field v-model="trackCon" hintText="进度内容" fullWidth />
      <!--<div class="flex-box flex-box-star">
        <mu-text-field hintText="进度附属文件" />
        <mu-raised-button class="" label="选择文件">
          <input type="file" class="file-button">
        </mu-raised-button>
      </div>-->
      <mu-flat-button slot="actions" @click="closeTrack" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="addTrack" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    name: "schedule",
    data() {
      return {
        id:this.$route.params.id,
        selected: '1',
        info:{},
        lineList:[],
        addVisitor:false,
        contactList:[],
        trackVisitor:false,
        trackTitle:'',
        trackCon:'',
      }
    },
    methods: {
      // 添加收款进度信息
      addContact() {
        this.contactList.push(1);
        this.addVisitor=false;
      },
      //获取项目信息
      getProInfo(){
        this.$ajax.post('task/conprolist',{
          conProid:this.id
        })
          .then(result=>{
            this.info=result.data.data[0]
            this.getTrackList()
          })
      },
      //获取进度列表
      getTrackList(){
        this.$ajax.post('/track/operatelist',{
          conProid:this.id
        })
          .then(result=>{
            let data=result.data.data;
            data.push({
              status:'wait',
              name:'完成',
              value:[]
            })
            let is=false;
            data.forEach(n=>{
              if(n.name===this.info.conProprogess){
                n.status='do';
                is=true
              }else{
                n.status=is?'wait':'complete';
              }
            })
            this.lineList=data
          })
      },
      //更新项目进度
      update(state,name){
        if(state!=='wait'&&state!=='fail')return;
        this.$messagebox.confirm('确定更新项目阶段？')
          .then(action =>{
            if(name==='完成'){
              this.$ajax.post('/task/endupdate',{
                conProid:this.id,
                conState:name,
                //conProprogess:name
              })
                .then(result=>{
                  this.getProInfo()
                })
            }else{
              this.$ajax.post('/task/updateconpro',{
                conProid:this.id,
                conProprogess:name
              })
                .then(result=>{
                  this.getProInfo()
                })
            }

          })
      },
      //打开添加进度内容
      openTrack (title) {
        this.trackVisitor = true
        this.trackTitle = title
      },
      closeTrack () {
        this.trackVisitor = false
      },
      //添加进度内容
      addTrack(){
        this.$ajax.post('/track/add',{
          "conProid": this.id,
          "tempoContent": this.trackCon,
          tempoCode:this.trackTitle,
          //"tenpoFiles": []
        })
          .then(result=>{
            this.trackVisitor = false;
            this.trackCon='';
            this.getProInfo()
          })
      },
      //查看收款进度列表
      getreceList(){
        this.$ajax.post('/project/receList',{
          projId:this.id
        })
          .then(result=>{
            this.contactList=result.data.data
          })
      },
    },
    created(){
      this.getProInfo();
      this.getreceList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/set";
.scheule{
  background-color: @bgcolor;
  color: #fff;
}
  .nextCon{
    box-shadow: 1px 1px 2px 0px
    rgba(0, 0, 0, 0.15);
    border-radius: 0.16rem;
    border: solid 1px #e8e8e8;
  }
</style>
