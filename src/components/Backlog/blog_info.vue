<template>
  <section style="width:100%;overflow-x: hidden">
    <mu-appbar title="当前状态" style="position: fixed">
      <mu-flat-button label="返回列表" icon="apps" slot="right" @click="$router.push('/backlog')"/>
    </mu-appbar>
    <mu-timeline style="padding:68px 0.2666rem 0;">
      <mu-timeline-item v-for="(x,i) in status" :key="i" >
        <mu-icon :value="(i+1)>Number(ty)?'radio_button_unchecked':'radio_button_checked'" :size="16"  color="#03a9f4" slot="icon" @click="handClick(i+1)"/>
        <div class="flex-box-btew m-b-10" slot="time">
          <span>{{x.type}}</span>
        </div>
        <div slot="des" class="p-t-25 p-b-25 p-l-30 p-r-30">
          <p v-for="(j,m) in x.events" >{{m+1}}.{{j.finishDesc.replace(/<[^>]+>/g,'')}}</p>
        </div>
      </mu-timeline-item>
    </mu-timeline>
  </section>
</template>

<script>
  export default {
    name: "blog_info",
    data() {
      return {
        id:this.$route.params.id,
        ty:'',
        phone:this.$store.state.phone,
        config:{baseURL:this.$ajax.defaults.baseURL1},
        status:[
          {
            type:'下发通知',
            events:[]
          },
          {
            type:'收到通知',
            events:[]
          },
          {
            type:'处理中',
            events:[]
          },
          {
            type:'上传等待',
            events:[]
          },
          {
            type:'审核完成',
            events:[]
          }
        ]
      }
    },
    methods:{
      handClick(statu){
        if(statu!==Number(this.ty)+1){
          if(Number(this.ty)===3&&statu===3){
            this.$router.push(`/add_under_way/`+this.id)
          }else{
            return
          }
        }
        switch (statu) {
          case 2:
            this.receipt()
            break;
          case 3:
            this.$router.push(`/add_under_way/`+this.id)
            break;
          case 4:
            this.$router.push('/up_wait/'+this.id)
            break;
        }
      },
      getInfo(){
        this.$ajax.post('/command/comm/findCommand',{commandNo: this.id,loginName:this.phone},this.config)
          .then(result=>{
            this.ty=result.data.data.commStatus
          })
      },
      getData(){
        this.$ajax.post('/commondLog/search/flowLogList',{commandNo: this.id,loginName:this.phone},this.config)
          .then(result=>{
            if(result){
              this.status.forEach(n=>{
                n.events=[]
              })
              result.data.data.forEach((n)=>{
                this.status[Number(n.commStatus)-1].events.push(n)
              })
            }
          })
      },
      // 收到通知
      receipt(){
        if(confirm('确认执行收到通知操作')){
          this.$ajax.post('command/comm/changeCommandStatus',{commandNo: this.id,passStatus:2,loginName:this.phone},this.config)
            .then(result=>{
              if(result){
                this.getData()
              }
            })
        }
      }
    },
    created(){
      this.getData()
      this.getInfo()
    }
  }
</script>

<style lang='less' >
.mu-timeline-item-icon{
  line-height:0;
}
  .mu-timeline-item-line{

  }
</style>
