<template>
  <div class="bgG" style="min-height: 100%">
    <div class="flex-box-btew font-36 p-25" style="background-color: #e0e0e1;">
      <span>15/04/2018</span>
    </div>
    <div class="bgW p-l-35 p-r-30 p-t-35 p-b-20 m-b-20" v-for="x in list">
      <mu-text-field v-model="x.con" hintText="请输入内容" multiLine :rows="3" :rowsMax="6" fullWidth class="m0"/>
      <div class="flex-box-btew flex-box-star">
        <div class="img-box">
        </div>
        <div class="flex-box-cen">
          <span class="m-r-20">上传照片或是文件</span>
          <mu-icon value="add_a_photo"/>
        </div>
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-50 p-t-50">
      <mu-raised-button label="保存日志" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button label="取消" to="../workLog" fullWidth class="p-t-20 p-b-20 m-t-20" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "logAdd",
    data() {
      return {
        list:[
          {
            con:'1、徐汇政府楼建处  会议与设计部 有成效\n2、静安政府  拜访客户',
            imgs:[]
          }
        ]
      }
    },
    methods: {

    },
  }
</script>

<style lang="less">

</style>
