<template>
  <section>
    <mu-appbar title="进行中的定期检查--新增" style="position: fixed">
      <mu-flat-button label="返回" slot="right" @click="$router.push(`/blog_info/${id}`)"/>
    </mu-appbar>
    <form class="form font-28 bgG " style="padding-top: 58px">
      <div class="bgW p-t-20 p-r-30 p-b-30">
        <div class="item">
          <label>服务类型：</label>
          <select class="selectClaa" v-model="form.busiType">
            <option v-for="x in serviceType" :key="`serviceType`+x.dictval" :value="x.dictval">{{x.description}}</option>
          </select>
        </div>
        <div class="item">
          <label>经办人：</label>
          <mu-text-field disabled hintText="经办人" value="17621728675"/>
        </div>
        <div class="item posit">
          <label>开始时间：</label>
          <div class="flex-box">
            <mu-date-picker v-model="date.starD" format="YYYYMMDD" hintText="开始日期" :max-date="date.endD" full-width/>
            <mu-time-picker v-model="date.starT" hintText="开始时间" full-width format="24hr" class="p-l-30"/>
          </div>
        </div>
        <div class="item posit">
          <label>结束时间：</label>
          <div class="flex-box">
            <mu-date-picker v-model="date.endD" format="YYYYMMDD" hintText="结束日期" :min-date="date.starD" full-width/>
            <mu-time-picker v-model="date.endT" hintText="结束时间" full-width format="24hr" class="p-l-30"/>
          </div>

        </div>
        <!--<div class="item">
          <label>玻璃列表：</label>
          <select class="selectClaa" placeholder="请选择玻璃列表...">
            <option value="0">维修</option>
            <option value="1">维修1</option>
          </select>
        </div>-->
        <div class="item">
          <label>处理中状态：</label>
          <select class="selectClaa" v-model="form.objAstatus" placeholder="请选择处理中状态...">
            <option v-for="x in problemStatus" :key="`problemStatus`+x.dictval" :value="x.description">{{x.description}}</option>
          </select>
        </div>
        <div class="item">
          <label>问题类型：</label>
          <select class="selectClaa" v-model="form.objBstatus" placeholder="请选择问题类型..." @change="getobjBstatus">
            <option v-for="x in problemType" :key="`problemType`+x.dictval" :value="x.dictval">{{x.description}}</option>
          </select>
        </div>
        <div class="item posit">
          <label>问题位置：</label>
          <div class="flex-box">
            <select class="selectClaa" v-model="form.orientation">
              <option v-for="x in direction" :key="`direction`+x.dictval" :value="x.description">{{x.description}}</option>
            </select>
            —
            <mu-text-field style="width: 3em;" v-model="form.storeyCnt"></mu-text-field>
            <span>楼—左起</span>
            <mu-text-field style="width: 3em" v-model="form.cellCnt"></mu-text-field>
            吊
          </div>
        </div>
        <div class="item posit">
          <label></label>
          <div class="flex-box">
            <mu-text-field style="width: 3em" v-model="form.cellCnt1"></mu-text-field>
            <span>单元</span>
            <mu-text-field style="width: 3em" v-model="form.rowCnt"></mu-text-field>
            行
            <mu-text-field style="width: 3em"  v-model="form.lineCnt"></mu-text-field>
            列
          </div>
        </div>
        <div class="item posit">
          <label>附件上传：</label>
          <div class="flex-box">
            <div class="flex-box" style="position: relative;">
              <mu-icon value="add_a_photo"></mu-icon>
              <up @onsucccess="upimg1" :image="true" :option="imgOption"></up>
              <mu-text-field full-width  hintText="施工前照片" v-model="imgs.b.desc"></mu-text-field>
            </div>
            <div class="flex-box m-l-20" style="position: relative;">
              <mu-icon value="add_a_photo"></mu-icon>
              <up @onsucccess="upimg2" :image="true" :option="imgOption"></up>
              <mu-text-field full-width hintText="施工后照片" v-model="imgs.a.desc"></mu-text-field>
            </div>
          </div>
        </div>
        <div class="item">
          <label>工作日志：</label>
          <mu-text-field v-model="form.commDesc" hintText="内容描述，技术要求..." multiLine :rows="3" :rowsMax="6"  />
        </div>
      </div>
      <div class="p-l-50 p-r-50 m-t-40">
        <mu-raised-button label="保存" @click="submit" primary fullWidth class="p-t-20 p-b-20 m-b-40" />
        <mu-raised-button label="取消" :to="`/blog_info/${id}`"  fullWidth class="p-t-20 p-b-20"/>
      </div>
    </form>
  </section>
