<template>
  <div class="planInfo bgG font-28">
    <div class="bgL color_white text-center font-40 p-30">
      <h1>2018年4月1号 <span class="font-30">星期四</span></h1>
    </div>
    <div class="bgW p-30">
      <div class="flex-box-btew m-b-30">
        <b class="font-38">参加徐汇区政府会议</b>
        <span class="color_green font-32">拜访客户</span>
      </div>
      <div class="flex-box-btew m-b-10">
        <span class="color_999">王科长</span>
        <span>上午</span>
      </div>
      <div class="flex-box-btew m-b-10">
        <span class="color_999">徐家汇政府楼建处</span>
        <span class="color_blue">已打卡</span>
      </div>
      <div class="flex-box-btew m-b-30">
        <span class="color_999">天钥桥路1899号1号楼办事处</span>
        <span></span>
      </div>
      <div class="flex-box-btew m-b-30">
        <span><b>计划目标： </b>实现合同初步谈判</span>
        <span></span>
      </div>
      <div class="flex-box-btew m-b-30">
        <span><b>实际完成情况： </b>实现合同初步谈判</span>
        <span></span>
      </div>
      <mu-divider/>
      <div class="flex-box-btew m-b-10 m-t-25">
        <span class="color_999">项目名称：XXX项目</span>
        <span></span>
      </div>
      <div class="flex-box-btew m-b-10">
        <span class="color_999">项目阶段：前期了解</span>
        <span></span>
      </div>
    </div>
    <div class="bgW m-t-20 p-t-30 p-l-30 p-r-30 p-b-10 m-b-20">
      <div class="text-bold">实际完成情况： </div>
      <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6" fullWidth style="margin-bottom: 0"/>
    </div>
    <div class="p-20">
      <mu-raised-button label="完成计划" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button label="关闭" fullWidth class="p-t-20 p-b-20 m-t-20" />
    </div>
  </div>
</template>

<script>
    export default {
      name: "planInfo",
      data() {
        return {
          id:this.$route.params.id,
        }
      },
    }
</script>

<style lang="less">
  .planInfo{
    min-height: 17.7866rem;
  }
</style>
