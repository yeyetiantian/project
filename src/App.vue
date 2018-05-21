<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    getdicttype(){
      this.$ajax.post('/project/dicttype',{})
        .then(result=>{
          if(result.data.code===1){
            this.$store.commit('setdicttype',result.data.data)
          }
        })
    }
  },
  mounted(){
    this.getdicttype()
  }
}
</script>

<style></style>
