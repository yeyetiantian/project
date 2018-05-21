<template>
  <mt-popup v-model="value" class="proPopup">
    <div class="title bgL color_white font-36 flex-box-btew p-25">
      <span>委派给</span><mu-icon value="close" @click="close"/>
    </div>
    <div class="popupList font-30">
      <mu-radio v-for="(x,i) in csList" :key="'cs'+i" :label="x.name" name="group" nativeValue="simple1"  class="item"/>
      <mu-radio label="杨海林" name="group" nativeValue="simple2"  class="item" v-for="x in 10" :key="'cs1'+i"/>
    </div>
    <div class="flex-box font-30">
      <mu-raised-button label="取消" class="flex-1" @click="close"/>
      <mu-raised-button label="指派" class="flex-1" primary/>
    </div>
  </mt-popup>
</template>

<script>
  export default {
    name: "cs-prop",
    props:{
      value:{
        type:Boolean
      },
      proId:Number
    },
    data() {
        return {
          csList:[]
        }
    },
    methods:{
        close(){
          this.$emit('close')
        },
      submit(){

      }
    }
  }
</script>

<style lang='less' scoped>
  .proPopup{
    width: 8rem;
    .popupList{
      padding:0.6667rem 1.06667rem;
      max-height: 8.5rem;
      overflow-y: auto;
      .item{
        display: block;
        margin-bottom: 0.6667rem;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
