<template>
  <form class="customer form p-t-20 p-b-20 p-l-40 p-r-40">
    <div class="base item">
      <label class="face m-r-20">
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
    <mu-divider/>
    <div class="vice">
      <div class="item center">
        <mu-icon-button icon="add_circle" @click="addBuild"/>
        <span class="font-28">所辖建筑全称</span><br>
      </div>
      <div v-for="(x,i) in buildList">
        <div class="item">
          <label class="m-r-20"><mu-icon value="do_not_disturb_on" class="color_red font-28 m-r-10" @click="delBuild(i)"/>建筑全称{{i+1}}</label>
          <mu-text-field v-model="x.name"/>
        </div>
        <div class="item">
          <label class="m-r-20"></label>
          <mu-select-field v-model="x.type" hintText="请选择类型" >
            <mu-menu-item v-for="(x,i) in buildTypeList" :key="i" :value="i" :title="x" />
          </mu-select-field>
        </div>
      </div>
    </div>
    <mu-divider/>
    <div class="vice m-t-20">
      <div class="item center m-b-20">
        <span class="font-28 p-l-30">附加信息 <i class="color_999 font-24">（可以不填写）</i></span><br>
      </div>
      <div>
        <div class="item">
          <label>家庭地址：</label>
          <mu-text-field hintText="家庭地址"/>
        </div>
        <div class="item">
          <label>生日：</label>
          <mu-date-picker hintText="生日" />
        </div>
        <div class="item">
          <label>籍贯：</label>
          <mu-text-field hintText="籍贯"/>
        </div>
        <div class="item">
          <label>家庭成员：</label>
          <mu-text-field hintText="家庭成员"/>
        </div>
        <div class="item">
          <label>风格标签：</label>
          <div class="checkList">
            <div class="checkItem m-r-20 m-b-20" v-for="i in 5">
              <input type="checkbox">
              <label>风趣</label>
            </div>
          </div>
        </div>
        <mu-raised-button label="保存" primary fullWidth class="p-t-20 p-b-20 m-t-40" />
      </div>
    </div>
  </form>
</template>

<script>
    export default {
      name: "customerAdd",
      data (){
        return{
          id:this.$route.params.id,
          buildTypeList:['政府','业主','材料商'],
          buildList:[]
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
        }
      }
    }
</script>

<style lang="less">
  .base{
    align-items: start!important;
    .face{
      text-align: center!important;
      transform: translateY(0.4rem);
      img{
        display: inline-block;
        background: #efefef;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
      span{
        display: block;
      }
    }
  }
</style>
