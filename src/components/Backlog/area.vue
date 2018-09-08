<template>
  <section>
    <enable-map v-model="people" :areaFlag="areaFlag" @close="closeArea"></enable-map>
    <div class="p-40" v-show="!areaFlag">
      <b class="font-30">选择分配的人</b>
      <mu-select-field v-model="people" fullWidth hintText="请选择分配的人...">
        <mu-menu-item v-for="(x,i) in list" :key="'poeple'+i" :value="x.id" :title="x.userName" ></mu-menu-item>
      </mu-select-field>
      <mu-raised-button label="选择区域" primary fullWidth class="p-t-20 p-b-20 m-b-40" @click="openArea"/>
    </div>
  </section>
</template>

<script>
  import enableMap from '../util/enableMap.vue'
  export default {
    components:{enableMap},
    data() {
      return {
        areaFlag:false,
        people:null,
        area:{},
        list:[]
      }
    },
    methods:{
      openArea(){
        if(!this.people) alert('请选择分配的人')
        else this.areaFlag=true
      },
      getList(){
        this.$ajax.post('findUser',{})
          .then(result=>{
            this.list=result.data.data
          })
      },
      closeArea(val){
        this.areaFlag=val
      }
    },
    created(){
      this.getList()
    }
  }
</script>

<style lang='less' scoped>

</style>
