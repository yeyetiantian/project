<template>
  <form class="form  p-b-50 font-28 bgG">
    <div class="proItem bgW p-t-20 p-l-40 p-r-40" >
      <div class="item">
        <label>项目名：</label>
        <mu-text-field hintText="项目名" />
      </div>
      <div class="item">
        <label>客户名：</label>
        <mu-text-field hintText="客户名" />
      </div>
      <div class="item" v-for="(x,i) in proList">
        <label><mu-icon value="do_not_disturb_on" class="color_red font-28 m-r-10" @click="delPro(i)" v-if="proList.length>1"/>物业名称：</label>
        <div class="flex-box-btew flex-box-star">
          <mu-select-field v-model="x.property" hintText="请选择类型" >
            <mu-menu-item v-for="(x,i) in propertyList" :key="i" :value="i" :title="x" />
          </mu-select-field>
        </div>
      </div>
      <div class="flex-box-cen p-b-20">
        <mu-flat-button label="保存为联系人" primary icon="contacts"/>
        <mu-flat-button label="增加新一条" icon="add_circle" primary @click="addPro"/>
      </div>
    </div>
    <div class="optional text-center p-t-20 p-b-20">* 以下是可选项 *</div>
    <div class="bgW p-t-20 p-l-40 p-r-40">
      <div class="item">
        <label>业务类型：</label>
        <mu-select-field v-model="serviceSelect" hintText="请选择类型" >
          <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="i" :title="x" />
        </mu-select-field>
      </div>
      <div class="item">
        <label>预算金额：</label>
        <mu-text-field hintText="3000W" />
      </div>
      <div class="item">
        <label>投标金额：</label>
        <mu-text-field hintText="3000W" />
      </div>
      <div class="item">
        <label>合同金额：</label>
        <mu-text-field hintText="3000W" />
      </div>
      <div class="item">
        <label>项目经理：</label>
        <mu-text-field hintText="张三" />
      </div>
      <div class="item">
        <label>联系电话：</label>
        <mu-text-field hintText="12345678900" />
      </div>
      <div class="item">
        <label>日期时间：</label>
        <mu-date-picker hintText="生日" />
      </div>
    </div>
    <div class="p-l-50 p-r-50 m-t-40">
      <mu-raised-button label="确认保存" primary fullWidth class="p-t-20 p-b-20 " />
      <mu-raised-button label="取消" fullWidth class="p-t-20 p-b-20 m-t-20" />
    </div>
  </form>
</template>

<script>
    export default {
      name: "add",
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
          serviceSelect:0
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
        }
      },
    }
</script>

<style lang="less">

</style>
