<template>
  <form class="form font-28 bgG">
    <div class="bgL p-t-20 p-r-40 p-b-20 color_white">
      <div class="item m-b-20">
        <label>施工编号：</label>
        <span>BQ18-SH00061-GZ001</span>
      </div>
      <div class="item">
        <label>项目名称：</label>
        <span>XXXXXXXXX项目建设一期</span>
      </div>
    </div>
    <div class="bgW p-t-20 p-r-40 p-b-20">
      <div class="item">
        <label>施工类型：</label>
        <mu-select-field v-model="csType" >
          <mu-menu-item v-for="(x,i) in csTypeList" :key="i" :value="i" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>施工项目名：</label>
        <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6"  />
      </div>
      <div class="item">
        <label>施工地址：</label>
        <mu-text-field hintText="施工地址"/>
      </div>
      <div class="item">
        <label>施工编号：</label>
        <mu-text-field hintText="施工编号"/>
      </div>
      <div class="item">
        <label>相关文件：</label>
        <mu-text-field hintText="相关文件"/>
      </div>
      <div class="item">
        <label>要求说明：</label>
        <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6"  />
      </div>
    </div>
    <!--<div class="item m-b-20">-->
      <!--<label>委派给：</label>-->
      <!--<div>-->
        <!--<mu-radio v-for="x in 10" :label="'单选 '+x" name="group" :nativeValue="'simple'+x" v-model="form.csSelect" class="m-r-40 m-b-20"/>-->
      <!--</div>-->
    <!--</div>-->
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存并指派" primary fullWidth class="p-t-20 p-b-20 " />
    </div>
  </form>
</template>

<script>
  export default {
    name: "editTask",
    data (){
      return{
        id:this.$route.params.id,
        csTypeList:['资料介入','进场','测量'],
        csType:0,
        form:{
          name:'',
          csSelect:0
        }
      }
    },
    methods:{
      submit(){
        //this.$router.push('../info/'+this.id)
      }
    },
    computed: {
      csName(){
        return this.form.name?'':'这是必填项'
      }
    }
  }
</script>

<style lang="less" scoped>
  .form{
    min-height: 100%;
  }
</style>
