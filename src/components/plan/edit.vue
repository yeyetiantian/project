<template>
  <form class="form  p-b-50 font-28 bgG">
    <div class="bgW p-t-20 p-l-40 p-r-40">
      <div class="item">
        <label>项目名称：</label>
        <mu-select-field v-model="form.projId" hintText="项目名称" >
          <mu-menu-item v-for="(x,i) in proList" :key="x.projId" :value="x.projId" :title="x.projName" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>项目阶段：</label>
        <mu-select-field v-model="form.planProstage" hintText="项目阶段" >
          <mu-menu-item v-for="(x,i) in dictList" :key="'planProstage_'+i" :value="x.description" :title="x.description" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>计划名：</label>
        <mu-text-field v-model="form.planName"  hintText="请输入计划名称" :error-text="formRule.planName.text" @change="checkfun('planName')"/>
      </div>
      <div class="item">
        <label>工作性质：</label>
        <mu-select-field v-model="form.planJobnature" hintText="工作性质" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="x" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>客户名：</label>
        <mu-select-field v-model="form.custid" hintText="客户名" >
          <mu-menu-item v-for="(x,i) in customerList" :key="x.custid" :value="x.custid" :title="x.custname" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>地址：</label>
        <mu-text-field hintText="省/市/县" v-model="form.planAddress" @focus="areaFlag=true" :error-text="formRule.planAddress.text" />
      </div>
      <div class="item">
        <label></label>
        <mu-text-field v-model="form.planDetailaddress" hintText="详细地址" :error-text="formRule.planDetailaddress.text" @change="checkfun('planDetailaddress')"/>
      </div>
      <div class="item">
        <label>开始时间：</label>
        <mu-date-picker v-model="form.planStartdate" hintText="开始时间" :maxDate="form.planEnddate" :error-text="formRule.planStartdate.text" />
      </div>
      <div class="item">
        <label>结束时间：</label>
        <mu-date-picker v-model="form.planEnddate" hintText="结束时间" :minDate="form.planStartdate" :error-text="formRule.planEnddate.text" />
      </div>
      <div class="item">
        <label>计划目标：</label>
        <mu-select-field v-model="form.planExpectres" hintText="请选择类型" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="x" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>描述：</label>
        <mu-text-field v-model="form.planRemark" hintText="请输入内容" multiLine :rows="3" :rowsMax="6"/>
      </div>
      <div class="item p-b-30">
        <label>附件：</label>
        <div class="flex-box-btew">
          <p class="m-b-20" v-if="0"></p>
          <mu-raised-button label="选择文件">
            <input type="file" class="file-button">
          </mu-raised-button>
        </div>
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存" primary fullWidth class="p-t-20 p-b-20 font-36 " @click="submit"/>
      <mu-raised-button label="取消" to="/plan" fullWidth class="p-t-20 p-b-20 m-t-40 font-36" />
    </div>
    <AreaVue v-model="form.planAddress" :areaFlag="areaFlag" @close="closeArea"></AreaVue>
  </form>
</template>

<script>
  import AreaVue from '../util/area.vue'
    export default {
      name: "Planedit",
      components:{AreaVue},
      data() {
        return {
          id:this.$route.params.id,
          proList: [],
          dictList: [],
          customerList: [],
          serviceTypeList:['参加会议','拜访'],
          serviceSelect:0,
          areaFlag:false,
          areaVal:'',
          form:{
            projId:'',
            planProstage:'',
            planName:'',
            custid:'',
            planJobnature:'参加会议',
            planAddress:'',
            planDetailaddress:'',
            planStartdate:'',
            planEnddate:'',
            planExpectres:'参加会议',
            planRemark:'',
            planDoc:'',
          },
          formRule:{
            planName:{
              text:'',
              msg:'请输入计划名称'
            },
            planAddress:{
              text:'',
              msg:'请选择省/市/县'
            },
            planDetailaddress:{
              text:'',
              msg:'请输入详细地址'
            },
            planStartdate:{
              text:'',
              msg:'请选择开始时间'
            },
            planEnddate:{
              text:'',
              msg:'请选择结束时间'
            },
          },
        }
      },
      watch:{
        'form.planAddress'(){
          this.checkfun('planAddress')
        },
        'form.planStartdate'(){
          this.checkfun('planStartdate')
        },
        'form.planEnddate'(){
          this.checkfun('planEnddate')
        }
      },
      methods: {
        getInfo(){
          this.$ajax.post('/plan/list',{
            planId:this.id
          })
            .then(result=>{
              let info=result.data.data[0]
              for(let i in this.form){
                this.form[i]=info[i]
              }
            })
        },
        addPro() {
          this.proList.push({
            name:'',
            customer:'',
            property:0
          })
        },
        delPro(index) {
          this.proList.splice(index,1)
        },
        closeArea(val){
          this.areaFlag=val
        },
        //获取项目列表
        getProList(){
          return this.$ajax.post('/project/list',{})
            .then(result=>{
              this.proList=result.data.data
              this.form.projId=this.proList.length>0?this.proList[0].projId:''
            })
        },
        //获取项目列表
        getDictList(){
          return this.$ajax.post('/project/dictList',{})
            .then(result=>{
              this.dictList=result.data.data
              this.form.planProstage=this.dictList.length>0?this.dictList[0].description:''
            })
        },
        //获取客户列表
        getCustomerList(){
          return this.$ajax.post('/customer/list',{})
            .then(result=>{
              this.customerList=result.data.data
              this.form.custid=this.customerList.length>0?this.customerList[0].custid:''
            })
        },
        submit(){
          if(!this.checkfun())return
          this.$ajax.post('/plan/update',this.form)
            .then(result=>{
              this.$toast({
                message: '修改成功',
                iconClass: 'icon icon-success',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/plan')
              },1000)
            })
        },
        checkfun(key){
          if(key){
            if(this.formRule[key].rule&&!(this.formRule[key].rule.test(this.form[key]))){
              this.formRule[key].text=this.formRule[key].msg
            }else if(!this.form[key]){
              this.formRule[key].text=this.formRule[key].msg
            }else{
              this.formRule[key].text=''
            }
          }else{
            let flag=true
            for (let i in this.formRule){
              if(!this.form[i]){
                this.formRule[i].text=this.formRule[i].msg
                flag =false
              }else{
                this.formRule[i].text=''
              }
            }
            return flag
          }
        },
      },
      created(){
        this.$ajax.all([this.getProList(), this.getDictList(),this.getCustomerList()])
          .then(this.$ajax.spread(() => {
            this.getInfo();
          }));
      }
    }
</script>

<style lang="less">

</style>
