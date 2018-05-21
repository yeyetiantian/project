<template>
  <form class="customer form p-t-20 p-b-20">
    <div class="base item p-l-40 p-r-40">
      <label class="face text-center">
        <img src="" alt="">
        <span class="font-24">添加图片</span>
      </label>
      <div class="con">
        <mu-text-field v-model="form.custname" :error-text="formRule.custname.text" @change="checkfun('custname')" hintText="姓名" fullWidth /><br/>
        <mu-text-field v-model="form.custposition" hintText="职位" fullWidth  :error-text="formRule.custposition.text" @change="checkfun('custposition')"/><br/>
        <mu-text-field v-model="form.custphone" hintText="电话" fullWidth  :error-text="formRule.custphone.text"  @change="checkfun('custphone')" type="number"/><br/>
        <!--<mu-text-field v-model="form.custcompany" hintText="单位名" fullWidth :error-text="formRule.custcompany.text"  @change="checkfun('custcompany')"/><br/>-->
        <div class="searchCustomerBox">
          <mu-text-field v-model="form.orgCfname" hintText="所属机构" fullWidth @focus="orgShow=true" @blur="orgShow=false" :errorText="formRule.orgCfname.text" @change="checkfun('orgCfname')"/>
          <div v-show="orgShow" class="searchResult">
            <ul>
              <li v-if="orgList.length===0">没有匹配的机构</li>
              <li v-if="orgList.length>0" v-for="m in orgList" @click="selecOrg(m)">{{m.orgCfname}}</li>
            </ul>
          </div>
        </div>
        <mu-text-field v-model="form.custcompaddress" hintText="办公地址" fullWidth :error-text="formRule.custcompaddress.text"  @change="checkfun('custcompaddress')"/><br/>
      </div>
    </div>
    <div class="vice p-l-40 p-r-40 p-b-50">
      <div class="item center">
        <mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>
        <span class="font-28 flex-box">所辖建筑全称 <i class="color_red m-l-20">{{formRule.custBuilds.text}}</i></span><br>
      </div>
      <div v-for="(x,i) in form.custBuilds" :key="'build'+i">
        <div class="item noLabel">
          <label class="m-r-25"><mu-icon value="do_not_disturb_on" class="color_red font-28 m-r-10" @click="delBuild(i)"/></label>
          <!--<mu-text-field v-model="x.buildCfname" hintText="建筑名称"/>-->
          <div class="searchCustomerBox">
            <mu-text-field v-model="x.buildCfname" hintText="建筑名称" fullWidth @focus="x.buildShow=true" @blur="x.buildShow=false" />
            <buildSearch v-model="x.buildCfname" :show="x.buildShow" :index="i" @clickname="selectBuild"></buildSearch>
          </div>
        </div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-select-field v-model="x.buildType" hintText="请选择类型" multiple>
            <mu-menu-item v-for="(x,i) in buildTypeList" :key="'buildType'+i" :value="x.description" :title="x.description" />
          </mu-select-field>
        </div>
      </div>
    </div>
    <div class="m-b-20 p-t-20 p-b-20 p-l-40 p-r-40 optional">
      <span class="font-28 p-l-30">附加信息 <i class="color_999 font-24">（可以不填写）</i></span><br>
    </div>
    <div class="vice m-t-20 p-l-40 p-r-40">
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" class="color_blue"/>家庭地址：</div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-text-field hintText="省/市/县" v-model="form.custhomeaddress" @labelClick="areaFlag=true" @focus="$event.target.blur()"/>
        </div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-text-field v-model="form.custhomedetaaddress" hintText="详细地址"/>
        </div>
        <!--<div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-text-field hintText="请填写邮编"/>
        </div>-->
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>生日：</div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-date-picker hintText="请选择生日" v-model="form.custbirthday"/>
        </div>
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>籍贯：</div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-text-field hintText="请填写籍贯" v-model="form.custhometown"/>
        </div>
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addFamily" class="color_blue"/>家庭成员：</div>
        <div class="item noLabel center" v-for="(x,i) in custfamilymember">
          <label class="m-r-25"><mu-icon value="do_not_disturb_on" class="color_red font-28 m-r-10" @click="delFamily(i)"/></label>
          <mu-text-field v-model="x.name" hintText="请填写类型" style="width: 30%" class="m-r-20"/>
          <mu-text-field v-model="x.relation" hintText="请填写姓名" style="width: 30%"/>
        </div>
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>风格标签：</div>
        <div class="item noLabel center">
          <label class="m-r-25"></label>
          <transition>
            <div class="checkList" style="width: 80%">
              <div class="checkItem m-r-20 m-b-20" v-for="i in labelList" >
                <input type="checkbox" :value="i.description" name="custlabel" v-model="custlabelList">
                <label>{{i.description}}</label>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class=" p-l-40 p-r-40">
        <mu-raised-button label="保存" primary fullWidth class="p-t-20 p-b-20 m-t-40" @click="submit"/>
        <mu-raised-button label="取消" to="/customer" fullWidth class="p-t-20 p-b-20 m-t-40" />
      </div>
    </div>
    <AreaVue v-model="form.custhomeaddress" :areaFlag="areaFlag" @close="closeArea"></AreaVue>
  </form>
