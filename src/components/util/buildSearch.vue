<template>
  <div v-show="show" class="searchResult">
    <ul>
      <li v-if="buildsearchList.length>0" v-for="n in buildsearchList" @click="selecBuild(n)">{{n.buildCfname}}</li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "buildSearch",
      props:{
        value:{
          type:String,
        },
        show:{
          type:Boolean
        },
        index:Number
      },
      watch:{
        value(val){
          this.getBuild();
        }
      },
      data() {
          return {
            buildsearchList:[]
          }
      },
      methods:{
        selecBuild(x){
          this.$emit('clickname',x,this.index)
        },
        getBuild(){
          if(!this.value){
            return;
          }
          this.$ajax.post('/customer/BuildList',{
            buildCfname:this.value
          })
            .then(result=>{
              this.buildsearchList=result.data.data
            })
        }
      }
    }
</script>

<style lang='less' scoped>

</style>
