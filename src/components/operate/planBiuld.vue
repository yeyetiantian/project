<template>
    <div class="planDate bgG p-b-30" style="height: 100%">
      <div class="bgW form p-l-30 p-r-30 p-t-10 p-b-20 m-b-20 font-30">
        <div class="item">
          <label style="width: 5em">计划名称：</label>
          <mu-text-field v-model="form.conPlanname" hintText="计划名称" :error-text="formRule.conPlanname.text" @change="checkfun('conPlanname')"/>
        </div>
        <div class="item">
          <label style="width: 5em">项目阶段：</label>
          <mu-select-field v-model="form.conPlanspe" hintText="项目阶段" >
            <mu-menu-item v-for="(x,i) in stages" :key="'stages'+i" :value="x.description" :title="x.description" />
          </mu-select-field>
        </div>
        <div class="item">
          <label style="width: 5em">开始时间：</label>
          <mu-date-picker v-model="form.conPlanstadate" hintText="开始时间" :maxDate="form.conPlanenddata" :error-text="formRule.conPlanstadate.text" />
        </div>
        <div class="item">
          <label style="width: 5em">结束时间：</label>
          <mu-date-picker v-model="form.conPlanenddata" hintText="结束时间" :minDate="form.conPlanstadate" :error-text="formRule.conPlanenddata.text" />
        </div>
        <div>
          <p class="m-b-20">施工编号：{{info.conProcode}}</p>
          <p>项目名称：{{info.conProname}}</p>
        </div>
      </div>
      <plan-date v-if="0"></plan-date>
      <div class="p-l-50 p-r-50 m-t-30">
        <mu-raised-button label="保存客户信息" @click="submit" primary fullWidth class="p-t-20 p-b-20 " />
      </div>
    </div>
</template>

<script>
  import planDate from '../util/planDate'
  export default {
    name: "planBuild",
    components:{planDate},
    data() {
        return {
          id:this.$route.params.id,
          stages:[],
          info:{},
          form:{
            conProid:this.$route.params.id,
            conPlanname:'',
            conPlanspe:'',
            conPlanstadate:'',
            conPlanenddata:'',
          },
          formRule:{
            conPlanname:{
              text:'',
              msg:'请输入计划名称'
            },
            conPlanstadate:{
              text:'',
              msg:'请选择开始时间'
            },
            conPlanenddata:{
              text:'',
              msg:'请选择结束时间'
            }
          }
        }
    },
    watch:{
      'form.conPlanstadate'(){
        this.checkfun('conPlanstadate')
      },
      'form.conPlanenddata'(){
        this.checkfun('conPlanenddata')
      },
    },
    methods:{
      getInfo(){
        this.$ajax.post('/task/conprolist',{
          conProid:this.id
        })
          .then(result=>{
            this.info=result.data.data[0]
          })
      },
      getStages(){
        this.$ajax.post('/task/dictList',{
          conPlanid:this.id
        })
          .then(result=>{
            this.stages=result.data.data
            this.form.conPlanspe=this.stages[0].description
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
      submit(){
        if(!this.checkfun())return
        this.$ajax.post('/consPlan/add',this.form)
          .then(result=>{
            this.$toast({
              message: '创建成功',
              iconClass: 'icon icon-success',
              duration: 1000
            });
            setTimeout(()=>{
              this.$router.push('/operate/planPro/'+this.id)
            },1000)
          })
      },
    },
    created(){
      this.getStages()
      this.getInfo()
    }
  }
</script>

<style lang='less' >
  .planDate{
    .form{
      .item{
        >:last-child{
          max-width: none;
        }
      }
    }

  }
</style>
