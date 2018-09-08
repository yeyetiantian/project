<template>
  <mu-list>
    <mu-sub-header>待办项</mu-sub-header>
    <mu-list-item v-for="(x,i) in list" :key="'backlog'+i"  toggleNested :open="false">
      <mu-icon slot="left" value="grade" color="#FF5722"/>
      <span slot="title">{{x.commandCfname}} ({{x.needTotal}})</span>
      <mu-list-item v-for="(m,i) in x.child" :key="'backloginfo'+i"  slot="nested" :title="m.buildCfname" @click="itemHande(m)">
        <mu-icon slot="left" value="grade"/>
        <mu-icon slot="right" value="info"/>
      </mu-list-item>
    </mu-list-item>
  </mu-list>
</template>

<script>
  export default {
    name: "backlog",
    data() {
        return {
          list:[],
          phone:this.$store.state.phone,
          config:{baseURL:this.$ajax.defaults.baseURL1}
        }
    },
    methods:{
      itemHande(x){
        this.$router.push(`/blog_info/`+x.commandNo)
      },
      getList(){
        this.$ajax.post('command/comm/searchSubTotal',{loginName:this.phone},this.config)
          .then(result=>{
            this.list=result.data.data
            this.list.forEach((n,i)=>{
              this.$set(n,'child',[])
              this.getInfo(n.commandCfname,i)
            })
          })
      },
      getInfo(name,index){
        this.$ajax.post('command/comm/searchCommand',{commandCfname:name,loginName:this.phone},this.config)
          .then(result=>{
            this.list[index].child=result.data.data
          })
      }
    },
    created(){
      this.getList()
    }
  }
</script>

<style lang='less' scoped>

</style>