</template>

<script>
  import up from '../util/update.vue'
  export default {
    name: "add_under_way",
    components: {
      up
    },
    data() {
        return {
          id:this.$route.params.id,
          phone:this.$store.state.phone,
          config:{baseURL:this.$ajax.defaults.baseURL1},
          serviceType:[],
          problemType:[],
          problemStatus:[],
          direction:[],
          date:{
            starD:'',
            starT:'',
            endD:'',
            endT:'',
          },
          imgOption:{
            url:'/ht/content/uploadByRequestObj',
            name:'file'
          },
          imgs:{
            b:{},
            a:{}
          },
          form:{
            "commandNo": this.$route.params.id,//指令Id
            "nextFlag": "0",//执行流 0 处理中点击，1上传等待点击
            "startDate": '',//开始时间
            "finishRdate":'',//完成时间
            "orientation": "",//方位
            "storeyCnt": '',//楼层
            "cellCnt": '',//吊
            "cellCnt1": "",
            "rowCnt": "",
            "lineCnt": "",
            "objAstatus": "",//正常
            "docUrl": "",//图片或附件
            "busiType": "",//业务类型
            "objBstatus": "",//整改编号
            "objFinded": "",//整改值
             commDesc:'',
            loginName:this.$store.state.phone
          }
        }
    },
    watch:{
      date: {
        handler: function (val, oldVal) {
          this.form.startDate=val.starD+' '+val.starT
          this.form.finishRdate=val.endD+' '+val.endT
        },
        deep: true
      }
    },
    methods:{
      getdeic(){
        this.$ajax.post('/dict/comm/thirdWattingDict',{})
          .then(result=>{
            if(result){
              this.direction=result.data.data.direction
              this.form.orientation=this.direction[0].description

              this.problemStatus=result.data.data.problemStatus
              this.form.objAstatus=this.problemStatus[0].description

              this.problemType=result.data.data.problemType
              this.form.objBstatus=this.problemType[0].dictval
              this.form.objFinded=this.problemType[0].description

              this.serviceType=result.data.data.serviceType
              this.form.busiType=this.serviceType[0].dictval
            }
          })
      },
      submit(){
        if(!this.date.starD||!this.date.starT||!this.date.endD||!this.date.endT){
          alert('请选择开始或结束时间')
          return
        }
        if(!this.form.storeyCnt||!this.form.cellCnt||!this.form.cellCnt1||!this.form.rowCnt||!this.form.lineCnt){
          alert('请完善问题位置')
          return
        }
        if(!this.imgs.b.desc||!this.imgs.b.desc){
          alert('请上传施工前或施工后照片')
          return
        }
        if(!this.form.commDesc){
          alert('请输入工作内容')
          return
        }
        this.form.docUrl=this.imgs.b.msg+'|'+this.imgs.a.msg
        this.$ajax.post('command/comm/changeCommandStatus',this.form,this.config)
          .then(result=>{
            if(result.data.code===0){
              this.$router.push('/blog_info')
            }else{
              alert(result.data.msg)
            }
          })
      },
      upimg1(data){
        this.imgs.b=data
      },
      upimg2(data){
        this.imgs.a=data
      },
      getobjBstatus(){
        this.problemType.forEach(n=>{
          if(n.dictval===this.form.objBstatus){
            this.form.objFinded=n.description
          }
        })
      }
    },
    created(){
      this.getdeic()
    }
  }
</script>

<style lang='less'>
.selectClaa{
  line-height: 36px;height: 38px;border: 0;border-bottom: 1px solid #333;margin-bottom: 8px;
}
  .posit .mu-text-field-input{
    text-align: center;
  }
</style>
