<template>
  <form class="form  p-b-50 font-28 bgG">
    <div class="proItem bgW p-t-20 p-l-40 p-r-40" >
      <div class="item">
        <label>项目名：</label>
        <mu-text-field v-model="formData.projName" hintText="请输入项目名" :errorText="formRule.projName.text" @change="checkfun('projName')"/>
      </div>
      <div class="item">
        <label>营销负责人：</label>
        <mu-text-field v-model="formData.projMarke"  hintText="请输入项目经理" @change="checkfun('projMarke')" :errorText="formRule.projMarke.text"/>
      </div>
      <div class="item">
        <label>联系电话：</label>
        <mu-text-field v-model="formData.projMarkephone" hintText="请输入联系电话" @change="checkfun('projMarkephone')" :errorText="formRule.projMarkephone.text"/>
      </div>
      <div class="item">
        <label>客户名：</label>
        <div class="searchCustomerBox">
          <mu-text-field v-model="custName" hintText="客户名" fullWidth @focus="custShow=true" @blur="custShow=false" :errorText="formRule.custid.text" @change="checkfun('custid')"/>
          <div v-show="custShow" class="searchResult">
            <ul>
              <li v-if="custList.length===0">没有匹配的客户，请添加</li>
              <li v-if="custList.length>0" v-for="x in custList" @click="selecCust(x)">{{x.custname}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="item" v-if="formData.custid&&custName">
        <label>公司名称：</label>
        <mu-text-field v-model="custCompanyName" hintText="客户公司名称" disabled/>
      </div>

      <!--<div class="item" v-for="(x,i) in proList">-->
        <!--<label><mu-icon value="do_not_disturb_on" class="color_red font-28 m-r-10" @click="delPro(i)" v-if="proList.length>1"/>物业名称：</label>-->
        <!--<div class="flex-box-btew flex-box-star">-->
          <!--<mu-select-field v-model="x.property" hintText="请选择类型" >-->
            <!--<mu-menu-item v-for="(x,i) in propertyList" :key="i" :value="i" :title="x" />-->
          <!--</mu-select-field>-->
        <!--</div>-->
      <!--</div>-->
      <div class="flex-box-cen p-b-20">
        <mu-flat-button to="../customer/add" label="添加联系人" primary icon="contacts"/>
        <!--<mu-flat-button label="增加新一条" icon="add_circle" primary @click="addPro"/>-->
      </div>
    </div>
    <div class="optional text-center p-t-20 p-b-20">* 以下是可选项 *</div>
    <div class="bgW p-t-20 p-l-40 p-r-40">
      <div class="item">
        <label>业务类型：</label>
        <div class="flex-box">
          <mu-select-field v-model="formData.projType" hintText="请选择类型">
            <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="x.description" :title="x.description" />
          </mu-select-field>
          <mu-text-field class="m-l-20" v-model="projType" hintText="请输入类型" v-if="formData.projType === '自定义'"/>
        </div>
      </div>
      <div class="item">
        <label>预算金额：</label>
        <mu-text-field v-model="formData.projBudget" type="number" hintText="请输入预算金额" />
      </div>
      <div class="item">
        <label>投标金额：</label>
        <mu-text-field v-model="formData.projBid" type="number" hintText="请输入投标金额" />
      </div>
      <div class="item">
        <label>合同金额：</label>
        <mu-text-field v-model="formData.projCon" type="number" hintText="请输入合同金额" />
      </div>
      <div class="item">
        <label>立项时间：</label>
        <mu-date-picker v-model="formData.projStartdata" hintText="请选择日期" />
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存" primary fullWidth class="p-t-20 p-b-20 " @click="submit"/>
      <mu-raised-button label="取消" fullWidth class="p-t-20 p-b-20 m-t-40" />
    </div>
  </form>
</template>

<script>
    export default {
      name: "add",
      data() {
        return {
          custName:'',
          custList:[],
          custShow:false,
          custCompanyName:'',
          proList: [],
          propertyList:this.$store.state.dicttype,
          serviceTypeList:this.$store.state.dicttype,
          formData:{
            custid:'',
            "projName": "",
            "projType": '',
            "projBudget": "",
            "projBid": "",
            "projCon": "",
            "projMarke": "",
            "projMarkephone": "",
            "projStartdata":""
          },
          projType:'',
          formRule:{
            projName:{
              text:'',
              msg:'请填写项目名称'
            },
            custid:{
              text:'',
              msg:'请选择客户'
            },
            projMarke:{
              text:'',
              msg:'请填写营销负责人'
            },
            projMarkephone:{
              text:'',
              msg:'请填写正确的联系电话',
              rule:/^1[3|4|5|7|8][0-9]\d{8}$/
            },
          }
        }
      },
      watch:{
        custName(val){
          if(val){
            this.searchCustomer()
          }else{
            this.formData.custid='';
          }
        }
      },
      methods: {
        /*addPro() {
          this.proList.push({
            name:'',
            customer:'',
            property:0
          })
        },
        delPro(index) {
          this.proList.splice(index,1)
        },*/
        submit(){
          if(!this.checkfun()){
            return
          }
          if(this.formData.projType==='自定义'&&this.projType){
            this.formData.projType = this.projType
          }
          this.$ajax.post('/project/add',this.formData)
            .then(result => {
              this.$toast({
                message: '创建成功',
                iconClass: 'icon icon-success',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/project')
              },1000)
            })
        },
        checkfun(key){
          if(key){
            if(this.formRule[key].rule&&!(this.formRule[key].rule.test(this.formData[key]))){
              this.formRule[key].text=this.formRule[key].msg
            }else if(!this.formData[key]){
              this.formRule[key].text=this.formRule[key].msg
            }else{
              this.formRule[key].text=''
            }
          }else{
            let flag=true
            for (let i in this.formRule){
              if(!this.formData[i]){
                this.formRule[i].text=this.formRule[i].msg
                flag =false
              }else{
                this.formRule[i].text=''
              }
            }
            return flag
          }
        },
        //查询客户
        searchCustomer(){
          if(!this.custName){
            return;
          }
          this.$ajax.post('/customer/vaguelist',{
            custname:this.custName
          })
            .then(result=>{
              this.custList=result.data.data
            })
        },
        //选择客户
        selecCust(obj){
          this.custName=obj.custname;
          this.formData.custid=obj.custid;
          this.custCompanyName=obj.custcompany;
          this.formRule.custid.text=''
        }
      },
      created(){
        this.serviceTypeList.push({
          description: '自定义'
        })
      }
    }
</script>

<style lang="less">
.proItem{

}

</style>
