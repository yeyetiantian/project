<template>
  <div class="bgW planDate">
    <div v-if="!step">
      <div class="bgL color_white font-36 p-t-30 p-l-25 p-r-25 p-b-20">
        今天 15/04/2018
      </div>
      <div class="form font-30 p-25" style="min-height: 14.2rem;">
        <div class="item">
          <label style="width: 5em">项目名称：</label>
          <mu-select-field v-model="form.conProid" hintText="请选择类型" :error-text="formRule.conProid.text">
            <mu-menu-item v-for="x in prolist" :key="x.conProid" :value="x.conProid" :title="x.conProname" ></mu-menu-item>
          </mu-select-field>
        </div>
        <div class="item">
          <label style="width: 5em"></label>
          <div class="flex-box">
            <mu-radio label="施工前" v-model="form.conClocktype" name="group" nativeValue="施工前"  class="m-r-30"></mu-radio>
            <mu-radio label="施工后" v-model="form.conClocktype" name="group" nativeValue="施工后" ></mu-radio>
          </div>
        </div>
      </div>
      <mu-raised-button label="下一步" @click="nextStep" primary fullWidth class="p-t-50 p-b-50 font-50 m-t-50" ></mu-raised-button>
    </div>
    <div v-if="step">
      <div class="bgL color_white font-36 p-t-30 p-l-40 p-r-40 p-b-20">
        项目名称：{{selectPro.conProname}} <br>合同编号： {{selectPro.conProcode}}
      </div>
      <div class="form font-30 planLogSave" style="min-height: 11rem;">
        <div class="bgG p-l-40 p-r-40 p-t-35 p-b-30">
          <div class="item flex-box-star" style="margin-bottom: 0">
            <label style="width: 5em">施工前后：</label>
            <span>{{form.conclocktype}}</span>
          </div>
        </div>
        <div class="p-l-40 p-r-40 p-t-35 p-b-30">
          <div class="item flex-box-star">
            <label style="width: 5em">现场照片：</label>
            <div class="img-box">
              <div class="img m-r-10" v-for="(x,i) in imgList" :key="'img_'+i">
                <img :src="$ajax.defaults.baseURL+''+x.filePath" alt="">
              </div>
              <div class="img">
                <mu-icon value="add_a_photo"></mu-icon>
                <up @onsucccess="upimg" :image="true"></up>
              </div>
              <div class="error color_red">{{formRule.conClockpic.text}}</div>
            </div>
            <br>
          </div>
          <div class="item">
            <label style="width: 5em">描述：</label>
            <mu-text-field v-model="form.conClockproj" hintText="文字描述现场情况及状况" multiLine ></mu-text-field>
          </div>
        </div>
      </div>
      <div class="p-20">
        <mu-raised-button label="保存" @click="submit" primary fullWidth class="p-t-50 p-b-50 font-50 m-t-50"></mu-raised-button>
        <mu-raised-button label="返回上一步" @click="step=0" fullWidth class="p-t-50 p-b-50 font-50 m-t-50"></mu-raised-button>
      </div>
    </div>
  </div>
</template>

<script>
  import up from '../util/update.vue'
  export default {
    name: "addlog",
    components:{up},
    data() {
      return {
        step:0,
        prolist:[],
        form:{
          conClocktype:'施工前',
          conClockpic:'',
          conProid:'',
          conClockproj:'',
        },
        imgList:[],
        formRule: {
          conClockpic: {
            text: '',
            msg: '请上传施工照片'
          },
          conProid: {
            text: '',
            msg: '请选择项目'
          }
        },
        selectPro:{}
      }
    },
    watch:{
      'form.conProid'(val){
        this.checkfun('conProid');
        this.prolist.forEach(n=>{
          if(val===n.conProid)this.selectPro=n
        })
      },
      imgList(val){
        let str='';
        val.forEach(n=>{
          str+=n.filePath+','
        });
        this.form.conClockpic=str
      }
    },
    methods:{
      getList(){
        this.$ajax.post('/constrcard/prolist',{})
          .then(result=>{
            this.prolist=result.data.data
          })
      },
      nextStep(){
        if(!this.form.conProid){
          this.formRule['conProid'].text=this.formRule['conProid'].msg;
        }else {
          this.formRule['conProid'].text='';
          this.$ajax.post('/constrcard/onlylist',{
            conProid:this.form.conProid,
            conClocktype:this.form.conClocktype,
          })
            .then(result=>{
              if(result.data.code===1){
                this.step=1
              }else{
                alert(result.data.msg)
              }
            })
        }

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
      upimg(list){
        this.formRule.conClockpic.text='';
        this.imgList=this.imgList.concat(list);
      },
      submit(){
        if(!this.checkfun()){
          return
        }
        this.$ajax.post('/constrcard/add',this.form)
          .then(result=>{
            this.$toast({
              message: '保存成功',
              iconClass: 'icon icon-success',
              duration: 1000
            });
            setTimeout(()=>{
              this.$router.push('/operate/log')
            },1000)
          })
      }
    },
    created(){
      this.getList();
    }
  }
</script>

<style lang='less'>
  .planDate{
    height: 100%;
    .form{
      .item{
        >:last-child{
          max-width: none;
        }
      }
      .mu-radio{
        width: auto;
      }
    }
  }
</style>
