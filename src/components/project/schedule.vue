<template>
  <div class="bgG">
    <div class="scheule p-t-40 p-b-20 p-l-35 p-r-35 font-30">
      <h1 class="font-36 text-bold m-b-25">{{info.projName}}</h1>
      <p class="flex-box-btew m-b-15"><span>项目负责人： {{info.projMarke}} </span><span>{{info.projType}}</span></p>
      <p class="m-b-15"><span>合同编号： 无</span></p>
      <p class="m-b-15"><span>当前阶段： {{info.projStage}}</span></p>
    </div>
    <mt-navbar v-model="selected" class="m-t-25 scheuletab">
      <mt-tab-item id="1" class="p-20">项目阶段</mt-tab-item>
      <mt-tab-item id="2" class="p-20">收款</mt-tab-item>
      <mt-tab-item id="3" class="p-20">满意度</mt-tab-item>
    </mt-navbar>
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
        <!--<mu-raised-button label="下一步计划" primary fullWidth class="p-t-20 p-b-20 m-b-25" />
        <mu-text-field hintText="下一步计划的描述文字内容。。。。。。。" multiLine fullWidth :rows="3" :rowsMax="6" :underlineShow	="false" class="p-30 nextCon"/>-->
        <mu-raised-button label="关闭" to="/project" fullWidth class="p-t-20 p-b-20" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="form p-b-40 contact">
          <div class="text-center font-36 p-t-40 p-b-30">
            合同总金额：<span class="font-48 color_red">{{info.projCon}}</span>
          </div>
          <div v-for="(x,i) in contactList">
            <div class="item bgG p-l-30 p-r-30 p-t-25 p-b-25 m-b-15">
              <label>收款笔数：</label>
              <span>第{{x.pecePen}}笔</span>
            </div>
            <div class="item p-l-30 p-r-30 m-b-15">
              <label>开票金额：</label>
              <span>{{x.peceBillmoney}}</span>
            </div>
            <div class="item p-l-30 p-r-30 m-b-15">
              <label>开票日期：</label>
              <span>{{x.peceDate}}</span>
            </div>
            <div class="item p-l-30 p-r-30 m-b-15">
              <label>到账日期：</label>
              <span>{{x.peceAccount}}</span>
            </div>
            <div class="item p-l-30 p-r-30">
              <label>实际到帐金额：</label>
              <span>{{x.peceAccountmoney}}</span>
            </div>
          </div>
          <mu-divider class="m-t-15 m-b-15"/>
          <!--<div class="item p-l-30 p-r-30">
            <label>尾款：</label>
            <span style="color: #47adfc">100,0000</span>
          </div>-->
          <form class="p-30" v-if="addVisitor">
            <div class="item">
              <label>收款笔数：</label>
              <mu-text-field
                hintText="请输入收款笔数" v-model="recrForm.pecePen" :error-text="recrFormRule.pecePen.text" type="number" @change="checkrecr('pecePen')"/>
            </div>
            <div class="item">
              <label>开票金额：</label>
              <mu-text-field hintText="请输入开票金额" v-model="recrForm.peceBillmoney" :error-text="recrFormRule.peceBillmoney.text" type="number" @change="checkrecr('peceBillmoney')"/>
            </div>
            <div class="item">
              <label>开票日期：</label>
              <mu-date-picker hintText="请选择开票日期" v-model="recrForm.peceDate" :error-text="recrFormRule.peceDate.text"/>
            </div>
            <div class="item">
              <label>实际到帐金额：</label>
              <mu-text-field hintText="请输入实际到帐金额" v-model="recrForm.peceAccountmoney" :error-text="recrFormRule.peceAccountmoney.text" type="number" @change="checkrecr('peceAccountmoney')"/>
            </div>
            <div class="item">
              <label>到账日期：</label>
              <mu-date-picker hintText="请选择到账日期" v-model="recrForm.peceAccount" :error-text="recrFormRule.peceAccount.text" />
            </div>
            <!--<div class="item">
              <label>尾款：</label>
              <div class="flex-box-btew flex-box-star">
                <mu-text-field hintText="300,0000" style="width: 50%"/>
                <mu-raised-button label="设置提醒日期" class="m-l-10 flex-grow" secondary/>
              </div>
            </div>-->
          </form>
          <div class="p-l-50 p-r-50 m-t-40">
            <mu-raised-button label="+ 多笔金额" primary fullWidth class="p-t-20 p-b-20" v-if="!addVisitor" @click="addVisitor=true"/>
            <mu-raised-button label="确认保存" primary fullWidth class="p-t-20 p-b-20 " v-if="addVisitor" @click="recradd"/>
            <mu-raised-button  v-if="addVisitor" @click="addVisitor=false" label="取消" fullWidth class="p-t-20 p-b-20 m-t-40" />
            <mu-raised-button v-if="!addVisitor" to="/project" label="关闭" fullWidth class="p-t-20 p-b-20 m-t-40" />
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3"></mt-tab-container-item>
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
        info:{},
        selected: '1',
        lineList:[],
        addVisitor:false,
        contactList:[],
        trackVisitor:false,
        trackTitle:'',
        trackCon:'',
        recrForm:{
          "projId": this.$route.params.id,
          "pecePen": "",
          "peceBillmoney": "",
          "peceDate": "",
          "peceAccount": "",
          "peceAccountmoney": ""
        },
        recrFormRule:{
          "pecePen":{
            text:'',
            msg:'请输入收款笔数'
          },
          "peceBillmoney": {
            text:'',
            msg:'请输入开票金额'
          },
          "peceDate": {
            text:'',
            msg:'请选择开票日期'
          },
          "peceAccount": {
            text:'',
            msg:'请选择到账日期'
          },
          "peceAccountmoney": {
            text:'',
            msg:'请输入实际到帐金额'
          }
        }
      }
    },
    watch:{
      'recrForm.peceDate'(){
        this.checkrecr('peceDate')
      },
      'recrForm.peceAccount'(){
        this.checkrecr('peceAccount')
      }
    },
    computed:{
      totalRect(){
        let price=0
        this.contactList.forEach(n=>{
          price+=Number()
        })
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
        this.$ajax.post('/project/list',{
          projId:this.id
        })
          .then(result=>{
            this.info=result.data.data[0]
            this.getTrackList()
          })
      },
        //获取进度列表
      getTrackList(){
        this.$ajax.post('/track/list',{
          projId:this.id
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
              if(n.name===this.info.projStage){
                n.status='do';
                is=true
              }else{
                n.status=is?'wait':'complete';
              }
            })
            data.push({
              status:'fail',
              name:'终止',
              value:[]
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
              this.$ajax.post('/project/updatecomplete',{
                projId:this.id,
                projStage:name
              })
                .then(result=>{
                  this.getProInfo()
                })
            }else{
              this.$ajax.post('/project/update',{
                projId:this.id,
                projStage:name
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
          "projId": this.id,
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
      //添加收款进度信息
      recradd(){
        if(!this.checkrecr())return;
        this.$ajax.post('/project/recradd',this.recrForm)
          .then(result=>{
            this.getreceList();
            this.addVisitor=false;
          })
      },
      checkrecr(key){
        if(key){
          if(!this.recrForm[key]){
            this.recrFormRule[key].text=this.recrFormRule[key].msg
          }else{
            this.recrFormRule[key].text=''
          }
        }else{
          let flag=true
          for (let i in this.recrFormRule){
            if(!this.recrForm[i]){
              this.recrFormRule[i].text=this.recrFormRule[i].msg
              flag =false
            }else{
              this.recrFormRule[i].text=''
            }
          }
          return flag
        }
      }
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
