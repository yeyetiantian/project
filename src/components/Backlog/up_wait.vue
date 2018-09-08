<template>
  <section>
    <mu-appbar title="进行中的定期检查--上传等待"></mu-appbar>
    <form class="form font-28">
      <div class="bgW p-t-20 p-r-30 p-b-30">
        <div class="item">
          <label>标题：</label>
          <mu-text-field v-model="form.commTitle"  hintText="标题"/>
        </div>
        <div class="item">
          <label>结论：</label>
          <mu-text-field v-model="form.commDesc" hintText="内容描述，技术要求..." multiLine :rows="3" :rowsMax="6"  />
        </div>
        <div class="item">
          <label>附件上传：</label>
          <div style="position: relative;">
            <up @onsucccess="upimg" :option="imgOption"></up>
            <mu-text-field full-width  hintText="点击上传附件" v-model="imgs.desc"></mu-text-field>
          </div>
        </div>
        <div class="item">
          <label>合格内容：</label>
          <div>
            <mu-checkbox v-for="(x,i) in decList" :key="'dec'+i" :label="x" v-model="form.unChange" :nativeValue="x"/>
          </div>
        </div>
        <div class="item">
          <label>合格内容：</label>
          <div>
            <mu-radio label="合格" nativeValue="合格" v-model="form.gread" /> <br/>
            <mu-radio label="不合格" nativeValue="不合格" v-model="form.gread"/>
          </div>
        </div>
      </div>
      <div class="p-l-50 p-r-50 m-t-40">
        <mu-raised-button label="保存" @click="submit" primary fullWidth class="p-t-20 p-b-20 m-b-40" />
        <mu-raised-button label="取消" :to="`/blog_info/${id}`"  fullWidth class="p-t-20 p-b-20"/>
      </div>
    </form>
  </section>
</template>

<script>
  import up from '../util/update.vue'
  export default {
    name: "up_wait",
    components: {
      up
    },
    data() {
      return {
        id:this.$route.params.id,
        phone:this.$store.state.phone,
        config:{baseURL:this.$ajax.defaults.baseURL1},
        imgOption:{
          url:'/ht/content/uploadByRequestObj',
          name:'file'
        },
        decList:['开启窗需整改问题','外立面需整改问题','受力构件需整改问题','玻璃破损及雨水渗漏需整改问题','胶密封条需整改问题','日常管理需整改问题'],
        imgs:{},
        form:{
          "docUrl": "",
          "commandNo": this.$route.params.id,
          "commTitle": "",
          "commDesc": "",
          "unChange": [],
          "gread": "不合格",
          loginName:this.$store.state.phone
        }
      }
    },
    watch:{
      'form.unChange'(val){
        if(val.length===this.decList.length){
          this.form.gread='合格'
        }else{
          this.form.gread='不合格'
        }
      },
      'form.gread'(val){
        if(val==='合格'){
          this.form.unChange=this.decList
        }
      }
    },
    methods:{
      submit(){
        if(!this.form.commTitle){
          alert('请输入标题')
          return
        }
        if(!this.form.commDesc){
          alert('请输入结论')
          return
        }
        this.form.unChange=this.form.unChange.toString()
        this.$ajax.post('command/comm/changeCommandStatus',this.form,this.config)
          .then(result=>{
            if(result.data.code===0){
              this.$router.push('/backlog')
            }else{
              alert(result.data.msg)
            }
          })
      },
      upimg(data){
        this.imgs=data
        this.form.docUrl=data.msg
      },
    },
    created(){
    }
  }
</script>

<style lang='less' scoped>

</style>
