<template>
  <form class="form  p-b-50 font-28 bgG" style="min-height: 17.78667rem">
    <div class="bgW p-t-20 p-l-40 p-r-40">
      <div class="item">
        <label>客户名称：</label>
        <mu-text-field hintText="客户名称" />
      </div>
      <div class="item">
        <label>建筑名称：</label>
        <mu-text-field hintText="建筑名称" />
      </div>
      <div class="item">
        <label>地址：</label>
        <mu-text-field hintText="省/市/区" @focus="areaFlag=true"/>
      </div>
      <div class="item">
        <label></label>
        <mu-text-field hintText="详细地址" />
      </div>
      <div class="item flex-box-star">
        <label>楼照：</label>
        <div class="img-box">
          <div class="img m-r-10">
            <img src="../../assets/img/img.png" alt="">
          </div>
          <div class="img">
            <mu-icon value="add_a_photo"/>
          </div>
        </div>
      </div>
      <div class="item">
        <label>备注：</label>
        <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6"/>
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button label="取消" fullWidth class="p-t-20 p-b-20 m-t-40" />
    </div>
    <AreaVue v-model="areaVal" :areaFlag="areaFlag" @close="closeArea"></AreaVue>
  </form>
</template>
<script>
  import AreaVue from '../util/area.vue'
  export default{
    components:{AreaVue},
    data () {
      return{
        areaFlag:false,
        areaVal:''
      }
    },
    methods: {
      closeArea(val){
        this.areaFlag=val
      }
    },
    created () {

    }
  }
</script>
<style lang="less" type="text/less"></style>

