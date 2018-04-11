<template>
  <form class="form p-t-20 p-l-40 p-r-40 p-b-20 font-28">
    <div class="item m-b-20">
      <label>施工编号：</label>
      <span>AB-0010992</span>
      <span class="color_999 font-12 text-right">2018-04-03 17:56</span>
    </div>
    <div class="item m-b-20">
      <label>项目名称：</label>
      <span>XXXXXXXXX项目建设一期</span>
    </div>
    <div class="item m-b-20">
      <label>相关文件：</label>
      <span>XXXXXX.ZIP</span>
    </div>
    <div class="item m-b-20">
      <label>要求说明：</label>
      <span>内容描述，技术要求。。。。。。。。</span>
    </div>
    <div class="item">
      <label>项目阶段：</label>
      <mu-select-field v-model="csType" >
        <mu-menu-item v-for="(x,i) in csTypeList" :key="i" :value="i" :title="x" />
      </mu-select-field>
    </div>
    <div class="item">
      <label>备注：</label>
      <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6"  />
    </div>
    <div class="item m-b-20">
      <label>委派给：</label>
      <div>
        <mu-radio v-for="x in 10" :label="'单选 '+x" name="group" :nativeValue="'simple'+x" v-model="form.csSelect" class="m-r-40 m-b-20"/>
      </div>
    </div>
    <div class="item">
      <label></label>
      <mu-raised-button label="保存并指派" primary @click="submit"/>
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

<style lang="less">
</style>
