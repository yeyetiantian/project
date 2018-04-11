<template>
  <form class="form  p-b-50 font-28 bgG">
    <div class="bgW p-t-20 p-l-40 p-r-40">
      <div class="item">
        <label>项目名称：</label>
        <mu-select-field v-model="serviceSelect" hintText="请选择类型" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="i" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>项目阶段：</label>
        <mu-select-field v-model="serviceSelect" hintText="请选择类型" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="i" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>计划名：</label>
        <mu-text-field hintText="3000W" />
      </div>
      <div class="item">
        <label>工作性质：</label>
        <mu-select-field v-model="serviceSelect" hintText="请选择类型" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="i" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>对方单位名：</label>
        <mu-select-field v-model="serviceSelect" hintText="请选择类型" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="i" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>地址：</label>
        <mu-text-field hintText="地址" v-model="areaVal" @focus="areaFlag=true"/>
      </div>
      <div class="item">
        <label></label>
        <mu-text-field hintText="详细地址" />
      </div>
      <div class="item">
        <label>开始时间：</label>
        <mu-date-picker hintText="生日" />
      </div>
      <div class="item">
        <label>结束时间：</label>
        <mu-date-picker hintText="生日" />
      </div>
      <div class="item">
        <label>计划目标：</label>
        <mu-select-field v-model="serviceSelect" hintText="请选择类型" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="i" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label></label>
        <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6"/>
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="保存计划" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button label="取消" fullWidth class="p-t-20 p-b-20 m-t-20" />
    </div>
    <AreaVue v-model="areaVal" :areaFlag="areaFlag" @close="closeArea"></AreaVue>
  </form>
</template>

<script>
  import AreaVue from '../util/area.vue'
    export default {
      name: "Planadd",
      components:{AreaVue},
      data() {
        return {
          proList: [
            {
              name:'',
              customer:'',
              property:0
            }
          ],
          propertyList:['政府','业主','材料商'],
          serviceTypeList:['政府','业主','材料商'],
          serviceSelect:0,
          areaFlag:false,
          areaVal:''
        }
      },
      methods: {
        addPro() {
          this.proList.push({
            name:'',
            customer:'',
            property:0
          })
        },
        delPro(index) {
          this.proList.splice(index,1)
        },
        closeArea(val){
          this.areaFlag=val
        }
      },
    }
</script>

<style lang="less">

</style>
