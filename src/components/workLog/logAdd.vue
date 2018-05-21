<template>
  <div class="bgG" style="min-height: 100%">
    <div class="flex-box-btew font-36 p-25" style="background-color: #e0e0e1;">
      <span>{{nowDate | formatDate('YY-MM-DD')}}</span>
    </div>
    <div class="bgW p-l-35 p-r-30 p-t-35 p-b-20 m-b-20" >
      <mu-text-field v-model="form.planActual" hintText="请输入工作描述内容" multiLine :rows="3" :rowsMax="6" fullWidth class="m0" :errorText="formRule.planActual.text" @change="checkfun('planActual')"/>
      <div class="flex-box-btew flex-box-star">
        <div class="img-box">
        </div>
        <div class="flex-box-cen">
          <span class="m-r-20">上传照片或是文件</span>
          <mu-icon value="add_a_photo"/>
        </div>
      </div>
    </div>
    <div class="flex-box-btew" v-if="0">
      <span></span>
      <mu-flat-button label="再建一条" icon="add_circle_outline" primary @click="add"/>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存日志" @click="submit" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button label="取消" to="/workLog" fullWidth class="p-t-20 p-b-20 m-t-20" />
    </div>
  </div>
</template>

<script>
    export default {
      name: "logAdd",
      data() {
        return {
          nowDate: new Date(),
          list:[
            {
              con:'1、徐汇政府楼建处  会议与设计部 有成效\n2、静安政府  拜访客户',
              imgs:[]
            }
          ],
          form:{
            planActual:'',
            planDoc:''
          },
          formRule:{
            planActual:{
              text:'',
              msg:'请输入工作描述内容'
            }
          }
        }
      },
      methods: {
        add() {
          this.list.push({
            con:'',
            imgs:[]
          })
        },
        submit(){
          if(!this.checkfun())return;
          this.$ajax.post('/Journal/add',this.form)
            .then(result=>{
              this.$toast({
                message: '保存成功',
                iconClass: 'icon icon-success',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/workLog')
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
      },
    }
</script>

<style lang="less">

</style>