</template>

<script>
  import AreaVue from '../util/area.vue'
  import buildSearch from '../util/buildSearch.vue'
    export default {
      name: "customerEdit",
      components:{AreaVue,buildSearch},
      data (){
        return{
          id:this.$route.params.id,
          form:{
            custname:'',//客户姓名
            custcompaddress:'',//客户公司地址
            custphone:'',//客户手机号
            //custcompany:'',//客户公司名
            custbirthday:'',//客户生日
            custhomeaddress:'',//客户家庭住址
            custhometown:'',//客户籍贯
            custfamilymember:'',//客户家庭成员集
            custlabel:'',//客户标签集
            custBuilds:[],//客户负责建筑列表
            custhomedetaaddress:'',//客户详细家庭地址
            custposition:'',//客户职位,
            orgId:'',
            orgCfname:'',
          },
          formRule:{
            custname:{
              text:'',
              msg:'请输入客户姓名'
            },
            custposition:{
              text:'',
              msg:'请输入客户职位'
            },
            custphone:{
              text:'',
              msg:'请输入正确的联系电话',
              rule:/^1[3|4|5|7|8][0-9]\d{8}$/
            },
            /*custcompany:{
              text:'',
              msg:'请输入客户公司名'
            },*/
            custcompaddress:{
              text:'',
              msg:'请输入客户公司地址'
            },
            custBuilds:{
              text:'',
              msg:'请输入客户负责建筑'
            },
            orgCfname:{
              text:'',
              msg:'请输入所属机构'
            }
          },
          custfamilymember:[],//客户家庭成员集
          custlabelList:[],//客户标签集列表
          labelList:[],//标签集列表
          birthVisible:false,
          buildTypeList:[],
          areaFlag:false,
          buildsearchList:[],
          orgShow:false,
          orgList:[]
        }
      },
      watch:{
        'form.custBuilds'(val){
          this.checkfun('custBuilds')
        },
        'form.orgCfname'(val,old){
          this.getorgList()
        },
      },
      methods:{
        addBuild(){
          this.form.custBuilds.push({
            buildShow: false,
            buildCfname: "",
            buildType: [this.buildTypeList.length?this.buildTypeList[0].description:'']
          })
        },
        delBuild(index){
          this.form.custBuilds.splice(index,1)
        },
        addFamily(){
          this.form.custfamilymember.push({
            "name":"","relation":''
          })
        },
        delFamily(index){
          this.form.custfamilymember.splice(index,1)
        },
        closeArea(val){
          this.areaFlag=val
        },
        getinfo(){
          this.$ajax.post('/customer/find',{
            custid:this.id
          })
            .then(result => {
              let info=result.data.data.tCustomer,list=result.data.data.custBuilds
              for(let i in this.form){
                if(i==='custBuilds'){
                  this.form[i]=list
                  if(list.length>0){
                    this.form[i].forEach(n=>{
                      n.buildType=n.buildType.split(',')
                    })
                  }
                } else if(i==='custfamilymember'){
                  this.form[i]=info[i]
                  if(this.form[i]){
                    this.custfamilymember=[];
                    this.form[i].split(',').forEach(n=>{
                      let arr=n.split('-');
                      this.custfamilymember.push({
                        name:arr[0],relation:arr[1]
                      })
                    })
                  }
                }else if(i==='custlabel'){
                  this.form[i]=info[i]
                  this.custlabelList=this.form[i].split(',')
                }else{
                  this.form[i]=info[i]
                }
              }
            })
        },
        submit(){
          if(!this.checkfun()) return;
          this.form.custid=this.id;
          let str='';
          this.custfamilymember.forEach(n=>{
            str+=n.name+'-'+n.relation+','
          });
          this.form.custfamilymember=str.substring(0,str.length-1);
          this.form.custlabel=this.custlabelList.join(',');
          if(this.form.custBuilds.length>0){
            this.form.custBuilds.forEach(n=>{
              n.buildType=n.buildType.join(',');
              n.buildShow=false
            })
          }
          this.$ajax.post('/customer/update',this.form)
            .then(result=>{
              this.$toast({
                message: '修改成功',
                iconClass: 'icon icon-success',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/customer/info/'+this.id)
              },1000)
            })
        },
        checkfun(key){
          if(key){
            if(key==='custBuilds'&&this.form[key].length<1){
              this.formRule[key].text=this.formRule[key].msg
            }else if(this.formRule[key].rule&&!(this.formRule[key].rule.test(this.form[key]))){
              this.formRule[key].text=this.formRule[key].msg
            }else if(!this.form[key]){
              this.formRule[key].text=this.formRule[key].msg
            }else{
              this.formRule[key].text=''
            }
          }else{
            let flag=true
            for (let i in this.formRule){
              if(i==='custBuilds'){
                if(this.form[i].length<1){
                  this.formRule[i].text=this.formRule[i].msg
                  flag =false
                }else{
                  this.formRule[i].text=''
                }
              }else {
                if(!this.form[i]){
                  this.formRule[i].text=this.formRule[i].msg
                  flag =false
                }else{
                  this.formRule[i].text=''
                }
              }
            }
            return flag
          }
        },
        selectBuild(obj,index){
          this.form.custBuilds[index].buildId=obj.buildId;
          this.form.custBuilds[index].buildCfname=obj.buildCfname;
          this.form.custBuilds[index].buildType=obj.attrSet.split(',');
        },
        //机构模糊查询列表
        getorgList(){
          if(!this.form.orgCfname){
            return;
          }
          this.$ajax.post('/customer/orgList',{
            orgCfname:this.form.orgCfname
          })
            .then(result=>{
              this.orgList=result.data.data
            })
        },
        selecOrg(x){
          this.form.orgId=x.orgId;
          this.form.orgCfname=x.orgCfname;
        },
        getbuildType(){
          this.$ajax.post('/customer/buildType',{})
            .then(result=>{
              this.buildTypeList=result.data.data
            });
          this.$ajax.post('/customer/dict',{})
            .then(result=>{
              this.labelList=result.data.data
            })
        }
      },
      created(){
        this.getinfo();
        this.getbuildType()
      }
    }
</script>

<style lang="less">
  .base{
    align-items: start!important;
    .face{
      text-align: center!important;
      transform: translateY(0.4rem);
      img{
        display: inline-block;
        background: #efefef;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
      span{
        display: block;
      }
    }
  }
</style>
