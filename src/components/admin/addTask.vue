<template>
  <form class="form font-28 bgG">
    <div class="p-t-30 p-r-40 p-b-30"  style="background-color: #f5f5f5">
      <div class="item m-b-20">
        <label>项目编号：</label>
        <span>{{pro.projId}}</span>
      </div>
      <div class="item">
        <label>项目名称：</label>
        <span>{{pro.projName}}</span>
      </div>
    </div>
    <div class="bgW p-t-20 p-r-30 p-b-30">
      <div class="item">
        <label>施工类型：</label>
        <mu-select-field v-model="form.conProtype"  hintText="施工类型">
          <mu-menu-item v-for="(x,i) in csTypeList" :key="x.dicttype+i" :value="x.description" :title="x.description" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>施工项目名：</label>
        <mu-text-field v-model="form.conProname" hintText="施工项目名" :errorText="formRule.conProname.text" @change="checkfun('conProname')"/>
      </div>
      <div class="item">
        <label>施工地址：</label>
        <mu-text-field v-model="form.conProaddress" hintText="施工地址" :errorText="formRule.conProaddress.text" @focus="pmapFlag=true;$event.target.blur()" multiLine />
      </div>
      <div class="item">
        <label>施工编号：</label>
        <mu-text-field v-model="form.conProcode" hintText="施工编号" :errorText="formRule.conProcode.text" @change="checkfun('conProcode')" />
      </div>
      <div class="item">
        <label>相关文件：</label>
        <input type="file" class="fileInput">
        <mu-text-field hintText="点击选择文件"/>
      </div>
      <div class="item">
        <label>要求说明：</label>
        <mu-text-field  v-model="form.conDescription" :errorText="formRule.conDescription.text" @change="checkfun('conDescription')" hintText="内容描述，技术要求..." multiLine :rows="3" :rowsMax="6"  />
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存" @click="submit" primary fullWidth class="p-t-20 p-b-20 m-b-20" />
      <mu-raised-button label="取消" :to="'/admin/info/'+id"  fullWidth class="p-t-20 p-b-20 font-30"/>
    </div>
    <popup-map v-model="form.conProaddress" :areaFlag="pmapFlag"  :point="point" @close="closeArea" @confim="confimPmap"></popup-map>
  </form>
</template>

<script>
  import popupMap from '../util/pmap.vue'
  export default {
    name: "addTask",
    components:{popupMap},
    data (){
      return{
        id:this.$route.params.id,
        csTypeList:this.$store.state.dicttype,
        pro:{},
        pmapFlag:false,
        point:{},
        form:{
          projId:this.$route.params.id,
          conProcode:'',
          conProname:'',
          conProtype:'维修',
          conProaddress:'',
          conDescription:'',
          latitude:'',
          longitude:''
        },
        formRule:{
          conProcode:{
            text:'',
            msg:'请输入施工编号'
          },
          conProname:{
            text:'',
            msg:'请输入施工项目名'
          },
          conProaddress:{
            text:'',
            msg:'请输入施工地址'
          },
          conDescription:{
            text:'',
            msg:'请输入内容描述'
          }
        }
      }
    },
    watch:{
      'form.conProaddress'(){
        this.checkfun('conProaddress')
      }
    },
    methods:{
      closeArea(val){
        this.pmapFlag=val
      },
      confimPmap(point){
        this.point=point;
        this.form.longitude=this.point.lng;
        this.form.latitude=this.point.lat
      },
      getPro(){
        this.$ajax.post('/project/list',{
          projId:this.id
        })
          .then(result=>{
            this.pro=result.data.data[0]
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
          let flag=true;
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
      submit(){
        if(!this.checkfun())return;
        this.$ajax.post('/task/add',this.form)
          .then((result)=>{
            this.$toast({
              message: '新增成功',
              iconClass: 'icon icon-success',
              duration: 1000
            });
            setTimeout(()=>{
              this.$router.push('/admin/info/'+this.id)
            },1000)
          })
      }
    },
    created(){
      this.getPro();
    }
  }
</script>

<style lang="less" scoped>
  .form{
    min-height: 100%;
  }
</style>
