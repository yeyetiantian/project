<template>
  <section>
    <mu-appbar title="进行中的定期检查">
      <mu-flat-button label="新增" icon="add_circle_outline" slot="right" @click="$router.push('/add_under_way/'+id)"/>
    </mu-appbar>
    <mu-list>
      <mu-list-item v-for="x in 5" :key="'underway'+x" title="建筑名" toggleNested :open="false">
        <mu-icon slot="left" value="inbox"/>
        <mu-list-item title="建筑名" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="指令名" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="服务类型" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="责任人" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="当前状态" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="问题位置" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="问题类型" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="开始时间" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
        <mu-list-item title="完成时间" slot="nested">
          <span slot="left"></span>
          <span slot="right">123</span>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
  </section>
</template>

<script>
    export default {
        name: "under_way",
        data() {
            return {
              id:this.$store.state.blog_info.commandNo,
              ty:this.$store.state.blog_info.commStatus,
            }
        }
    }
</script>

<style lang='less' scoped>

</style>
