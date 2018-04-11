<template>
  <form class="form p-t-20 p-l-40 p-r-40 p-b-20 font-28">
    <div class="item m-b-20">
      <label>项目名称：</label>
      <span>XXXXXXXXX项目建设一期</span>
    </div>
    <div class="item m-b-40">
      <label>合同编号：</label>
      <span>BQ18-SH00061-GZ001</span>
    </div>
    <mu-divider class="m-b-30"/>
    <div class="item">
      <label>施工类型：</label>
      <mu-select-field v-model="csType"  >
        <mu-menu-item v-for="(x,i) in csTypeList" :key="i" :value="i" :title="x" />
      </mu-select-field>
    </div>
    <div class="item">
      <label>施工项目名：</label>
      <mu-text-field v-model="form.name" hintText="提示文字" />
    </div>
    <div class="item">
      <label>施工地址：</label>
      <mu-text-field hintText="提示文字"  />
    </div>
    <div class="item">
      <label>施工编号：</label>
      <mu-text-field hintText="AB-0010992"  />
    </div>
    <div class="item">
      <label>相关文件：</label>
      <input type="file" class="fileInput">
      <mu-text-field hintText="AB-0010992"/>
    </div>
    <div class="item">
      <label>要求说明：</label>
      <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6"  />
    </div>
    <div class="item">
      <label></label>
      <mu-raised-button label="保存" primary class="formBtn"/>
    </div>
  </form>
</template>

<script>
  export default {
    name: "addTask",
    data (){
      return{
        csTypeList:['检查','维修'],
        csType:0,
        form:{
          name:''
        }
      }
    },
    methods:{

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
