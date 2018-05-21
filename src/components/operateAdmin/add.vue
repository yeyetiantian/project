<template>
  <form class="form font-28 bgG">
    <div class="p-t-20 p-r-40 p-b-20 bgL color_white" >
      <div class="item m-b-10">
        <label>施工编号：</label>
        <span>{{info.conProcode}}</span>
      </div>
      <div class="item">
        <label>项目名称：</label>
        <span> {{info.conProname}}</span>
      </div>
    </div>
    <div class="p-t-20 p-r-40 p-b-20" style="background-color: #f5f5f5;">
      <div class="item m-b-10">
        <label>相关文件：</label>
        <span>XXXXXX.ZIP</span>
      </div>
      <div class="item">
        <label>要求说明：</label>
        <span>{{info.conDescription}}</span>
      </div>
    </div>
    <div class="bgW p-t-20 p-r-30 p-b-30">
      <div class="item">
        <label>分配用户：</label>
        <mu-select-field v-model="form.userid"  >
          <mu-menu-item value="636EB0B9DA37FFB4E05011AC08000A83" title="测试账号" ></mu-menu-item>
        </mu-select-field>
      </div>
      <div class="item m-b-20">
        <label>班组名称：</label>
        <mu-text-field v-model="form.construc" hintText="班组名称" :error-text="formRule.construc.text" @change="checkfun('construc')"/>
      </div>
      <div class="item m-b-20">
        <label>班组人数：</label>
        <mu-text-field v-model="form.construcnum" hintText="班组人数" type="number" :error-text="formRule.construcnum.text" @change="checkfun('construcnum')"/>
      </div>
      <div class="item" v-if="0">
        <label>要求说明：</label>
        <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6"  />
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存" @click="submit" primary fullWidth class="p-t-20 p-b-20 " />
    </div>
  </form>
</template>

<script>
  export default {
    name: "addTask",
    data (){
      return {
        id: this.$route.params.id,
        csTypeList: ['检查', '维修'],
        csType: 0,
        info: {},
        form: {
          conProid: this.$route.params.id,
          construcnum: '',
          construc: '',
          userid: '636EB0B9DA37FFB4E05011AC08000A83'
        },
        formRule: {
          construcnum: {
            text: '',
            msg: '请输入班组人数'
          },
          construc: {
            text: '',
            msg: '请输入班组名称'
          },
          userid: {
            text: '',
            msg: '请选择项目经理'
          }
        }
      }
    },
    methods:{
      getInfo(){
        this.$ajax.post('/task/conslist',{
          conProid:this.id
        })
          .then(result => {
            this.info=result.data.data[0]
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
        this.$ajax.post('/task/update',this.form)
          .then(result=>{
            this.$toast({
              message: '保存成功',
              iconClass: 'icon icon-success',
              duration: 1000
            });
            setTimeout(()=>{
              this.$router.push('/opadmin')
            },1000)
          })
      },
    },
    computed: {
      csName(){
        return this.form.name?'':'这是必填项'
      }
    },
    created(){
      this.getInfo()
    }
  }
</script>

<style lang="less" scoped>
  .form{
    min-height: 100%;
  }
</style>
