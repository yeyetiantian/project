<template>
  <div class="form p-t-20 p-l-40 p-r-40 p-b-20 font-28">
    <div class="item m-b-20">
      <label>施工编号：</label>
      <span>AB-0010992</span>
      <i class="color_999 text-right font-24">2018-20-10 19:20</i>
    </div>
    <div class="item m-b-20">
      <label>项目名称：</label>
      <span>XXXXXXXXX项目建设一期</span>
    </div>
    <div class="item m-b-20">
      <label>相关文件：</label>
      <span>BQ18-SH00061-GZ001</span>
    </div>
    <div class="item m-b-20">
      <label>项目说明：</label>
      <span>BQ18-SH00061-GZ001XXXXXXXXX项目建设一期要求说明：内容描述，技术要求。。。。。。。。</span>
    </div>
    <mu-flat-button label="修改" icon="border_color" primary style="float: right" @click="linkEdit"/>
  </div>
</template>

<script>
  export default {
    name: "addTask",
    data (){
      return{
        id:this.$route.params.id,
        csTypeList:['检查','维修'],
        csType:0,
        form:{
          name:''
        }
      }
    },
    methods:{
      linkEdit(){
        this.$router.push('../edit/'+this.id)
      }
    },
    computed: {
      csName(){
        return this.form.name?'':'这是必填项'
      }
    },
    created(){
    }
  }
</script>

<style lang="less"></style>
