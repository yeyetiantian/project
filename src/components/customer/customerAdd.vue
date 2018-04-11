<template>
  <form class="customer form p-t-20 p-b-20">
    <div class="base item p-l-40 p-r-40">
      <label class="face text-center">
        <img src="" alt="">
        <span class="font-24">添加蹄片</span>
      </label>
      <div class="con">
        <mu-text-field hintText="姓名" fullWidth /><br/>
        <mu-text-field hintText="职位" fullWidth /><br/>
        <mu-text-field hintText="电话" fullWidth /><br/>
        <mu-text-field hintText="单位名" fullWidth /><br/>
        <mu-text-field hintText="办公地址" fullWidth /><br/>
      </div>
    </div>
    <div class="vice p-l-40 p-r-40 p-b-50">
      <div class="item center">
        <mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>
        <span class="font-28">所辖建筑全称</span><br>
      </div>
      <div v-for="(x,i) in buildList">
        <div class="item noLabel">
          <label class="m-r-25"><mu-icon value="do_not_disturb_on" class="color_red font-28 m-r-10" @click="delBuild(i)"/></label>
          <mu-text-field v-model="x.name" hintText="建筑名称"/>
        </div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-select-field v-model="x.type" hintText="请选择类型" >
            <mu-menu-item v-for="(x,i) in buildTypeList" :key="i" :value="i" :title="x" />
          </mu-select-field>
        </div>
      </div>
    </div>
    <div class="m-b-20 p-t-20 p-b-20 p-l-40 p-r-40 optional">
      <span class="font-28 p-l-30">附加信息 <i class="color_999 font-24">（可以不填写）</i></span><br>
    </div>
    <div class="vice m-t-20 p-l-40 p-r-40">
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>家庭地址：</div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-text-field hintText="家庭地址" v-model="areaVal" @focus="areaFlag=true"/>
        </div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-text-field hintText="详细地址"/>
        </div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-text-field hintText="邮编"/>
        </div>
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>生日：</div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-date-picker hintText="生日" />
        </div>
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>籍贯：</div>
        <div class="item noLabel">
          <label class="m-r-25"></label>
          <mu-date-picker hintText="生日" />
        </div>
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addFamily" class="color_blue"/>家庭成员：</div>
        <div class="item noLabel center" v-for="(x,i) in familyList">
          <label class="m-r-25"><mu-icon value="do_not_disturb_on" class="color_red font-28 m-r-10" @click="delFamily(i)"/></label>
          <mu-select-field hintText="请选择类型" style="width: 40%" class="m-r-20">
            <mu-menu-item value="i" title="爱人" />
          </mu-select-field>
          <mu-text-field hintText="输入姓名" style="width: 30%"/>
        </div>
      </div>
      <div class="msg">
        <div class="flex-box"><mu-icon-button icon="add_circle" @click="addBuild" class="color_blue"/>风格标签：</div>
        <div class="item noLabel center">
          <label class="m-r-25"></label>
          <transition>
            <div class="checkList" style="width: 80%">
              <div class="checkItem m-r-20 m-b-20" v-for="i in 5" >
                <input type="checkbox">
                <label>风趣</label>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class=" p-l-40 p-r-40">
        <mu-raised-button label="保存" primary fullWidth class="p-t-20 p-b-20 m-t-40" />
        <mu-raised-button label="取消" fullWidth class="p-t-20 p-b-20 m-t-40" />
      </div>
    </div>
    <AreaVue v-model="areaVal" :areaFlag="areaFlag" @close="closeArea"></AreaVue>
  </form>
</template>

<script>
  import AreaVue from '../util/area.vue'
    export default {
      components:{AreaVue},
      name: "customerAdd",
      data (){
        return{
          birthVisible:false,
          buildTypeList:['政府','业主','材料商'],
          buildList:[],
          familyList:[],
          areaFlag:false,
          areaVal:''
        }
      },
      methods:{
        addBuild(){
          this.buildList.push({
            name:'',
            type:this.buildTypeList.length?0:''
          })
        },
        delBuild(index){
          this.buildList.splice(index,1)
        },
        addFamily(){
          this.familyList.push({
            name:'',
            type:'i'
          })
        },
        delFamily(index){
          this.familyList.splice(index,1)
        },
        closeArea(val){
          this.areaFlag=val
        }
      }
    }
</script>

<style lang="less">

</style>
