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
    },
    getPhone(){
      if(!this.$store.state.phone){
        this.$ajax.post('getPhone',{})
          .then(result=>{
            this.$store.commit('setPhone',result.data.data.phone)
          })
      }
    }
  },
  mounted(){
    this.getdicttype()
    this.getPhone()
  }
}
</script>

<style></style>
